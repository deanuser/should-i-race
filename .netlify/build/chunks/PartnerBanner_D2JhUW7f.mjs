import { c as createComponent, V as VALID_INPUT_FORMATS } from './consts_DGtZZUut.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderTemplate, e as addAttribute, j as renderHead, k as renderSlot, g as renderComponent, l as generateCspDigest, s as spreadAttributes, u as unescapeHTML, A as AstroError, U as UnknownContentCollectionError, n as defineScriptVars } from './ssr-function_DFINGRnz.mjs';
import 'clsx';
import 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
import { removeBase, isRemotePath } from '@astrojs/internal-helpers/path';
import * as devalue from 'devalue';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-deepdark pt-24 pb-12 border-t border-white/5 relative overflow-hidden" data-astro-cid-sz7xmlte> <!-- Subtle Background Glow --> <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-brightcyan/5 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-sz7xmlte></div> <div class="container mx-auto px-6 max-w-7xl relative z-10" data-astro-cid-sz7xmlte> <!-- Top Footer: CTA Section --> <div class="bento-card mb-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-card-bg to-deepdark border-white/10 group overflow-hidden relative" data-astro-cid-sz7xmlte> <div class="absolute top-0 right-0 w-64 h-64 bg-brightcyan/5 blur-[80px] rounded-full group-hover:bg-brightcyan/10 transition-colors duration-500" data-astro-cid-sz7xmlte></div> <div class="relative z-10 text-center md:text-left" data-astro-cid-sz7xmlte> <h2 class="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase leading-none" data-astro-cid-sz7xmlte>
Ready to <span class="text-brightcyan drop-shadow-[0_0_15px_rgba(34,227,213,0.3)]" data-astro-cid-sz7xmlte>PB?</span> </h2> <p class="text-slate-400 text-lg md:text-xl font-medium max-w-xl" data-astro-cid-sz7xmlte>
Get real-time wind insights for your next race. Don't leave your
          performance to chance.
</p> </div> <div class="relative z-10 flex-shrink-0" data-astro-cid-sz7xmlte> <a href="/#tracks" class="inline-flex items-center gap-3 bg-brightcyan text-deepdark px-8 py-4 rounded-full font-black text-sm md:text-base transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(34,227,213,0.4)] uppercase tracking-widest" data-astro-cid-sz7xmlte>
Find Your Track
<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><line x1="5" y1="12" x2="19" y2="12" data-astro-cid-sz7xmlte></line><polyline points="12 5 19 12 12 19" data-astro-cid-sz7xmlte></polyline></svg> </a> </div> </div> <!-- Middle Footer: Main Links Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20" data-astro-cid-sz7xmlte> <!-- Brand Column --> <div class="lg:col-span-1" data-astro-cid-sz7xmlte> <a href="/" class="inline-block mb-8 hover:opacity-80 transition-opacity" data-astro-cid-sz7xmlte> <img src="/images/logos/logo side.webp" alt="Should I Run Logo" class="h-10 md:h-12 w-auto object-contain drop-shadow-lg" data-astro-cid-sz7xmlte> </a> <p class="text-slate-400 text-base leading-relaxed mb-8 max-w-xs font-medium italic" data-astro-cid-sz7xmlte>
High-precision wind intel for the world's most elite sprinters and
          athletics tracks.
</p> <div class="flex items-center gap-4" data-astro-cid-sz7xmlte> <a href="https://www.facebook.com/deandaviswebdesign" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 hover:bg-brightcyan/[0.05] transition-all duration-300 group shadow-lg" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" data-astro-cid-sz7xmlte><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" data-astro-cid-sz7xmlte></path></svg> </a> <a href="https://www.linkedin.com/in/dean-davis-9b84642b/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 hover:bg-brightcyan/[0.05] transition-all duration-300 group shadow-lg" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" data-astro-cid-sz7xmlte><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" data-astro-cid-sz7xmlte></path><rect x="2" y="9" width="4" height="12" data-astro-cid-sz7xmlte></rect><circle cx="4" cy="4" r="2" data-astro-cid-sz7xmlte></circle></svg> </a> <a href="https://www.instagram.com/deanandthat/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 hover:bg-brightcyan/[0.05] transition-all duration-300 group shadow-lg" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" data-astro-cid-sz7xmlte><rect x="2" y="2" width="20" height="20" rx="5" ry="5" data-astro-cid-sz7xmlte></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" data-astro-cid-sz7xmlte></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" data-astro-cid-sz7xmlte></line></svg> </a> </div> </div> <!-- Quick Links --> <div class="lg:ml-auto" data-astro-cid-sz7xmlte> <h4 class="text-white font-black text-sm uppercase tracking-[0.2em] mb-8" data-astro-cid-sz7xmlte>
Platform
</h4> <ul class="space-y-4" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/#tracks" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>Find Tracks</a> </li> <li data-astro-cid-sz7xmlte> <a href="/about" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>How it Works</a> </li> <li data-astro-cid-sz7xmlte> <a href="#" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>Pricing</a> </li> <li data-astro-cid-sz7xmlte> <a href="#" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>API Docs</a> </li> </ul> </div> <!-- More Links --> <div class="lg:ml-auto" data-astro-cid-sz7xmlte> <h4 class="text-white font-black text-sm uppercase tracking-[0.2em] mb-8" data-astro-cid-sz7xmlte>
Company
</h4> <ul class="space-y-4" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/about" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>About Us</a> </li> <li data-astro-cid-sz7xmlte> <a href="#" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>Terms of Service</a> </li> <li data-astro-cid-sz7xmlte> <a href="#" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>Privacy Policy</a> </li> <li data-astro-cid-sz7xmlte> <a href="/contact" class="text-slate-400 hover:text-brightcyan font-bold transition-all duration-300 hover:translate-x-1 inline-block" data-astro-cid-sz7xmlte>Contact</a> </li> </ul> </div> <!-- Support Status / Stats --> <div class="lg:ml-auto" data-astro-cid-sz7xmlte> <h4 class="text-white font-black text-sm uppercase tracking-[0.2em] mb-8" data-astro-cid-sz7xmlte>
Live Status
</h4> <div class="bg-card-bg/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group" data-astro-cid-sz7xmlte> <div class="absolute inset-0 bg-brightcyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-astro-cid-sz7xmlte></div> <div class="flex items-center gap-3 mb-4" data-astro-cid-sz7xmlte> <span class="relative flex h-3 w-3" data-astro-cid-sz7xmlte> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brightcyan opacity-75" data-astro-cid-sz7xmlte></span> <span class="relative inline-flex rounded-full h-3 w-3 bg-brightcyan" data-astro-cid-sz7xmlte></span> </span> <span class="text-white font-black text-sm uppercase tracking-widest" data-astro-cid-sz7xmlte>Network Live</span> </div> <p class="text-slate-400 text-sm font-medium leading-relaxed" data-astro-cid-sz7xmlte>
All 50+ tracks are currently transmitting live wind data.
</p> </div> </div> </div> <!-- Bottom Footer: Copyright & Fine Print --> <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6" data-astro-cid-sz7xmlte> <p class="text-slate-500 text-sm font-semibold tracking-wide" data-astro-cid-sz7xmlte>
&copy; ${currentYear} SHOULD I RACE. ACCELERATING THE WORLD’S FASTEST ATHLETES.
</p> <div class="flex gap-8" data-astro-cid-sz7xmlte> <a href="#" class="text-slate-500 hover:text-white text-xs font-bold transition-colors uppercase tracking-widest" data-astro-cid-sz7xmlte>Privacy</a> <a href="#" class="text-slate-500 hover:text-white text-xs font-bold transition-colors uppercase tracking-widest" data-astro-cid-sz7xmlte>Terms</a> <a href="#" class="text-slate-500 hover:text-white text-xs font-bold transition-colors uppercase tracking-widest" data-astro-cid-sz7xmlte>Cookies</a> </div> </div> </div> </footer>`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/Footer.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/webp" href="/images/logos/icon.webp"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:image" content="/images/logos/logo2.webp">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/layouts/Layout.astro", void 0);

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_CRz_NJk6.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const allTracks = await getCollection("tracks");
  const trackData = allTracks.map((t) => ({
    name: t.data.name,
    city: t.data.city,
    url: t.data.subRegion === "all" ? `/${t.data.country}/${t.data.region}/${t.data.slug}` : `/${t.data.country}/${t.data.region}/${t.data.subRegion}/${t.data.slug}`
  }));
  return renderTemplate(_a || (_a = __template(["", '<nav id="main-nav" class="fixed top-0 left-0 w-full z-50 bg-deepdark/90 backdrop-blur-md border-b border-white/5 transition-all duration-300 animate-fade-in" data-astro-cid-5blmo7yk> <div class="container mx-auto max-w-7xl px-4 md:px-6 h-20 flex justify-between items-center gap-4" data-astro-cid-5blmo7yk> <!-- Logo --> <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0 z-[60]" data-astro-cid-5blmo7yk> <img src="/images/logos/logo side.webp" alt="Should I Run Logo" class="h-10 md:h-12 w-auto object-contain drop-shadow-lg" data-astro-cid-5blmo7yk> </a> <!-- Search Bar (desktop, hidden by default) --> <div id="nav-search-container" class="flex-1 max-w-lg hidden opacity-0 transition-all duration-300" data-astro-cid-5blmo7yk> <div class="relative" data-astro-cid-5blmo7yk> <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brightcyan pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk><circle cx="11" cy="11" r="8" data-astro-cid-5blmo7yk></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-5blmo7yk></line></svg> <input id="nav-search-input" type="text" placeholder="Search tracks by name or city..." class="w-full bg-white/5 border border-white/15 focus:border-brightcyan/60 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200" autocomplete="off" data-astro-cid-5blmo7yk> <div id="nav-search-results" class="absolute top-full left-0 right-0 mt-2 bg-deepdark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden hidden z-50 max-h-80 overflow-y-auto" data-astro-cid-5blmo7yk></div> </div> </div> <!-- Desktop Nav links + controls --> <ul class="flex items-center gap-4 md:gap-6 list-none m-0 p-0 flex-shrink-0" data-astro-cid-5blmo7yk> <!-- Search Toggle --> <li data-astro-cid-5blmo7yk> <button id="nav-search-toggle" aria-label="Search tracks" class="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-brightcyan transition-colors rounded-full hover:bg-white/5 z-[60] relative" data-astro-cid-5blmo7yk> <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk><circle cx="11" cy="11" r="8" data-astro-cid-5blmo7yk></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-5blmo7yk></line></svg> <svg id="search-close-icon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk><line x1="18" y1="6" x2="6" y2="18" data-astro-cid-5blmo7yk></line><line x1="6" y1="6" x2="18" y2="18" data-astro-cid-5blmo7yk></line></svg> </button> </li> <!-- Desktop Links (hidden on mobile) --> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/#tracks" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>Tracks</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/about" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>About</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/partner" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>Partnership</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/contact" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>Contact</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="https://www.paypal.com/donate/?hosted_button_id=Q3BH2KU2Z7JPY" target="_blank" rel="noopener noreferrer" class="bg-brightcyan/10 text-brightcyan hover:bg-brightcyan hover:text-deepdark border border-brightcyan/40 px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300 uppercase" data-astro-cid-5blmo7yk>Buy Me a Coffee ☕</a> </li> <!-- Hamburger (mobile only) --> <li class="md:hidden" data-astro-cid-5blmo7yk> <button id="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false" class="w-11 h-11 flex flex-col justify-center items-center z-[60] relative bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 group active:scale-95" data-astro-cid-5blmo7yk> <div class="relative w-6 h-5 flex flex-col justify-center items-center" data-astro-cid-5blmo7yk> <span id="burger-line-1" class="block w-6 h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center absolute top-[4px]" data-astro-cid-5blmo7yk></span> <span id="burger-line-2" class="block w-4 h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center absolute bottom-[4px] self-end group-hover:w-6" data-astro-cid-5blmo7yk></span> </div> </button> </li> </ul> </div> </nav> <!-- Full-Screen Mobile Menu Overlay --> <div id="mobile-menu" class="fixed inset-0 z-40 bg-deepdark flex flex-col pointer-events-none opacity-0" style="transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);" aria-hidden="true" data-astro-cid-5blmo7yk> <!-- Cyan glow accent --> <div class="absolute top-0 right-0 w-80 h-80 bg-brightcyan/10 blur-[120px] rounded-full pointer-events-none" data-astro-cid-5blmo7yk></div> <div class="absolute bottom-0 left-0 w-64 h-64 bg-brightcyan/5 blur-[100px] rounded-full pointer-events-none" data-astro-cid-5blmo7yk></div> <!-- Menu content: centred vertically --> <div class="flex-1 flex flex-col justify-center px-8 pt-24 pb-12 relative z-10" data-astro-cid-5blmo7yk> <!-- Nav Links --> <nav class="flex flex-col gap-2 mb-12" data-astro-cid-5blmo7yk> ', ' </nav> <!-- CTA Button --> <a href="https://www.paypal.com/donate/?hosted_button_id=Q3BH2KU2Z7JPY" target="_blank" rel="noopener noreferrer" id="mobile-cta" class="inline-flex items-center justify-center gap-2 bg-brightcyan text-deepdark px-8 py-4 rounded-full font-black text-base tracking-widest uppercase shadow-[0_0_30px_rgba(34,227,213,0.3)] hover:shadow-[0_0_40px_rgba(34,227,213,0.5)] transition-all duration-300 w-full text-center mb-10" data-astro-cid-5blmo7yk>\nBuy Me a Coffee ☕\n</a> <!-- Social Links --> <div id="mobile-socials" class="flex items-center gap-5 opacity-0 translate-y-4" style="transition: opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s;" data-astro-cid-5blmo7yk> <a href="https://www.facebook.com/deandaviswebdesign" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 transition-all duration-300" data-astro-cid-5blmo7yk> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-5blmo7yk><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" data-astro-cid-5blmo7yk></path></svg> </a> <a href="https://www.linkedin.com/in/dean-davis-9b84642b/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 transition-all duration-300" data-astro-cid-5blmo7yk> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-5blmo7yk><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" data-astro-cid-5blmo7yk></path><rect x="2" y="9" width="4" height="12" data-astro-cid-5blmo7yk></rect><circle cx="4" cy="4" r="2" data-astro-cid-5blmo7yk></circle></svg> </a> <a href="https://www.instagram.com/deanandthat/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 transition-all duration-300" data-astro-cid-5blmo7yk> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-5blmo7yk><rect x="2" y="2" width="20" height="20" rx="5" ry="5" data-astro-cid-5blmo7yk></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" data-astro-cid-5blmo7yk></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" data-astro-cid-5blmo7yk></line></svg> </a> </div> </div> <!-- Bottom tagline --> <div id="mobile-footer-tag" class="relative z-10 px-8 pb-8 opacity-0" style="transition: opacity 0.4s ease 0.4s;" data-astro-cid-5blmo7yk> <p class="text-slate-600 text-xs uppercase tracking-widest font-bold" data-astro-cid-5blmo7yk>\nShould I Race? · Real-time wind intel for athletes\n</p> </div> </div>  <script>(function(){', '\n  // ── Mobile Menu ──────────────────────────────────────────────\n  const mobileToggle = document.getElementById("mobile-menu-toggle");\n  const mobileMenu = document.getElementById("mobile-menu");\n  const burgerBtn = document.getElementById("mobile-menu-toggle");\n  let menuOpen = false;\n\n  function openMobileMenu() {\n    menuOpen = true;\n    mobileMenu.classList.remove("pointer-events-none");\n    mobileMenu.style.opacity = "1";\n    mobileMenu.setAttribute("aria-hidden", "false");\n    mobileMenu.classList.add("menu-open");\n    burgerBtn.classList.add("burger-open");\n    burgerBtn.setAttribute("aria-expanded", "true");\n    document.body.style.overflow = "hidden";\n  }\n\n  function closeMobileMenu() {\n    menuOpen = false;\n    mobileMenu.style.opacity = "0";\n    mobileMenu.classList.remove("menu-open");\n    burgerBtn.classList.remove("burger-open");\n    burgerBtn.setAttribute("aria-expanded", "false");\n    document.body.style.overflow = "";\n    setTimeout(() => {\n      mobileMenu.classList.add("pointer-events-none");\n      mobileMenu.setAttribute("aria-hidden", "true");\n    }, 400);\n  }\n\n  mobileToggle.addEventListener("click", () => {\n    menuOpen ? closeMobileMenu() : openMobileMenu();\n  });\n\n  // Close when a mobile nav link is clicked\n  document.querySelectorAll(".mobile-nav-link").forEach((link) => {\n    link.addEventListener("click", closeMobileMenu);\n  });\n\n  // Close on Escape\n  document.addEventListener("keydown", (e) => {\n    if (e.key === "Escape" && menuOpen) closeMobileMenu();\n  });\n\n  // ── Desktop Search ───────────────────────────────────────────\n  const searchToggle = document.getElementById("nav-search-toggle");\n  const searchContainer = document.getElementById("nav-search-container");\n  const searchInput = document.getElementById("nav-search-input");\n  const searchResults = document.getElementById("nav-search-results");\n  const searchIcon = document.getElementById("search-icon");\n  const searchCloseIcon = document.getElementById("search-close-icon");\n\n  let searchOpen = false;\n\n  function openSearch() {\n    searchOpen = true;\n    searchContainer.classList.remove("hidden");\n    requestAnimationFrame(() => {\n      searchContainer.classList.remove("opacity-0");\n      searchContainer.classList.add("opacity-100");\n    });\n    searchIcon.classList.add("hidden");\n    searchCloseIcon.classList.remove("hidden");\n    setTimeout(() => searchInput.focus(), 50);\n  }\n\n  function closeSearch() {\n    searchOpen = false;\n    searchContainer.classList.add("opacity-0");\n    searchContainer.classList.remove("opacity-100");\n    setTimeout(() => searchContainer.classList.add("hidden"), 300);\n    searchIcon.classList.remove("hidden");\n    searchCloseIcon.classList.add("hidden");\n    searchInput.value = "";\n    searchResults.classList.add("hidden");\n    searchResults.innerHTML = "";\n  }\n\n  searchToggle.addEventListener("click", () => {\n    searchOpen ? closeSearch() : openSearch();\n  });\n\n  document.addEventListener("keydown", (e) => {\n    if (e.key === "Escape" && searchOpen) closeSearch();\n  });\n\n  document.addEventListener("click", (e) => {\n    if (\n      searchOpen &&\n      !searchContainer.contains(e.target) &&\n      !searchToggle.contains(e.target)\n    ) {\n      closeSearch();\n    }\n  });\n\n  searchInput.addEventListener("input", () => {\n    const query = searchInput.value.trim().toLowerCase();\n    searchResults.innerHTML = "";\n\n    if (query.length < 2) {\n      searchResults.classList.add("hidden");\n      return;\n    }\n\n    const matches = trackData.filter(\n      (t) =>\n        t.name.toLowerCase().includes(query) ||\n        t.city.toLowerCase().includes(query)\n    );\n\n    if (matches.length === 0) {\n      searchResults.innerHTML = `<div class="px-5 py-4 text-slate-400 text-sm">No tracks found for "<span class="text-white font-bold">${searchInput.value}</span>"</div>`;\n      searchResults.classList.remove("hidden");\n      return;\n    }\n\n    matches.slice(0, 8).forEach((track) => {\n      const item = document.createElement("a");\n      item.href = track.url;\n      item.className =\n        "flex items-center gap-3 px-5 py-3.5 hover:bg-brightcyan/10 transition-colors border-b border-white/5 last:border-0 group";\n\n      const highlighted = (str) =>\n        str.replace(\n          new RegExp(`(${query})`, "gi"),\n          \'<mark class="bg-brightcyan/30 text-brightcyan rounded px-0.5">$1</mark>\'\n        );\n\n      item.innerHTML = `\n        <svg class="w-4 h-4 text-slate-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>\n        <div>\n          <div class="text-white text-sm font-bold group-hover:text-brightcyan transition-colors">${highlighted(track.name)}</div>\n          <div class="text-slate-500 text-xs mt-0.5">${highlighted(track.city)}</div>\n        </div>\n        <svg class="w-4 h-4 text-slate-600 ml-auto group-hover:text-brightcyan transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>\n      `;\n      searchResults.appendChild(item);\n    });\n\n    if (matches.length > 8) {\n      const more = document.createElement("div");\n      more.className = "px-5 py-3 text-slate-500 text-xs text-center";\n      more.textContent = `+${matches.length - 8} more results. Refine your search.`;\n      searchResults.appendChild(more);\n    }\n\n    searchResults.classList.remove("hidden");\n  });\n})();<\/script>'], ["", '<nav id="main-nav" class="fixed top-0 left-0 w-full z-50 bg-deepdark/90 backdrop-blur-md border-b border-white/5 transition-all duration-300 animate-fade-in" data-astro-cid-5blmo7yk> <div class="container mx-auto max-w-7xl px-4 md:px-6 h-20 flex justify-between items-center gap-4" data-astro-cid-5blmo7yk> <!-- Logo --> <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0 z-[60]" data-astro-cid-5blmo7yk> <img src="/images/logos/logo side.webp" alt="Should I Run Logo" class="h-10 md:h-12 w-auto object-contain drop-shadow-lg" data-astro-cid-5blmo7yk> </a> <!-- Search Bar (desktop, hidden by default) --> <div id="nav-search-container" class="flex-1 max-w-lg hidden opacity-0 transition-all duration-300" data-astro-cid-5blmo7yk> <div class="relative" data-astro-cid-5blmo7yk> <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brightcyan pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk><circle cx="11" cy="11" r="8" data-astro-cid-5blmo7yk></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-5blmo7yk></line></svg> <input id="nav-search-input" type="text" placeholder="Search tracks by name or city..." class="w-full bg-white/5 border border-white/15 focus:border-brightcyan/60 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200" autocomplete="off" data-astro-cid-5blmo7yk> <div id="nav-search-results" class="absolute top-full left-0 right-0 mt-2 bg-deepdark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden hidden z-50 max-h-80 overflow-y-auto" data-astro-cid-5blmo7yk></div> </div> </div> <!-- Desktop Nav links + controls --> <ul class="flex items-center gap-4 md:gap-6 list-none m-0 p-0 flex-shrink-0" data-astro-cid-5blmo7yk> <!-- Search Toggle --> <li data-astro-cid-5blmo7yk> <button id="nav-search-toggle" aria-label="Search tracks" class="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-brightcyan transition-colors rounded-full hover:bg-white/5 z-[60] relative" data-astro-cid-5blmo7yk> <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk><circle cx="11" cy="11" r="8" data-astro-cid-5blmo7yk></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-5blmo7yk></line></svg> <svg id="search-close-icon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk><line x1="18" y1="6" x2="6" y2="18" data-astro-cid-5blmo7yk></line><line x1="6" y1="6" x2="18" y2="18" data-astro-cid-5blmo7yk></line></svg> </button> </li> <!-- Desktop Links (hidden on mobile) --> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/#tracks" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>Tracks</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/about" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>About</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/partner" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>Partnership</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="/contact" class="text-slate-300 hover:text-brightcyan font-semibold text-sm transition-colors tracking-wide uppercase" data-astro-cid-5blmo7yk>Contact</a> </li> <li class="hidden md:block" data-astro-cid-5blmo7yk> <a href="https://www.paypal.com/donate/?hosted_button_id=Q3BH2KU2Z7JPY" target="_blank" rel="noopener noreferrer" class="bg-brightcyan/10 text-brightcyan hover:bg-brightcyan hover:text-deepdark border border-brightcyan/40 px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300 uppercase" data-astro-cid-5blmo7yk>Buy Me a Coffee ☕</a> </li> <!-- Hamburger (mobile only) --> <li class="md:hidden" data-astro-cid-5blmo7yk> <button id="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false" class="w-11 h-11 flex flex-col justify-center items-center z-[60] relative bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 group active:scale-95" data-astro-cid-5blmo7yk> <div class="relative w-6 h-5 flex flex-col justify-center items-center" data-astro-cid-5blmo7yk> <span id="burger-line-1" class="block w-6 h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center absolute top-[4px]" data-astro-cid-5blmo7yk></span> <span id="burger-line-2" class="block w-4 h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center absolute bottom-[4px] self-end group-hover:w-6" data-astro-cid-5blmo7yk></span> </div> </button> </li> </ul> </div> </nav> <!-- Full-Screen Mobile Menu Overlay --> <div id="mobile-menu" class="fixed inset-0 z-40 bg-deepdark flex flex-col pointer-events-none opacity-0" style="transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);" aria-hidden="true" data-astro-cid-5blmo7yk> <!-- Cyan glow accent --> <div class="absolute top-0 right-0 w-80 h-80 bg-brightcyan/10 blur-[120px] rounded-full pointer-events-none" data-astro-cid-5blmo7yk></div> <div class="absolute bottom-0 left-0 w-64 h-64 bg-brightcyan/5 blur-[100px] rounded-full pointer-events-none" data-astro-cid-5blmo7yk></div> <!-- Menu content: centred vertically --> <div class="flex-1 flex flex-col justify-center px-8 pt-24 pb-12 relative z-10" data-astro-cid-5blmo7yk> <!-- Nav Links --> <nav class="flex flex-col gap-2 mb-12" data-astro-cid-5blmo7yk> ', ' </nav> <!-- CTA Button --> <a href="https://www.paypal.com/donate/?hosted_button_id=Q3BH2KU2Z7JPY" target="_blank" rel="noopener noreferrer" id="mobile-cta" class="inline-flex items-center justify-center gap-2 bg-brightcyan text-deepdark px-8 py-4 rounded-full font-black text-base tracking-widest uppercase shadow-[0_0_30px_rgba(34,227,213,0.3)] hover:shadow-[0_0_40px_rgba(34,227,213,0.5)] transition-all duration-300 w-full text-center mb-10" data-astro-cid-5blmo7yk>\nBuy Me a Coffee ☕\n</a> <!-- Social Links --> <div id="mobile-socials" class="flex items-center gap-5 opacity-0 translate-y-4" style="transition: opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s;" data-astro-cid-5blmo7yk> <a href="https://www.facebook.com/deandaviswebdesign" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 transition-all duration-300" data-astro-cid-5blmo7yk> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-5blmo7yk><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" data-astro-cid-5blmo7yk></path></svg> </a> <a href="https://www.linkedin.com/in/dean-davis-9b84642b/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 transition-all duration-300" data-astro-cid-5blmo7yk> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-5blmo7yk><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" data-astro-cid-5blmo7yk></path><rect x="2" y="9" width="4" height="12" data-astro-cid-5blmo7yk></rect><circle cx="4" cy="4" r="2" data-astro-cid-5blmo7yk></circle></svg> </a> <a href="https://www.instagram.com/deanandthat/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brightcyan hover:border-brightcyan/40 transition-all duration-300" data-astro-cid-5blmo7yk> <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-5blmo7yk><rect x="2" y="2" width="20" height="20" rx="5" ry="5" data-astro-cid-5blmo7yk></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" data-astro-cid-5blmo7yk></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" data-astro-cid-5blmo7yk></line></svg> </a> </div> </div> <!-- Bottom tagline --> <div id="mobile-footer-tag" class="relative z-10 px-8 pb-8 opacity-0" style="transition: opacity 0.4s ease 0.4s;" data-astro-cid-5blmo7yk> <p class="text-slate-600 text-xs uppercase tracking-widest font-bold" data-astro-cid-5blmo7yk>\nShould I Race? · Real-time wind intel for athletes\n</p> </div> </div>  <script>(function(){', '\n  // ── Mobile Menu ──────────────────────────────────────────────\n  const mobileToggle = document.getElementById("mobile-menu-toggle");\n  const mobileMenu = document.getElementById("mobile-menu");\n  const burgerBtn = document.getElementById("mobile-menu-toggle");\n  let menuOpen = false;\n\n  function openMobileMenu() {\n    menuOpen = true;\n    mobileMenu.classList.remove("pointer-events-none");\n    mobileMenu.style.opacity = "1";\n    mobileMenu.setAttribute("aria-hidden", "false");\n    mobileMenu.classList.add("menu-open");\n    burgerBtn.classList.add("burger-open");\n    burgerBtn.setAttribute("aria-expanded", "true");\n    document.body.style.overflow = "hidden";\n  }\n\n  function closeMobileMenu() {\n    menuOpen = false;\n    mobileMenu.style.opacity = "0";\n    mobileMenu.classList.remove("menu-open");\n    burgerBtn.classList.remove("burger-open");\n    burgerBtn.setAttribute("aria-expanded", "false");\n    document.body.style.overflow = "";\n    setTimeout(() => {\n      mobileMenu.classList.add("pointer-events-none");\n      mobileMenu.setAttribute("aria-hidden", "true");\n    }, 400);\n  }\n\n  mobileToggle.addEventListener("click", () => {\n    menuOpen ? closeMobileMenu() : openMobileMenu();\n  });\n\n  // Close when a mobile nav link is clicked\n  document.querySelectorAll(".mobile-nav-link").forEach((link) => {\n    link.addEventListener("click", closeMobileMenu);\n  });\n\n  // Close on Escape\n  document.addEventListener("keydown", (e) => {\n    if (e.key === "Escape" && menuOpen) closeMobileMenu();\n  });\n\n  // ── Desktop Search ───────────────────────────────────────────\n  const searchToggle = document.getElementById("nav-search-toggle");\n  const searchContainer = document.getElementById("nav-search-container");\n  const searchInput = document.getElementById("nav-search-input");\n  const searchResults = document.getElementById("nav-search-results");\n  const searchIcon = document.getElementById("search-icon");\n  const searchCloseIcon = document.getElementById("search-close-icon");\n\n  let searchOpen = false;\n\n  function openSearch() {\n    searchOpen = true;\n    searchContainer.classList.remove("hidden");\n    requestAnimationFrame(() => {\n      searchContainer.classList.remove("opacity-0");\n      searchContainer.classList.add("opacity-100");\n    });\n    searchIcon.classList.add("hidden");\n    searchCloseIcon.classList.remove("hidden");\n    setTimeout(() => searchInput.focus(), 50);\n  }\n\n  function closeSearch() {\n    searchOpen = false;\n    searchContainer.classList.add("opacity-0");\n    searchContainer.classList.remove("opacity-100");\n    setTimeout(() => searchContainer.classList.add("hidden"), 300);\n    searchIcon.classList.remove("hidden");\n    searchCloseIcon.classList.add("hidden");\n    searchInput.value = "";\n    searchResults.classList.add("hidden");\n    searchResults.innerHTML = "";\n  }\n\n  searchToggle.addEventListener("click", () => {\n    searchOpen ? closeSearch() : openSearch();\n  });\n\n  document.addEventListener("keydown", (e) => {\n    if (e.key === "Escape" && searchOpen) closeSearch();\n  });\n\n  document.addEventListener("click", (e) => {\n    if (\n      searchOpen &&\n      !searchContainer.contains(e.target) &&\n      !searchToggle.contains(e.target)\n    ) {\n      closeSearch();\n    }\n  });\n\n  searchInput.addEventListener("input", () => {\n    const query = searchInput.value.trim().toLowerCase();\n    searchResults.innerHTML = "";\n\n    if (query.length < 2) {\n      searchResults.classList.add("hidden");\n      return;\n    }\n\n    const matches = trackData.filter(\n      (t) =>\n        t.name.toLowerCase().includes(query) ||\n        t.city.toLowerCase().includes(query)\n    );\n\n    if (matches.length === 0) {\n      searchResults.innerHTML = \\`<div class="px-5 py-4 text-slate-400 text-sm">No tracks found for "<span class="text-white font-bold">\\${searchInput.value}</span>"</div>\\`;\n      searchResults.classList.remove("hidden");\n      return;\n    }\n\n    matches.slice(0, 8).forEach((track) => {\n      const item = document.createElement("a");\n      item.href = track.url;\n      item.className =\n        "flex items-center gap-3 px-5 py-3.5 hover:bg-brightcyan/10 transition-colors border-b border-white/5 last:border-0 group";\n\n      const highlighted = (str) =>\n        str.replace(\n          new RegExp(\\`(\\${query})\\`, "gi"),\n          \'<mark class="bg-brightcyan/30 text-brightcyan rounded px-0.5">$1</mark>\'\n        );\n\n      item.innerHTML = \\`\n        <svg class="w-4 h-4 text-slate-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>\n        <div>\n          <div class="text-white text-sm font-bold group-hover:text-brightcyan transition-colors">\\${highlighted(track.name)}</div>\n          <div class="text-slate-500 text-xs mt-0.5">\\${highlighted(track.city)}</div>\n        </div>\n        <svg class="w-4 h-4 text-slate-600 ml-auto group-hover:text-brightcyan transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>\n      \\`;\n      searchResults.appendChild(item);\n    });\n\n    if (matches.length > 8) {\n      const more = document.createElement("div");\n      more.className = "px-5 py-3 text-slate-500 text-xs text-center";\n      more.textContent = \\`+\\${matches.length - 8} more results. Refine your search.\\`;\n      searchResults.appendChild(more);\n    }\n\n    searchResults.classList.remove("hidden");\n  });\n})();<\/script>'])), maybeRenderHead(), [
    { href: "/#tracks", label: "Tracks" },
    { href: "/about", label: "About" },
    { href: "/partner", label: "Partnership" },
    { href: "/contact", label: "Contact" }
  ].map((link, i) => renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link text-4xl font-black text-white uppercase tracking-tighter leading-none py-3 border-b border-white/5 flex items-center justify-between group"${addAttribute(`transition-delay: ${i * 60}ms;`, "style")} data-astro-cid-5blmo7yk> <span class="group-hover:text-brightcyan transition-colors duration-200" data-astro-cid-5blmo7yk> ${link.label} </span> <svg class="w-6 h-6 text-brightcyan/40 group-hover:text-brightcyan group-hover:translate-x-1 transition-all duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-5blmo7yk> <polyline points="9 18 15 12 9 6" data-astro-cid-5blmo7yk></polyline> </svg> </a>`), defineScriptVars({ trackData }));
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/Navbar.astro", void 0);

const partners = [
  {
    id: "aflyt",
    name: "Aflyt",
    description: "Clothing brand, for athletes, by athletes. We design for the people who show up when no one is watching.",
    logo: "/images/partner/aflyt-logo-white.webp",
    website: "https://aflyt.co.uk/",
    tier: "Site-Wide Partner",
    pages: ["all"]
  }
];
function getPartnersForPage(page) {
  return partners.filter(
    (p) => p.pages.includes("all") || p.pages.includes(page)
  );
}

const $$PartnerBanner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PartnerBanner;
  const { page, heading = "Our Partners", variant = "full" } = Astro2.props;
  const activePartners = getPartnersForPage(page);
  const isSidebar = variant === "sidebar";
  return renderTemplate`${activePartners.length > 0 && renderTemplate`${maybeRenderHead()}<section${addAttribute(`partner-banner relative overflow-hidden ${isSidebar ? "" : "py-16"}`, "class")}><div${addAttribute(`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brightcyan/[0.04] blur-[120px] rounded-full pointer-events-none ${isSidebar ? "w-[300px] h-[150px]" : "w-[600px] h-[300px]"}`, "class")}></div><div${addAttribute(`${isSidebar ? "" : "container mx-auto px-6 max-w-6xl"} relative z-10`, "class")}><div${addAttribute(`flex items-center gap-4 ${isSidebar ? "mb-6" : "mb-10 text-center"}`, "class")}><span class="inline-block py-1.5 px-4 rounded-full bg-brightcyan/10 border border-brightcyan/30 text-brightcyan text-[10px] font-black tracking-[0.2em] uppercase">${heading}</span><div class="flex-1 h-px bg-white/5"></div></div><div${addAttribute(`grid gap-6 ${isSidebar ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`, "class")}>${activePartners.map((partner) => renderTemplate`<div${addAttribute(`partner-card group bento-card flex flex-col items-start gap-5 transition-all duration-300 hover:border-brightcyan/20 hover:shadow-[0_0_30px_rgba(34,227,213,0.06)] ${isSidebar ? "p-5" : "p-6"}`, "class")}><span${addAttribute(`self-start text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${partner.tier === "Premium Partner" ? "bg-brightcyan/10 border-brightcyan/30 text-brightcyan" : "bg-white/5 border-white/10 text-slate-400"}`, "class")}>${partner.tier}</span><div class="w-full h-16 flex items-center"><img${addAttribute(partner.logo, "src")}${addAttribute(`${partner.name} logo`, "alt")} class="max-h-14 max-w-[160px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div><div class="flex-1"><h3 class="text-white font-black text-base uppercase tracking-tight mb-2">${partner.name}</h3><p class="text-slate-400 text-sm font-medium leading-relaxed">${partner.description}</p></div><a${addAttribute(partner.website, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`mt-auto w-full text-center py-3 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] ${partner.tier === "Premium Partner" ? "bg-brightcyan text-deepdark shadow-[0_0_20px_rgba(34,227,213,0.25)]" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`, "class")}>
Visit Website →
</a></div>`)}</div></div></section>`}`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/PartnerBanner.astro", void 0);

export { $$Layout as $, $$Navbar as a, $$PartnerBanner as b, $$Footer as c, getCollection as g };
