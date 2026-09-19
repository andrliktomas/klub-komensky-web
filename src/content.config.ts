import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const priloha = z.object({ nazev: z.string(), soubor: z.string() });

const aktuality = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuality' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    rubrika: z.enum(['Exkurze', 'Semináře', 'Ze života klubu']),
    perex: z.string(),
    prilohy: z.array(priloha).default([]),
  }),
});

const akce = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/akce' }),
  schema: z.object({
    title: z.string(),
    typ: z.enum(['Zahraniční exkurze', 'Seminář', 'Valná hromada']),
    misto: z.string(),
    zeme: z.string().optional(),
    od: z.coerce.date(),
    do: z.coerce.date().optional(),
    terminText: z.string(),
    perex: z.string(),
    akreditace: z.string().optional(),
    // pro mapu cest na úvodní stránce
    mapa: z.object({ popisek: z.string(), lat: z.number(), lon: z.number() }).optional(),
    album: z.string().optional(),
    prilohy: z.array(priloha).default([]),
  }),
});

export const collections = { aktuality, akce };
