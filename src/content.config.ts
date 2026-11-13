import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const sider = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    teaser: z.string().optional(),
    permalink: z.string(),
    showForm: z.enum(['none', 'join', 'contact']).default('none'),
  }),
});

const styret = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/styret' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    order: z.number().default(99),
    image: z.string().optional(),
  }),
});

const pakker = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pakker' }),
  schema: z.object({
    type: z.enum(['lyd', 'lys']),
    title: z.string(),
    order: z.number().default(99),
    image: z.string().optional(),
    items: z.array(z.string()).optional(),
  }),
});

const nettsted = defineCollection({
  loader: file('./src/data/site.yaml'),
  schema: z.object({
    title: z.string(),
    slogan: z.string(),
    description: z.string(),
    facebook: z.string().optional(),
  }),
});

export const collections = { sider, styret, pakker, nettsted };
