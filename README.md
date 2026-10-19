# Discover Parbat — website (Astro)

The discoverparbat.com website, rebuilt with [Astro](https://astro.build).
Astro turns the files in `src/` into plain static HTML pages in `dist/`.
That `dist/` folder is what goes on Hostinger.

## Where things live

| You want to change… | Edit this |
|---|---|
| Menu links, email, WhatsApp | `src/data/site.js` |
| Treks, shop prints, departures, article cards | the CMS (see below) |
| Header / footer | `src/components/Header.astro`, `Footer.astro` |
| SEO head (canonical, og tags, favicons, robots) for **every** page | `src/layouts/BaseLayout.astro` |
| A trek page's text, itinerary, FAQ, prices | CMS → Treks (`src/content/treks/<trek-url>.json`) |
| Trek page structure (hero, gallery, sidebar, schema) | `src/layouts/TrekLayout.astro` |
| Country list in forms | `src/data/countries.js` |
| Site-wide styles | `src/styles/global.css` |
| Trek page styles | `src/styles/trek-page.css`, `trek-extra.css` |
| Photos, favicons, robots.txt, sitemap, .htaccess, inquiry.php | `public/` (copied as-is) |

**The file name is the URL.** `src/pages/kokhe-danda-trek.astro` becomes
`https://discoverparbat.com/kokhe-danda-trek`. A file in `src/pages/article/`
becomes `/article/…`.

**Photos keep their URLs.** `public/kokhe.jpg` is served at `/kokhe.jpg`,
`public/photo/treks/x.jpg` at `/photo/treks/x.jpg`.

## Admin / CMS (no code needed)

Log in at **https://app.pagescms.org** with the GitHub account, open
`discoverparbat/discoverparbat-astro`. The forms come from `.pages.yml`:

- **Treks**: every trek page (SEO, banner, facts, gallery, prices, includes,
  itinerary, FAQ, reviews, page sections). Each trek is one file in
  `src/content/treks/` and its file name is its URL
  (`kokhe-danda-trek.json` → `/kokhe-danda-trek`). Tick boxes decide where it
  shows: **Treks page & lists** (the /treks page) and **Homepage**
  ("Featured Treks"). New treks appear in every booking form automatically.
  "Draft" hides a trek completely.
- **Homepage – Fixed departures**: dates in the past hide automatically on
  the next update.
- **Shop – Photo prints**: add/remove/reorder prints, default prices for all
  prints, optional price per print.
- **Articles list**: the cards on /articles (newest first). The 5 newest
  English articles (by **Publish date**) also show on the homepage, with their
  **Short summary**.

Every save is a commit → GitHub rebuilds the preview and the `deploy`
branch within ~2 minutes → Hostinger publishes it (automatic if the Hostinger
Git webhook is set up, otherwise press Deploy in Hostinger).

Nothing is lost: every change is kept in GitHub history and can be undone.

## Articles

- New articles (from Oct 2026) live in `src/pages/article/` → URL `/article/your-slug`,
  with their photos in `public/article/`.
- Older articles stay where they were (`src/pages/<slug>.astro` → `/<slug>`),
  so their Google rankings and links keep working.
- Each article keeps its own design: its styles are in the `<style is:global>`
  block at the top of the file, followed by the article HTML.
- `src/layouts/ArticleLayout.astro` adds the head (SEO, social cards, article
  dates), header and footer.

**Adding an article**
1. Copy a recent article (e.g. `src/pages/article/khayer-lake-guide.astro`)
   to `src/pages/article/new-slug.astro` and replace the settings on
   `<ArticleLayout …>`, the schema and the article HTML.
2. Add its card to the top of `src/data/articles.js` (pick the category;
   Nepali articles use `category: 'nepali'`). The /articles page, its counts,
   "View all" buttons and its schema update automatically.

## Running it on your computer (optional)

```
npm install      # once
npm run dev      # live preview at http://localhost:4321/kokhe-danda-trek
npm run build    # builds the final site into dist/
```

## Other pages

Home, About, Contact, Custom Trek, Shop, Cancellation, Success and Thank-you
are in `src/pages/` and keep their own design (styles at the top of each file).

- `/treks`, homepage "Featured Treks", the contact page trek list and quick
  enquiry cards, and all booking forms are built from the trek files — add a
  trek in the CMS and it appears everywhere.
- `sitemap.xml` is built automatically from every page (see
  `src/pages/sitemap.xml.js` for the few pages left out).
- `src/pages/404.astro` is shown for any URL that doesn't exist.

## Publishing

Every push to `main` runs two GitHub Actions:
- **Preview on GitHub Pages** → https://discoverparbat.github.io/discoverparbat-astro/
  (marked noindex, never competes with the real site)
- **Build deploy branch** → puts the finished site on the `deploy` branch.
  Hostinger's Git deployment should pull the `deploy` branch (not `main`).

Photos: keep them under ~2400 px wide before adding them to `public/`.

## Email form

`public/inquiry.php` sends booking emails. It reads the SMTP password from
`smtp-config.php` on the server (or the `DISCOVERPARBAT_SMTP_PASSWORD`
environment variable). **`smtp-config.php` is never committed to Git.**
It stays only on the server.
