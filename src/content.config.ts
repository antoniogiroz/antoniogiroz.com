import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ es: z.string(), en: z.string() });

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    /** Same value in every translation of a post */
    translationKey: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['app', 'web']),
    status: z.enum(['live', 'building', 'idea']),
    year: z.number(),
    description: localized,
    platforms: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    /** A page or app to open */
    url: z.string().optional(),
    /** Public source code */
    repo: z.url().optional(),
    /** Not out yet: offer to follow the news on Bluesky */
    follow: z.boolean().default(false),
    icon: z.enum(['avatar', 'palette', 'glyph', 'dumbbell']),
    mood: z.string().default('smile'),
    say: localized,
    order: z.number().default(0),
  }),
});

const uses = defineCollection({
  loader: file('src/content/uses.yaml'),
  schema: z.object({
    title: localized,
    order: z.number(),
    items: z.array(
      z.object({
        name: z.string(),
        note: localized,
        url: z.url().optional(),
      }),
    ),
  }),
});

export const collections = { blog, projects, uses };
