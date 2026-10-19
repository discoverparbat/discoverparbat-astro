// Builds https://discoverparbat.com/sitemap.xml automatically from every page
// in src/pages plus every trek file — a new trek or article is added the moment
// its file exists.
// Pages that shouldn't be in Google are listed in EXCLUDE.
import { SITE } from '../data/site.js';
import { getCollection } from 'astro:content';

const EXCLUDE = ['/404', '/success', '/thank-you', '/shop-order'];

export async function GET() {
  const files = Object.keys(import.meta.glob('./**/*.astro'));
  const paths = files
    .map((f) => f.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/index$/, '') || '/')
    .map((p) => (p === '' ? '/' : p))
    .filter((p) => !EXCLUDE.includes(p) && !p.includes('['))
    .concat((await getCollection('treks', (t) => !t.data.draft)).map((t) => '/' + t.id))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

  const urls = paths.map((p) => `  <url><loc>${SITE.url}${p === '/' ? '/' : p}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
