import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import type { z as zod } from 'zod';

const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['breakfast', 'coffee', 'lunch', 'dinner', 'bar', 'culture', 'other']),
  neighborhood: z.string(),
  price: z.number().int().min(1).max(3),
  note: z.string(),
  tip: z.string().optional(),
  maps_url: z.string().url(),
  image_query: z.string(),
});

const neighborhoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  vibe: z.string(),
  best_for: z.string(),
  insider: z.string(),
});

const ruleSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  category: z.enum(['social', 'food', 'transport', 'shopping', 'etiquette', 'timing']),
});

const lexiconSchema = z.object({
  word: z.string(),
  pronunciation: z.string(),
  meaning: z.string(),
});

const routeStepSchema = z.object({
  time: z.string(),
  place_name: z.string(),
  note: z.string(),
  maps_url: z.string().url(),
});

const routeSchema = z.object({
  slug: z.string(),
  title: z.string(),
  duration: z.string(),
  vibe: z.string(),
  cost: z.string(),
  description: z.string(),
  steps: z.array(routeStepSchema),
});

const citySchema = z.object({
  meta: z.object({
    slug: z.string(),
    name: z.string(),
    country: z.string(),
    tagline: z.string(),
    intro: z.string(),
    cover_gradient: z.tuple([z.string(), z.string()]),
  }),
  places: z.array(placeSchema),
  neighborhoods: z.array(neighborhoodSchema),
  rules: z.array(ruleSchema),
  lexicon: z.array(lexiconSchema),
  routes: z.array(routeSchema),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cities' }),
  schema: citySchema,
});

export const collections = { cities };

export type Place = zod.infer<typeof placeSchema>;
export type Neighborhood = zod.infer<typeof neighborhoodSchema>;
export type Rule = zod.infer<typeof ruleSchema>;
export type LexiconEntry = zod.infer<typeof lexiconSchema>;
export type RouteStep = zod.infer<typeof routeStepSchema>;
export type Route = zod.infer<typeof routeSchema>;
export type City = zod.infer<typeof citySchema>;
