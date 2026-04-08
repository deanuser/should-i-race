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
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    trackInfo: z.array(z.object({
      heading: z.string(),
      text: z.string(),
      icon: z.string().optional(),
      linkUrl: z.string().optional(),
      linkLabel: z.string().optional(),
    })).optional(),
  }),
});

export const collections = {
  tracks: trackCollection,
};
