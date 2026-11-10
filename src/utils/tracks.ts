import type { CollectionEntry } from "astro:content";

type TrackData = CollectionEntry<"tracks">["data"];

/** Site path for a track page. Regions without sub-regions use the shorter URL. */
export function trackUrl(track: TrackData): string {
  return track.subRegion === "all"
    ? `/${track.country}/${track.region}/${track.slug}`
    : `/${track.country}/${track.region}/${track.subRegion}/${track.slug}`;
}

/** schema.org description of a track, for the JSON-LD block on its page. */
export function trackStructuredData(track: TrackData, pageUrl: string) {
  const info = (heading: string) =>
    track.trackInfo?.find((i) => i.heading.toLowerCase() === heading);
  const address = info("address")?.text;
  const website = info("website")?.linkUrl;

  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: track.name,
    url: pageUrl,
    sport: "Athletics",
    geo: {
      "@type": "GeoCoordinates",
      latitude: track.lat,
      longitude: track.lng,
    },
    address: {
      "@type": "PostalAddress",
      ...(address ? { streetAddress: address } : {}),
      addressLocality: track.city,
      addressCountry: "GB",
    },
    ...(website ? { sameAs: website } : {}),
  };
}
