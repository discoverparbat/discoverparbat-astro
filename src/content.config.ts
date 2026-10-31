// Content the CMS edits. Each trek is one JSON file in src/content/treks/
// (the file name is the URL: kokhe-danda-trek.json → /kokhe-danda-trek).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const text = z.string();

// The CMS may save empty fields as "" or null — treat those as "not set".
function stripEmpty(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(stripEmpty).filter((x) => x !== undefined);
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) {
      const c = stripEmpty(x);
      if (c !== undefined) out[k] = c;
    }
    return out;
  }
  if (v === null || v === '') return undefined;
  return v;
}
const section = z.object({ type: z.string() }).passthrough();

const treks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/treks' }),
  schema: z.preprocess(stripEmpty, z.object({
    name: text,
    draft: z.boolean().optional(),
    updated: z.union([z.string(), z.date()]).optional(),  // last content update, shown on the page + dateModified
    seo: z.object({
      title: text,
      description: text,
      keywords: text.optional(),
      image: text,
      imageAlt: text.optional(),
      ogDescription: text.optional(),
      twitterImage: text.optional(),
    }),
    tripName: text.optional(),
    tripDescription: text.optional(),
    hero: z.object({ image: text.optional(), alt: text, eyebrow: text, title: text, subtitle: text }),
    stats: z.array(z.object({ value: text, label: text })),
    gallery: z.array(z.object({ src: text, alt: text })),
    pricing: z.array(z.object({ group: text, price: text })),
    pricingNote: text.optional(),
    pricingFootnote: text.optional(),
    included: z.array(text),
    notIncluded: z.array(text),
    itinerary: z.array(z.object({
      title: text,
      text: z.array(text),
      altitude: text.optional(),
      distance: text.optional(),
      time: text.optional(),
      stay: text.optional(),
      more: z.array(z.object({ label: text, value: text })).optional(),
      day: text.optional(),
    }).passthrough()),
    faqs: z.array(z.object({ q: text, a: text })).default([]),
    reviews: z.array(z.object({
      name: text, country: text, trek: text, text: text,
      stars: z.number().optional(), initial: text.optional(),
    })).optional(),
    sections: z.array(section),
    extraSchema: text.optional(),
    related: z.array(text).optional(),
    listing: z.object({
      showOnTreks: z.boolean().default(true),
      group: z.enum(['featured', 'parbat', 'classic']).default('classic'),
      order: z.number().default(99),
      region: text,
      days: z.number(),
      difficulty: z.enum(['easy', 'moderate', 'hard']),
      maxAlt: text,
      cardName: text.optional(),
      blurb: text.optional(),
      cardImage: text.optional(),
      cardImageAlt: text.optional(),
      bookingName: text.optional(),
    }).optional(),
    home: z.object({
      show: z.boolean().default(false),
      order: z.number().default(99),
      blurb: text.optional(),
      badge: text.optional(),
      image: text.optional(),
      imageAlt: text.optional(),
    }).optional(),
  })),
});

export const collections = { treks };
