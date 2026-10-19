// Helpers that read the trek files (src/content/treks/*.json) for lists:
// the /treks page, homepage cards, booking forms and the sitemap.
import { getCollection } from 'astro:content';

export const DIFFICULTY_LABEL: Record<string, string> = { easy: 'Easy', moderate: 'Moderate', hard: 'Challenging' };
const GROUP_ORDER: Record<string, number> = { featured: 0, parbat: 1, classic: 2 };

export interface TrekCard {
  slug: string; url: string; name: string; image: string; imageAlt: string;
  region: string; days: number; difficulty: 'easy' | 'moderate' | 'hard'; maxAlt: string;
  blurb?: string; group: string; order: number; bookingName: string;
  home?: { show: boolean; order: number; blurb?: string; badge?: string; image?: string; imageAlt?: string };
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
