# Discover Parbat — website (Astro)

The discoverparbat.com website, rebuilt with [Astro](https://astro.build).
Astro turns the files in `src/` into plain static HTML pages in `dist/`.
That `dist/` folder is what goes on Hostinger.

## Where things live

| You want to change… | Edit this |
|---|---|
| Menu links, email, WhatsApp, booking-form trek list | `src/data/site.js` |
| Header / footer | `src/components/Header.astro`, `Footer.astro` |
| SEO head (canonical, og tags, favicons, robots) for **every** page | `src/layouts/BaseLayout.astro` |
| A trek page's text, itinerary, FAQ, prices | `src/pages/<trek-url>.astro` |
| Trek page structure (hero, gallery, sidebar, schema) | `src/layouts/TrekLayout.astro` |
| Reviews | `src/data/reviews.js` |
| Country list in forms | `src/data/countries.js` |
| Site-wide styles | `src/styles/global.css` |
| Trek page styles | `src/styles/trek-page.css`, `trek-extra.css` |
| Photos, favicons, robots.txt, sitemap, .htaccess, inquiry.php | `public/` (copied as-is) |

**The file name is the URL.** `src/pages/kokhe-danda-trek.astro` becomes
`https://discoverparbat.com/kokhe-danda-trek`. A file in `src/pages/article/`
becomes `/article/…`.

**Photos keep their URLs.** `public/kokhe.jpg` is served at `/kokhe.jpg`,
`public/photo/treks/x.jpg` at `/photo/treks/x.jpg`.

## Editing a trek page

Open e.g. `src/pages/kokhe-danda-trek.astro`. The top part (between the `---`
lines) holds the itinerary, FAQ and gallery lists. The settings on
`<TrekLayout …>` hold the SEO title, description, prices and includes.
Everything below is normal HTML for the left column.

The FAQ and itinerary lists feed both the page **and** the Google schema,
so you only ever change them in one place.

## Adding a new trek page

1. Copy an existing trek page in `src/pages/` (e.g. `poonhill-trek.astro`) and
   rename it to the new URL, e.g. `ghandruk-trek.astro` → `/ghandruk-trek`.
2. Change the settings on `<TrekLayout …>` (title, description, prices…),
   the `itinerary`, `faqs` and `gallery` lists at the top, and the text.
3. Add the trek's name to `BOOKING_TREKS` in `src/data/site.js` so it shows
   in every booking form.
4. Put its photos in `public/photo/treks/`.

Trek page building blocks (in `src/components/trek/`): `VideoEmbed`,
`HighlightsBox`, `RightForYou`, `Itinerary`, `RouteMap`, `FaqList`, `Reviews`.

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

## Email form

`public/inquiry.php` sends booking emails. It reads the SMTP password from
`smtp-config.php` on the server (or the `DISCOVERPARBAT_SMTP_PASSWORD`
environment variable). **`smtp-config.php` is never committed to Git.**
It stays only on the server.
