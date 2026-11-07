// Helpers that read the trek files (src/content/treks/*.json) for lists:
// the /treks page, homepage cards, booking forms and the sitemap.
import { getCollection } from 'astro:content';

export const DIFFICULTY_LABEL: Record<string, string> = { easy: 'Easy', moderate: 'Moderate', hard: 'Challenging' };
const GROUP_ORDER: Record<string, number> = { featured: 0, parbat: 1, classic: 2 };

export interface TrekCard {
  slug: string; url: string; name: string; image: string; imageAlt: string;
  region: string; days: number; difficulty: 'easy' | 'moderate' | 'hard'; maxAlt: string;
  blurb?: string; group: string; order: number; bookingName: string;
  fromPrice?: string; peak?: string; // lowest group price ("$350") and highest point ("3,309 m") for cards
  home?: { show: boolean; order: number; name?: string; blurb?: string; badge?: string; image?: string; imageAlt?: string };
}

/** "$350" from a pricing table's lowest per-person price. */
function lowestPrice(pricing: { price: string }[] = []) {
  const n = pricing.map((p) => Number(String(p.price).replace(/[^0-9.]/g, ''))).filter((x) => x > 0);
  return n.length ? '$' + Math.min(...n).toLocaleString('en-US') : undefined;
}
/** "3,309 m" from the page's Max Altitude stat (falls back to nothing). */
function peakOf(stats: { value: string; label: string }[] = []) {
  const s = stats.find((x) => /alt/i.test(x.label));
  return s ? s.value.replace(/\s*m$/i, '').replace(/~|≈/g, '').trim() + ' m' : undefined;
}

/** All published treks with listing info, in /treks order (featured, Parbat, classic). */
export async function getTrekCards(): Promise<TrekCard[]> {
  const all = await getCollection('treks', (t) => !t.data.draft && t.data.listing);
  return all
    .map((t) => {
      const l = t.data.listing!;
      return {
        slug: t.id,
        url: `/${t.id}`,
        name: l.cardName ?? t.data.name,
        image: l.cardImage ?? t.data.seo.image,
        imageAlt: l.cardImageAlt ?? t.data.name,
        region: l.region,
        days: l.days,
        difficulty: l.difficulty,
        maxAlt: l.maxAlt,
        blurb: l.blurb,
        group: l.group,
        order: l.order,
        bookingName: l.bookingName ?? t.data.name,
        fromPrice: lowestPrice(t.data.pricing),
        peak: peakOf(t.data.stats),
        home: t.data.home,
        showOnTreks: l.showOnTreks,
      } as TrekCard & { showOnTreks: boolean };
    })
    .sort((a, b) => (GROUP_ORDER[a.group] - GROUP_ORDER[b.group]) || (a.order - b.order) || a.name.localeCompare(b.name));
}

/** Treks shown on the /treks page. */
export async function getListedTreks() {
  return (await getTrekCards()).filter((t: any) => t.showOnTreks);
}

/** Treks ticked "show on homepage", in their homepage order. */
export async function getHomeTreks() {
  return (await getTrekCards()).filter((t) => t.home?.show).sort((a, b) => (a.home!.order - b.home!.order));
}

/** Names for the booking-form dropdown. */
export async function getBookingNames() {
  return (await getTrekCards()).map((t) => t.bookingName);
}
