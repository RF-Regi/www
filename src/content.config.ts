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
    les_mer_tekst: z.string().optional(),
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

// Sidetekster: én fil per side i src/data/sider-tekster/. Filens rotnøkkel blir
// oppføringens id (f.eks. «styret»), og data under den blir entry.data.
const sidetekstStyret = defineCollection({
  loader: file('./src/data/sider-tekster/styret.yaml'),
  schema: z.object({
    title: z.string(),
    teaser: z.string(),
    intro: z.string().optional(),
  }),
});

const sidetekstGeneralforsamling = defineCollection({
  loader: file('./src/data/sider-tekster/generalforsamling.yaml'),
  schema: z.object({
    title: z.string(),
    teaser: z.string(),
    vedtekter_tittel: z.string(),
    vedtekter_tekst: z.string(),
    innkalling_tekst: z.string(),
    referater_tittel: z.string(),
    notat: z.string(),
  }),
});

const sidetekstKontakt = defineCollection({
  loader: file('./src/data/sider-tekster/kontakt.yaml'),
  schema: z.object({
    title: z.string(),
    teaser: z.string(),
    generell_tittel: z.string(),
    generell_tekst: z.string(),
    utleie_tittel: z.string(),
    utleie_tekst: z.string(),
    styret_tittel: z.string().optional(),
  }),
});

const sidetekstLydpakker = defineCollection({
  loader: file('./src/data/sider-tekster/lydpakker.yaml'),
  schema: z.object({ title: z.string(), teaser: z.string() }),
});

const sidetekstLyspakker = defineCollection({
  loader: file('./src/data/sider-tekster/lyspakker.yaml'),
  schema: z.object({ title: z.string(), teaser: z.string() }),
});

const sidetekstIkkeFunnet = defineCollection({
  loader: file('./src/data/sider-tekster/ikke_funnet.yaml'),
  schema: z.object({ title: z.string(), teaser: z.string() }),
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

export const collections = { sider, styret, pakker, nettsted, forside, meny, referater, sidetekstStyret, sidetekstGeneralforsamling, sidetekstKontakt, sidetekstLydpakker, sidetekstLyspakker, sidetekstIkkeFunnet };
