#!/usr/bin/env node
/**
 * Import UK athletics tracks from OpenStreetMap and work out each track's
 * home-straight running direction (the `trackDirection` bearing used by
 * src/utils/windLogic.ts).
 *
 * Usage:
 *   node scripts/import-tracks.mjs                 Dry run: report + accuracy check, writes nothing to src/
 *   node scripts/import-tracks.mjs --write         Create JSON files for new tracks (never overwrites existing)
 *     --limit 20                                   Only create the first N new tracks
 *     --min-confidence medium|low|none             Lowest direction confidence to create (default: medium)
 *     --include-private                            Also create tracks tagged access=private / on school sites
 *   node scripts/import-tracks.mjs --enrich        Add lanes / surface / floodlight details to imported tracks that have none
 *   node scripts/import-tracks.mjs --rename        Rename imported tracks to the "<Town> Athletics Track" style
 *   node scripts/import-tracks.mjs --refresh       Re-download OSM data instead of using scripts/.cache
 *
 * Every run writes scripts/output/track-import-report.csv with a satellite
 * link per track so the direction can be checked by eye.
 *
 * Data © OpenStreetMap contributors (ODbL). Region lookup via postcodes.io.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TRACK_DIR = path.join(ROOT, 'src/content/tracks');
const CACHE_DIR = path.join(ROOT, 'scripts/.cache');
const OUT_DIR = path.join(ROOT, 'scripts/output');

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const WRITE = flag('write');
const REFRESH = flag('refresh');
const INCLUDE_PRIVATE = flag('include-private');
const LIMIT = Number(option('limit', Infinity));
const CONFIDENCE_ORDER = ['none', 'low', 'medium'];
const MIN_CONFIDENCE = option('min-confidence', 'medium');

// ---------------------------------------------------------------------------
// Data download (cached)
// ---------------------------------------------------------------------------

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const UK = 'area["ISO3166-1"="GB"][admin_level=2]->.uk;';
// Not every track is tagged with a sport, so take all of them and let the shape test decide.
const TRACKS = '(way[leisure=track](area.uk);relation[leisure=track](area.uk);way[leisure=pitch][sport~"athletics|running"](area.uk);relation[leisure=pitch][sport~"athletics|running"](area.uk);)';

const QUERIES = {
  // Track outlines (ovals, lanes, sprint straights).
  tracks: `[out:json][timeout:300];${UK}${TRACKS};out geom;`,
  // Settlements, for the "city" field.
  places: `[out:json][timeout:300];${UK}node[place~"^(city|town|village|suburb)$"][name](area.uk);out;`,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function overpassRequest(query) {
  for (let attempt = 1; ; attempt++) {
    let detail = '';
    try {
      const res = await fetch(OVERPASS_URL, {
        method: 'POST',
        headers: { 'User-Agent': 'track-import-script/1.0' },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(330000),
      });
      const text = await res.text();
      if (res.ok && text.trimStart().startsWith('{')) {
        const json = JSON.parse(text);
        // Overpass reports timeouts / memory limits in "remark" with a 200 status.
        if (!json.remark) return json.elements;
        detail = json.remark;
      } else detail = `${res.status} ${text.slice(0, 150)}`;
    } catch (e) {
      detail = String(e);
    }
    if (attempt >= 5) throw new Error(`Overpass request failed: ${detail}`);
    await sleep(15000 * attempt);
  }
}

async function readCache(name) {
  if (REFRESH) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(CACHE_DIR, `${name}.json`), 'utf8'));
  } catch {
    return null;
  }
}

async function writeCache(name, data) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(path.join(CACHE_DIR, `${name}.json`), JSON.stringify(data));
}

async function overpass(name) {
  const cached = await readCache(name);
  if (cached) return cached.elements ?? cached;
  console.log(`Downloading ${name} from OpenStreetMap…`);
  const elements = await overpassRequest(QUERIES[name]);
  await writeCache(name, elements);
  return elements;
}

/**
 * Buildings and named venues around each detected track, fetched in batches.
 * Buildings give the home-straight hint (stands and clubhouses); venues give names.
 */
async function overpassContext(tracks) {
  const cached = (await readCache('context')) ?? {};
  const key = (t) => `${t.centre.lat.toFixed(5)},${t.centre.lng.toFixed(5)}`;
  const missing = tracks.filter((t) => !(key(t) in cached));
  for (let i = 0; i < missing.length; i += 60) {
    const batch = missing.slice(i, i + 60);
    console.log(`Downloading surroundings for tracks ${i + 1}–${i + batch.length} of ${missing.length}…`);
    const clauses = batch
      .map((t) => {
        const at = `${t.centre.lat.toFixed(6)},${t.centre.lng.toFixed(6)}`;
        return (
          `way(around:190,${at})[building];` +
          `nwr(around:190,${at})[leisure=bleachers];` +
          `nwr(around:350,${at})[name][leisure~"^(stadium|sports_centre|sports_hall)$"];` +
          `nwr(around:350,${at})[name][amenity~"^(school|university|college)$"];`
        );
      })
      .join('');
    const found = await overpassRequest(`[out:json][timeout:300];(${clauses});out tags bb;`);
    for (const t of batch) {
      cached[key(t)] = found.filter((el) => {
        const c = elementCentre(el);
        return c && distanceM(c, t.centre) < 600;
      });
    }
    await writeCache('context', cached);
    await sleep(3000);
  }
  return (t) => cached[key(t)] ?? [];
}

/**
 * Named grounds that each track sits inside (stadium, sports centre, park, recreation ground).
 * A ground that contains the track is a far more reliable venue name than whatever is nearby.
 */
async function overpassEnclosing(tracks) {
  const cached = (await readCache('enclosing')) ?? {};
  const key = (t) => `${t.centre.lat.toFixed(5)},${t.centre.lng.toFixed(5)}`;
  const missing = tracks.filter((t) => !(key(t) in cached));
  for (let i = 0; i < missing.length; i += 50) {
    const batch = missing.slice(i, i + 50);
    console.log(`Looking up grounds for tracks ${i + 1}–${i + batch.length} of ${missing.length}…`);
    // "out count" after each track marks where one track's results end and the next begin.
    const query = batch
      .map((t) => {
        const at = `${t.centre.lat.toFixed(6)},${t.centre.lng.toFixed(6)}`;
        return (
          `is_in(${at})->.a;(way(pivot.a)[name][leisure];relation(pivot.a)[name][leisure];` +
          `way(pivot.a)[name][landuse=recreation_ground];relation(pivot.a)[name][landuse=recreation_ground];);out tags;out count;`
        );
      })
      .join('');
    const found = await overpassRequest(`[out:json][timeout:300];${query}`);
    let index = 0;
    let current = [];
    for (const el of found) {
      if (el.type === 'count') {
        cached[key(batch[index++])] = current;
        current = [];
      } else current.push({ name: el.tags.name, leisure: el.tags.leisure, landuse: el.tags.landuse });
    }
    await writeCache('enclosing', cached);
    await sleep(3000);
  }
  return (t) => cached[key(t)] ?? [];
}

const elementCentre = (el) =>
  el.bounds
    ? { lat: (el.bounds.minlat + el.bounds.maxlat) / 2, lng: (el.bounds.minlon + el.bounds.maxlon) / 2 }
    : el.lat != null
      ? { lat: el.lat, lng: el.lon }
      : null;

/** Country / region for each coordinate via postcodes.io bulk reverse geocoding (cached). */
async function lookupRegions(points) {
  const file = path.join(CACHE_DIR, 'regions.json');
  let cache = {};
  try {
    cache = JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {}
  const key = (p) => `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
  const missing = points.filter((p) => !(key(p) in cache));
  for (let i = 0; i < missing.length; i += 100) {
    const batch = missing.slice(i, i + 100);
    const res = await fetch('https://api.postcodes.io/postcodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        geolocations: batch.map((p) => ({ longitude: p.lng, latitude: p.lat, radius: 2000, limit: 1 })),
      }),
    });
    if (!res.ok) throw new Error(`postcodes.io failed (${res.status})`);
    const { result } = await res.json();
    result.forEach((r, j) => {
      const hit = r.result?.[0];
      cache[key(batch[j])] = hit
        ? { country: hit.country, region: hit.region, district: hit.admin_district }
        : null;
    });
  }
  if (missing.length) {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(file, JSON.stringify(cache));
  }
  return (p) => cache[key(p)];
}

// ---------------------------------------------------------------------------
// Geometry helpers (local metres: x = east, y = north)
// ---------------------------------------------------------------------------

const M_PER_DEG_LAT = 110540;
const mPerDegLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180);

function distanceM(a, b) {
  return Math.hypot((a.lng - b.lng) * mPerDegLon((a.lat + b.lat) / 2), (a.lat - b.lat) * M_PER_DEG_LAT);
}

const toXY = (origin) => (p) => ({
  x: ((p.lon ?? p.lng) - origin.lng) * mPerDegLon(origin.lat),
  y: (p.lat - origin.lat) * M_PER_DEG_LAT,
});

function convexHull(points) {
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const build = (list) => {
    const out = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out.at(-2), out.at(-1), p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return [...build(pts), ...build(pts.reverse())];
}

/** Smallest rectangle around the points. A track's straights are hull edges, so its long side follows them. */
function minAreaRect(points) {
  const hull = convexHull(points);
  let best = null;
  for (let i = 0; i < hull.length; i++) {
    const a = hull[i];
    const b = hull[(i + 1) % hull.length];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len < 0.5) continue;
    const ex = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    for (const p of hull) {
      const u = p.x * ex.x + p.y * ex.y;
      const v = -p.x * ex.y + p.y * ex.x;
      if (u < minU) minU = u;
      if (u > maxU) maxU = u;
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
    const w = maxU - minU;
    const h = maxV - minV;
    if (!best || w * h < best.area) {
      const cu = (minU + maxU) / 2;
      const cv = (minV + maxV) / 2;
      const centre = { x: cu * ex.x - cv * ex.y, y: cu * ex.y + cv * ex.x };
      // `axis` is the unit vector along the long side.
      const axis = w >= h ? ex : { x: -ex.y, y: ex.x };
      best = { area: w * h, length: Math.max(w, h), width: Math.min(w, h), centre, axis };
    }
  }
  return best;
}

function ringArea(ring) {
  let s = 0;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}

const samePoint = (a, b) => a.lat === b.lat && a.lon === b.lon;

/** Join a multipolygon's member ways into closed rings. */
function assembleRings(ways) {
  const rings = [];
  const pool = ways.map((w) => [...w]);
  while (pool.length) {
    let ring = pool.shift();
    let grew = true;
    while (!samePoint(ring[0], ring.at(-1)) && grew) {
      grew = false;
      for (let i = 0; i < pool.length; i++) {
        const w = pool[i];
        if (samePoint(w[0], ring.at(-1))) ring = ring.concat(w.slice(1));
        else if (samePoint(w.at(-1), ring.at(-1))) ring = ring.concat([...w].reverse().slice(1));
        else continue;
        pool.splice(i, 1);
        grew = true;
        break;
      }
    }
    if (ring.length > 3 && samePoint(ring[0], ring.at(-1))) rings.push(ring);
  }
  return rings;
}

/** Geometry of an OSM element as closed rings and open lines (lat/lon). */
function elementShapes(el) {
  if (el.type === 'way' && el.geometry) {
    const g = el.geometry;
    return g.length > 3 && samePoint(g[0], g.at(-1)) ? { rings: [g], lines: [] } : { rings: [], lines: [g] };
  }
  if (el.type === 'relation' && el.members) {
    const ways = el.members.filter((m) => m.type === 'way' && m.geometry);
    return {
      rings: [
        ...assembleRings(ways.filter((m) => m.role !== 'inner').map((m) => m.geometry)),
        ...assembleRings(ways.filter((m) => m.role === 'inner').map((m) => m.geometry)),
      ],
      lines: [],
    };
  }
  return { rings: [], lines: [] };
}

// ---------------------------------------------------------------------------
// Track detection
// ---------------------------------------------------------------------------

const EXCLUDED_SPORTS = /cycling|cycle|velodrome|horse|equestrian|gallop|motor|karting|dog|greyhound|bmx|skating|speedway/;
const FIELD_EVENT = /jump|vault|javelin|throw|shot|discus|hammer/;

/**
 * Does this ring look like a standard 400m oval?
 * Lane 1 is ~157m x 73m; the outer edge of 8 lanes, including a sprint chute, can reach ~230m x 110m.
 */
function ovalFromRing(ring) {
  const rect = minAreaRect(ring);
  if (!rect) return null;
  const { length, width } = rect;
  if (length < 145 || length > 235 || width < 62 || width > 112) return null;
  if (length / width < 1.4 || length / width > 2.7) return null;
  // A stadium shape fills ~89% of its bounding rectangle; a plain rectangle fills all of it.
  // The hull is used because some tracks are drawn as one outline running round both edges.
  const fill = ringArea(convexHull(ring)) / rect.area;
  if (fill < 0.8 || fill > 0.95) return null;
  return rect;
}

function findTracks(elements) {
  // 1. Every ring that looks like a 400m oval.
  const ovals = [];
  for (const el of elements) {
    if (EXCLUDED_SPORTS.test(`${el.tags?.sport ?? ''} ${el.tags?.name ?? ''}`.toLowerCase())) continue;
    if (FIELD_EVENT.test(el.tags?.athletics ?? '')) continue;
    const origin = { lat: (el.bounds.minlat + el.bounds.maxlat) / 2, lng: (el.bounds.minlon + el.bounds.maxlon) / 2 };
    for (const ring of elementShapes(el).rings) {
      const rect = ovalFromRing(ring.map(toXY(origin)));
      if (!rect) continue;
      ovals.push({
        el,
        rect,
        centre: {
          lat: origin.lat + rect.centre.y / M_PER_DEG_LAT,
          lng: origin.lng + rect.centre.x / mPerDegLon(origin.lat),
        },
      });
    }
  }

  // 2. Group rings that belong to the same track (lanes, inner and outer edges).
  const clusters = [];
  for (const oval of ovals.sort((a, b) => a.rect.area - b.rect.area)) {
    const home = clusters.find((c) => distanceM(c[0].centre, oval.centre) < 60);
    if (home) home.push(oval);
    else clusters.push([oval]);
  }

  return clusters.map((cluster) => {
    // The smallest ring is the cleanest oval (innermost edge, no sprint chute), so it defines axis and centre.
    const base = cluster[0];
    const tags = Object.assign({}, ...[...cluster].reverse().map((o) => o.el.tags));
    const primary = cluster.find((o) => o.el.tags?.name) ?? cluster.at(-1);
    return { ...base, cluster, tags, osmId: `${primary.el.type}/${primary.el.id}` };
  });
}

const RESIDENTIAL = /house|apartments|residential|detached|terrace|bungalow|garage|shed|hut|container/;

/**
 * Work out which straight is the home straight and so which way athletes run.
 *
 * The oval's long axis gives the bearing of the straights, but the two
 * straights are run in opposite directions. Athletics is always run
 * anticlockwise, so knowing which side the home straight is on settles it.
 *
 * OSM outlines are symmetrical, so the only clue is what is built beside each
 * straight: grandstands and clubhouses are normally on the home straight.
 * That is right about four times in five, so every result still needs a look
 * at the satellite image. `altDirection` is the answer if the guess is wrong.
 */
function findDirection(track, contextElements) {
  const xy = toXY(track.centre);
  const { axis } = track.rect;
  const perp = { x: -axis.y, y: axis.x };
  const halfWidth = track.rect.width / 2;

  const score = { 1: 0, [-1]: 0 };
  const stands = { 1: 0, [-1]: 0 };
  for (const el of contextElements) {
    const kind = `${el.tags?.building ?? ''} ${el.tags?.leisure ?? ''}`;
    const isStand = /grandstand|stadium|bleachers/.test(kind);
    if (!el.tags?.building && !isStand) continue;
    if (RESIDENTIAL.test(el.tags?.building ?? '')) continue;
    const c = elementCentre(el);
    if (!c || !el.bounds) continue;
    const p = xy(c);
    const u = p.x * axis.x + p.y * axis.y;
    const v = p.x * perp.x + p.y * perp.y;
    const gap = Math.abs(v) - halfWidth; // metres outside the innermost edge of the track
    if (gap < 6 || gap > 50 || Math.abs(u) > track.rect.length / 2 + 5) continue;
    const size = Math.min(
      60,
      distanceM({ lat: el.bounds.minlat, lng: el.bounds.minlon }, { lat: el.bounds.maxlat, lng: el.bounds.maxlon }),
    );
    if (size < 10 && !isStand) continue;
    score[Math.sign(v)] += size * (isStand ? 3 : 1);
    if (isStand) stands[Math.sign(v)]++;
  }

  // Running direction when the home straight is on the +perp side (anticlockwise) is -axis.
  const bearingFor = (sign) => {
    const d = { x: -sign * axis.x, y: -sign * axis.y };
    return Math.round(((Math.atan2(d.x, d.y) * 180) / Math.PI + 360) % 360) % 360;
  };

  const sign = score[1] === score[-1] ? 0 : score[1] > score[-1] ? 1 : -1;
  const win = score[sign || 1];
  const lose = score[-(sign || 1)];
  let confidence = 'none';
  let method = 'no buildings beside either straight';
  if (sign) {
    const clear = win >= 40 && win >= 2 * lose;
    confidence = clear ? 'medium' : 'low';
    method = stands[sign] && !stands[-sign] ? 'grandstand' : stands[-sign] ? 'buildings (stand on other side too)' : 'buildings';
    if (stands[-sign] && !stands[sign]) confidence = 'low';
  }

  return {
    trackDirection: bearingFor(sign || 1),
    altDirection: bearingFor(-(sign || 1)),
    confidence,
    method,
  };
}

// ---------------------------------------------------------------------------
// Naming, places and regions
// ---------------------------------------------------------------------------

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’.]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const ENGLAND_SUBREGION = {
  'North East': 'north',
  'North West': 'north',
  'Yorkshire and The Humber': 'north',
  'East Midlands': 'midlands',
  'West Midlands': 'midlands',
  'East of England': 'south',
  London: 'south',
  'South East': 'south',
  'South West': 'south',
};

function regionFor(info) {
  if (!info) return null;
  if (info.country === 'England') {
    const subRegion = ENGLAND_SUBREGION[info.region];
    return subRegion ? { region: 'england', subRegion } : null;
  }
  if (info.country === 'Scotland') return { region: 'scotland', subRegion: 'all' };
  if (info.country === 'Wales') return { region: 'wales', subRegion: 'all' };
  if (info.country === 'Northern Ireland') return { region: 'northern-ireland', subRegion: 'all' };
  return null;
}

function buildPlaceIndex(places) {
  const grid = new Map();
  const cell = (lat, lng) => `${Math.floor(lat * 10)},${Math.floor(lng * 10)}`;
  for (const p of places) {
    const k = cell(p.lat, p.lon);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(p);
  }
  return (pos) => {
    const near = [];
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) near.push(...(grid.get(cell(pos.lat + dy / 10, pos.lng + dx / 10)) ?? []));
    const ranked = near
      .map((p) => ({ name: p.tags.name, kind: p.tags.place, d: distanceM(pos, { lat: p.lat, lng: p.lon }) }))
      .sort((a, b) => a.d - b.d);
    const town = ranked.find((p) => (p.kind === 'city' || p.kind === 'town') && p.d < 5000);
    const local = ranked.find((p) => p.d < 3000);
    return { city: town?.name ?? local?.name ?? null, locality: local?.name ?? null };
  };
}

const GROUND_RANK = ['stadium', 'sports_centre', 'recreation_ground', 'park'];

function venueName(track, contextElements, grounds) {
  const isSchool = (el) => /^(school|university|college)$/.test(el.tags?.amenity ?? '');
  const schoolNearby = contextElements.some((el) => {
    const c = elementCentre(el);
    return el.tags?.name && isSchool(el) && !el.tags.leisure && c && distanceM(c, track.centre) < 150;
  });
  if (track.tags.name) return { name: track.tags.name, source: 'track', school: false };
  const ranked = grounds
    .map((g) => ({ ...g, rank: GROUND_RANK.indexOf(g.leisure ?? g.landuse) }))
    .filter((g) => g.rank >= 0)
    .sort((a, b) => a.rank - b.rank);
  const asGround = (g) => ({ name: g.name, source: g.leisure === 'stadium' ? 'stadium' : 'ground', school: schoolNearby });
  // Best first: a stadium the track is inside, a stadium right beside it, then any other ground it is inside.
  if (ranked[0]?.leisure === 'stadium') return asGround(ranked[0]);
  const stadiumBeside = contextElements
    .filter((el) => el.tags?.name && el.tags.leisure === 'stadium')
    .map((el) => ({ el, d: distanceM(elementCentre(el) ?? track.centre, track.centre) }))
    .filter((x) => x.d < 150)
    .sort((a, b) => a.d - b.d)[0];
  if (stadiumBeside) return { name: stadiumBeside.el.tags.name, source: 'stadium', school: schoolNearby };
  if (ranked[0]) return asGround(ranked[0]);
  const rank = (el) => (el.tags.leisure === 'stadium' ? 0 : el.tags.leisure ? 1 : 2);
  const near = contextElements
    .filter(
      (el) =>
        el.tags?.name &&
        (/^(stadium|sports_centre|sports_hall)$/.test(el.tags.leisure ?? '') ||
          /^(school|university|college)$/.test(el.tags.amenity ?? '')),
    )
    .map((el) => {
      const c = elementCentre(el);
      return { el, d: c ? distanceM(c, track.centre) : Infinity };
    })
    .filter((x) => x.d < 400)
    .sort((a, b) => rank(a.el) - rank(b.el) || a.d - b.d);
  if (!near.length) return { name: null, source: 'generated', school: false };
  const best = near[0].el;
  return { name: best.tags.name, source: best.tags.leisure ?? best.tags.amenity, school: !best.tags.leisure };
}

const SURFACE_LABEL = {
  tartan: 'Synthetic (tartan)',
  synthetic: 'Synthetic',
  rubber: 'Synthetic (rubber)',
  mondo: 'Synthetic (Mondo)',
  asphalt: 'Asphalt',
  paved: 'Paved',
  gravel: 'Gravel',
  fine_gravel: 'Fine gravel',
  compacted: 'Compacted cinder',
  clay: 'Clay',
  unpaved: 'Unpaved',
};

/** A "Track Details" info card built from what OpenStreetMap records about the track, if anything. */
function trackDetails(tags) {
  const lines = ['Length: 400m oval'];
  if (/^\d+$/.test(tags.lanes ?? '')) lines.push(`Lanes: ${tags.lanes}`);
  if (SURFACE_LABEL[tags.surface]) lines.push(`Surface: ${SURFACE_LABEL[tags.surface]}`);
  if (tags.lit === 'yes') lines.push('Floodlights: Yes');
  if (tags.lit === 'no') lines.push('Floodlights: No');
  return lines.length > 1 ? { heading: 'Track Details', text: lines.join('\n') } : null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function readExistingTracks() {
  const out = [];
  for (const file of await fs.readdir(TRACK_DIR)) {
    if (!file.endsWith('.json')) continue;
    out.push({ file, ...JSON.parse(await fs.readFile(path.join(TRACK_DIR, file), 'utf8')) });
  }
  return out;
}

const angleDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
const csvCell = (v) => (/[",\n]/.test(String(v ?? '')) ? `"${String(v).replace(/"/g, '""')}"` : String(v ?? ''));

const elements = await overpass('tracks');
const places = await overpass('places');
const existing = await readExistingTracks();

const tracks = findTracks(elements);
console.log(`${elements.length} OSM track elements → ${tracks.length} standard 400m ovals`);

const nearestPlace = buildPlaceIndex(places);
const regionOf = await lookupRegions(tracks.map((t) => t.centre));

const contextNear = await overpassContext(tracks);
const groundsOf = await overpassEnclosing(tracks);

const usedSlugs = new Set(existing.map((t) => `${t.region}/${t.slug}`));
const RESERVED = new Set(['all', 'north', 'south', 'midlands']);
const rows = [];
// Hand-written tracks keep their names; imported ones must not clash with them or each other.
const usedNames = new Set(existing.filter((t) => !t.osmId).map((t) => t.name.toLowerCase()));

// Tracks already on the site get first pick of names, so re-runs give them the same name each time.
const onSite = (track) => existing.some((t) => t.osmId === track.osmId);
tracks.sort((a, b) => onSite(b) - onSite(a));

for (const track of tracks) {
  const nearby = contextNear(track);
  const direction = findDirection(track, nearby);
  const match = existing.find((t) => distanceM(t, track.centre) < 250);
  const place = nearestPlace(track.centre);
  const region = regionFor(regionOf(track.centre));
  const venue = venueName(track, nearby, groundsOf(track));
  // London tracks are listed under "London" and told apart by their neighbourhood, as on the existing pages.
  const inLondon = regionOf(track.centre)?.region === 'London';
  const city = inLondon ? 'London' : (place.city ?? regionOf(track.centre)?.district ?? '');
  // Name tracks the way people search for them: "<Town> Athletics Track". The venue goes in
  // brackets only when it is the track's own name or a stadium, since other nearby names are unreliable.
  const town = inLondon ? (place.locality ?? city) : city || place.locality || '';
  const ownName = ['track', 'stadium', 'ground'].includes(venue.source)
    ? venue.name.replace(/\s*\b(athletics?|running)\s+track$/i, '').trim()
    : '';
  const venueLabel =
    ownName && !/^((400\s*m|athletics?|running)\s*)*(track|stadium|arena)?$/i.test(ownName) &&
    !/[\/]|pitch|school/i.test(ownName) &&
    slugify(ownName) !== slugify(town) ? ownName : '';
  const nameOptions = [
    `${town} Athletics Track`,
    venueLabel && `${town} Athletics Track (${venueLabel})`,
    place.locality && place.locality !== town && `${place.locality} Athletics Track`,
    place.locality && place.locality !== town && `${town} Athletics Track (${place.locality})`,
  ].filter(Boolean);
  // Prefer the version with the venue when there is one; fall back to whichever is not taken yet.
  const preferred = venueLabel ? [nameOptions[1], nameOptions[0], ...nameOptions.slice(2)] : nameOptions;
  const name = preferred.find((n) => !usedNames.has(n.toLowerCase())) ??
    `${town} Athletics Track (${venue.name && !usedNames.has(`${town} athletics track (${venue.name})`.toLowerCase()) ? venue.name : track.osmId.split('/')[1]})`;
  usedNames.add(name.toLowerCase());

  const surface = track.tags.surface ?? '';
  const isPrivate = /private|no/.test(track.tags.access ?? '') || venue.school;
  const skip = match
    ? match.directionVerified === false
      ? 'on site: direction unverified'
      : 'on site'
    : !region
      ? 'outside known regions'
      : !city
        ? 'no place name found'
        : /grass|dirt|earth|ground|sand/.test(surface)
          ? `surface: ${surface}`
          : '';

  let slug = '';
  if (!skip) {
    const candidates = [inLondon ? null : city, place.locality, name, `${city} ${name}`].filter(Boolean).map(slugify);
    slug = candidates.find((s) => s && !RESERVED.has(s) && !usedSlugs.has(`${region.region}/${s}`));
    if (!slug) slug = `${slugify(city)}-${track.osmId.split('/')[1]}`;
    usedSlugs.add(`${region.region}/${slug}`);
  }

  rows.push({
    track, direction, match, region, name, city, slug, surface, isPrivate, skip,
    nameSource: venue.source,
  });
}

// --- Accuracy check against the tracks already on the site -----------------
console.log('\nAccuracy check against existing tracks (direction already set by hand):');
let found = 0, axisOk = 0, dirOk = 0, confidentTotal = 0, confidentOk = 0;
for (const t of existing) {
  const row = rows.find((r) => r.match === t);
  if (!row) {
    console.log(`  ${t.slug.padEnd(16)} not found in OSM as a 400m oval`);
    continue;
  }
  found++;
  const d = row.direction;
  const axisErr = Math.min(angleDiff(d.trackDirection, t.trackDirection), angleDiff(d.altDirection, t.trackDirection));
  const right = angleDiff(d.trackDirection, t.trackDirection) <= 15;
  if (axisErr <= 15) axisOk++;
  if (right) dirOk++;
  if (d.confidence === 'medium') {
    confidentTotal++;
    if (right) confidentOk++;
  }
  console.log(
    `  ${t.slug.padEnd(16)} site ${String(t.trackDirection).padStart(3)}°  script ${String(d.trackDirection).padStart(3)}°  ` +
      `${right ? 'OK   ' : axisErr <= 15 ? 'FLIP ' : 'AXIS '} ${d.confidence.padEnd(6)} ${d.method}`,
  );
}
console.log(
  `  Found ${found}/${existing.length}. Axis within 15°: ${axisOk}/${found}. ` +
    `Direction right: ${dirOk}/${found} overall, ${confidentOk}/${confidentTotal} where confidence is medium.`,
);

// --- Report ------------------------------------------------------------------
const header = [
  'status', 'slug', 'name', 'city', 'region', 'subRegion', 'lat', 'lng', 'trackDirection', 'altDirection',
  'confidence', 'method', 'surface', 'private', 'nameSource', 'satellite', 'osm',
];
const csv = [header.join(',')];
for (const r of rows) {
  const { lat, lng } = r.track.centre;
  csv.push(
    [
      r.skip || 'new', r.match?.slug ?? r.slug, r.match?.name ?? r.name, r.match?.city ?? r.city, r.region?.region, r.region?.subRegion, lat.toFixed(7), lng.toFixed(7),
      r.direction.trackDirection, r.direction.altDirection, r.direction.confidence, r.direction.method,
      r.surface, r.isPrivate ? 'yes' : '', r.nameSource,
      `https://www.google.com/maps/@${lat.toFixed(6)},${lng.toFixed(6)},250m/data=!3m1!1e3`,
      `https://www.openstreetmap.org/${r.track.osmId}`,
    ].map(csvCell).join(','),
  );
}
await fs.mkdir(OUT_DIR, { recursive: true });
const reportFile = path.join(OUT_DIR, 'track-import-report.csv');
await fs.writeFile(reportFile, csv.join('\n') + '\n');

const fresh = rows.filter((r) => !r.skip);
const tally = (list, fn) => list.reduce((acc, r) => ((acc[fn(r)] = (acc[fn(r)] ?? 0) + 1), acc), {});
console.log(`\nNew tracks not yet on the site: ${fresh.length}`);
console.log('  by direction confidence:', tally(fresh, (r) => r.direction.confidence));
console.log('  by region:', tally(fresh, (r) => `${r.region.region}/${r.region.subRegion}`));
console.log('  private / school site:', fresh.filter((r) => r.isPrivate).length);
console.log('  skipped:', tally(rows.filter((r) => r.skip), (r) => r.skip.replace(/:.*/, '')));
console.log(`Report: ${path.relative(ROOT, reportFile)}`);

// --- Add map details to tracks imported earlier ----------------------------------
if (flag('enrich')) {
  let enriched = 0;
  for (const r of rows) {
    if (!r.match?.osmId || r.match.trackInfo?.length) continue; // only imported tracks with no info yet
    const details = trackDetails(r.track.tags);
    if (!details) continue;
    const { file, ...data } = r.match;
    data.trackInfo = [details];
    await fs.writeFile(path.join(TRACK_DIR, file), JSON.stringify(data, null, 2) + '\n');
    enriched++;
  }
  console.log(`\nAdded track details to ${enriched} imported tracks`);
}

// --- Rename tracks imported earlier to the "<Town> Athletics Track" style ------------
if (flag('rename')) {
  let renamed = 0;
  for (const r of rows) {
    if (!r.match?.osmId || r.match.osmId !== r.track.osmId || r.match.name === r.name) continue;
    // Leave tracks that have been edited by hand: confirmed directions or researched details.
    if (r.match.directionVerified !== false || (r.match.trackInfo?.length ?? 0) > 1) continue;
    const { file, ...data } = r.match;
    data.name = r.name;
    data.metaTitle = `${r.name} | Info & Wind Speed`;
    data.metaDescription = `Check live wind speed and track information for ${r.name} in ${data.city}.`;
    await fs.writeFile(path.join(TRACK_DIR, file), JSON.stringify(data, null, 2) + '\n');
    renamed++;
  }
  console.log(`\nRenamed ${renamed} imported tracks`);
}

// --- Write new track files -----------------------------------------------------
if (WRITE) {
  const minLevel = CONFIDENCE_ORDER.indexOf(MIN_CONFIDENCE);
  if (minLevel < 0) throw new Error(`--min-confidence must be one of ${CONFIDENCE_ORDER.join(', ')}`);
  const toWrite = fresh
    .filter((r) => CONFIDENCE_ORDER.indexOf(r.direction.confidence) >= minLevel)
    .filter((r) => INCLUDE_PRIVATE || !r.isPrivate)
    .slice(0, LIMIT);
  let written = 0;
  for (const r of toWrite) {
    const file = path.join(TRACK_DIR, `${r.slug}.json`);
    try {
      await fs.access(file);
      continue; // never overwrite a hand-edited track
    } catch {}
    const data = {
      name: r.name,
      slug: r.slug,
      city: r.city,
      region: r.region.region,
      subRegion: r.region.subRegion,
      country: 'uk',
      trackDirection: r.direction.trackDirection,
      lat: Number(r.track.centre.lat.toFixed(7)),
      lng: Number(r.track.centre.lng.toFixed(7)),
      metaTitle: `${r.name} | Info & Wind Speed`,
      metaDescription: `Check live wind speed and track information for ${r.name} in ${r.city}.`,
      directionVerified: false,
      osmId: r.track.osmId,
    };
    const details = trackDetails(r.track.tags);
    if (details) data.trackInfo = [details];
    await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n');
    written++;
  }
  console.log(`\nWrote ${written} new track files to ${path.relative(ROOT, TRACK_DIR)}`);
} else {
  console.log('\nDry run: no track files written. Re-run with --write to create them.');
}
