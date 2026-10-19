// Turns the built site (dist/) into a GitHub Pages PREVIEW.
// GitHub Pages serves the site under /discoverparbat-astro/, so this script
// prefixes every root link ("/kokhe.jpg") with that folder, and marks every
// page noindex so Google never indexes the preview (only the real site).
// Used only by .github/workflows/preview.yml — never touches the real site.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2] || '/discoverparbat-astro';
const dir = 'dist';

function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) fixHtml(p);
  }
}

function fixHtml(p) {
  let s = readFileSync(p, 'utf8');
  s = s.replace(/(src|href|action)="\/(?!\/)/g, `$1="${base}/`);
  s = s.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, nofollow">');
  s = s.replace('</body>', `<div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#b45309;color:#fff;font:600 13px/1.4 sans-serif;text-align:center;padding:6px">PREVIEW — not the live site</div>\n</body>`);
  writeFileSync(p, s);
}

walk(dir);
writeFileSync(join(dir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log('Preview prepared for', base);
