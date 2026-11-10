import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { trackUrl } from "../utils/tracks";

/** Compact list of every track, used by the "nearest track" button. */
export const GET: APIRoute = async () => {
  const tracks = await getCollection("tracks");
  const body = tracks.map((t) => ({
    name: t.data.name,
    city: t.data.city,
    lat: t.data.lat,
    lng: t.data.lng,
    url: trackUrl(t.data),
  }));
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
