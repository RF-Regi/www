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
    items_label: z.string().optional(),
  }),
});

const nettsted = defineCollection({
  loader: file('./src/data/site.yaml'),
  schema: z.object({
    title: z.string(),
    slogan: z.string(),
    description: z.string(),
    facebook: z.string().optional(),
    footer_text: z.string().optional(),
  }),
});

const lenke = z.object({ label: z.string(), url: z.string() });

const forside = defineCollection({
  loader: file('./src/data/forside.yaml'),
  schema: z.object({
    hero: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
      cta_primary: lenke,
      cta_secondary: lenke,
    }),
    section_title: z.string(),
    cards: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        image: z.string(),
        alt: z.string(),
        text: z.string(),
      }),
    ),
  }),
});

const meny = defineCollection({
  loader: file('./src/data/meny.yaml'),
  schema: z.object({
    items: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
        children: z.array(lenke).optional(),
      }),
    ),
  }),
});

const sidetekst = z.object({ title: z.string(), teaser: z.string() });

const undersider = defineCollection({
  loader: file('./src/data/undersider.yaml'),
  schema: z.object({
    styret: sidetekst,
    lydpakker: sidetekst,
    lyspakker: sidetekst,
    kontakt: z.object({
      title: z.string(),
      teaser: z.string(),
      generell_tittel: z.string(),
      generell_tekst: z.string(),
      utleie_tittel: z.string(),
      utleie_tekst: z.string(),
    }),
    ikke_funnet: sidetekst,
  }),
});

const referater = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/referater' }),
  schema: z.object({
    tittel: z.string(),
    år: z.number(),
    halvår: z.enum(['vår', 'høst']),
    ekstraordinær: z.boolean().default(false),
    fil: z.string(),
  }),
});

export const collections = { sider, styret, pakker, nettsted, forside, meny, undersider, referater };
