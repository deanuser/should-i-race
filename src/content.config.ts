import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trackCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tracks" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    city: z.string(),
    region: z.string(),
    subRegion: z.string(),
    country: z.string(),
    trackDirection: z.number(),
    lat: z.number(),
    lng: z.number(),
  }),
});

export const collections = {
  tracks: trackCollection,
};
