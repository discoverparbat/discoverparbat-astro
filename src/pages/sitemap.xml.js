// Builds https://discoverparbat.com/sitemap.xml automatically from every page
// in src/pages plus every trek file — a new trek or article is added the moment
// its file exists.
// Pages that shouldn't be in Google are listed in EXCLUDE. Files starting with
// "_" (like article/_template.astro) are never pages, so they're skipped too.
//
// <lastmod> (tells Google when a page last changed):
//  - articles: the modified="…" (or published="…") date on <ArticleLayout>
//  - treks:    the "updated" date in the trek file (CMS → Treks → Last updated)
//  - other pages: no date, so Google decides
import { SITE } from '../data/site.js';
import { getCollection } from 'astro:content';

const EXCLUDE = ['/404', '/success', '/thank-you', '/shop-order'];

// Raw source of every page, so we can read the article dates.
const sources = import.meta.glob('./**/*.astro', { query: '?raw', import: 'default', eager: true });

const toPath = (f) => f.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/index$/, '') || '/';
const day = (v) => {
  if (!v) return null;
  const s = v instanceof Date ? v.toISOString() : String(v);
  const m = s.match(/^\d{4}-\d{2}-\d{2}/);
  return m ? m[0] : null;
};
const articleDate = (src) => {
  const m = src.match(/\bmodified="([^"]+)"/) || src.match(/\bpublished="([^"]+)"/);
  return m ? day(m[1]) : null;
};

export async function GET() {
  const entries = new Map();

  for (const [file, src] of Object.entries(sources)) {
    const p = toPath(file);
    const base = file.split('/').pop();
    if (EXCLUDE.includes(p) || p.includes('[') || base.startsWith('_')) continue;
    entries.set(p, articleDate(src));
  }

  for (const t of await getCollection('treks', (t) => !t.data.draft)) {
    entries.set('/' + t.id, day(t.data.updated));
  }

  const paths = [...entries.keys()].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
  const urls = paths
    .map((p) => {
      const loc = `${SITE.url}${p === '/' ? '/' : p}`;
      const lastmod = entries.get(p);
      return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
