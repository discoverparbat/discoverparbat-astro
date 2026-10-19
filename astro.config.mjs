// Discover Parbat — Astro config
// Builds a fully static site: every page becomes a plain .html file
// (e.g. src/pages/kokhe-danda-trek.astro → dist/kokhe-danda-trek.html).
// .htaccess (in /public) serves those files at clean URLs with no .html
// and no trailing slash, exactly like the old site.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://discoverparbat.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // keep the CSS in each page's <head> instead of separate small files
    inlineStylesheets: 'auto',
  },
  compressHTML: false,
});
