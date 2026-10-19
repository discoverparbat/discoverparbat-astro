// ─── ARTICLES LIST ──────────────────────────────────────
// Every card on https://discoverparbat.com/articles comes from this file.
//
// HOW TO ADD AN ARTICLE
//   1. Create the article page (src/pages/article/your-slug.astro).
//   2. Copy one { … } card below and paste it at the TOP of the list
//      (newest first), then change url, image, title, tag, date and category.
//   3. category is one of: 'trek-guides', 'planning', 'weather', 'news', 'nepali'
//      Nepali-language articles always use category: 'nepali'.
//
// The page shows the first 3 cards of each category and puts the rest
// behind a "View all" button automatically.

export const CATEGORIES = [
  { id: "trek-guides", title: "Trek Guides", description: "Route guides and trek comparisons to help you choose the right Himalayan trail." },
  { id: "planning", title: "Planning", description: "Packing lists, permits, preparation and practical advice before you trek." },
  { id: "weather", title: "Weather", description: "Seasons, conditions and the best months to walk the trails of Parbat." },
  { id: "news", title: "News", description: "Trail updates and what is changing in Nepal's trekking regions." },
  { id: "nepali", title: "नेपाली लेख", description: "पर्वत र आसपासका घुम्ने ठाउँ, पदयात्रा, मौसम र स्थानीय जानकारी, नेपाली भाषामा।", lang: "ne" },
];

export const ARTICLES = [
  {
    url: "/article/khayer-lake-guide",
    title: "Khayer Lake: The Sacred Lake Above Khopra Ridge",
    image: "/photo/treks/khayer-lake.jpg",
    tag: "Trek Guide",
    date: "Oct 2026",
    category: "trek-guides",
  },
  {
    url: "/article/ghorepani-village-guide",
    title: "Ghorepani Village, Nepal: Where It Is, How to Get There and Where to Stay",
    image: "/article/ghorepani-village.jpg",
    tag: "Trek Guide",
    date: "Oct 2026",
    category: "trek-guides",
  },
  {
    url: "/article/kokhe-danda-vs-mardi-himal-trek",
    title: "Kokhe Danda vs Mardi Himal Trek: Which 5-Day Trek Is Better?",
    image: "/article/kokhe-danda-vs-mardi-himal.png",
    tag: "Trek Guide",
    date: "Oct 2026",
    category: "trek-guides",
  },
  {
    url: "/khopra-ridge-vs-annapurna-base-camp",
    title: "Khopra Ridge vs Annapurna Base Camp: Which Trek Is Better?",
    image: "/khopra-ridge-trek.jpg",
    tag: "Trek Guide",
    date: "Oct 2026",
    category: "trek-guides",
  },
  {
    url: "/multiple-viewpoints-trek-alternative-to-annapurna-circuit",
    title: "Multiple Viewpoints Trek: The Best Alternative to the Annapurna Circuit",
    image: "/khopra3.jpg",
    imageAlt: "Multiple Viewpoints Trek, an alternative to the Annapurna Circuit",
    tag: "Trek Guide",
    date: "Oct 2026",
    category: "trek-guides",
  },
  {
    url: "/article/why-kokhe-danda-trek",
    title: "Why You Should Choose Discover Parbat for Kokhe Danda Trek",
    image: "/kokhe.jpg",
    imageAlt: "Kokhe Danda Trek",
    tag: "Trek Guide",
    date: "2026",
    category: "trek-guides",
  },
  {
    url: "/annapurna-circuit-trail-condition-update",
    title: "Annapurna Circuit Trek Update: Latest Trail, Road & Flood Conditions",
    image: "/act1.jpg",
    imageAlt: "Annapurna Circuit Update Trek",
    tag: "Planning",
    date: "Sep 2026",
    category: "planning",
  },
  {
    url: "/kokhe-danda-trek-alternative-to-poon-hill",
    title: "Why Kokhe Danda Trek Is A Better Alternative To Poonhill Trek",
    image: "/kokhe1.jpg",
    imageAlt: "Kokhe Danda Trek",
    tag: "Planning",
    date: "Sep 2026",
    category: "planning",
  },
  {
    url: "/what-to-pack-for-khopra-ridge-trek",
    title: "What to Pack for the Khopra Ridge Trek",
    image: "/khopra.jpg",
    imageAlt: "Khopra Ridge Trek packing list",
    tag: "Planning",
    date: "Sep 2026",
    category: "planning",
  },
  {
    url: "/best-season-for-kokhe-danda-trek",
    title: "Best Season For Kokhe Danda Trek",
    image: "/kokhe4.jpg",
    imageAlt: "Kokhe Danda Trek",
    tag: "Planning",
    date: "Sep 2026",
    category: "planning",
  },
  {
    url: "/article/parbat-district-travel-guide",
    title: "Parbat District, Nepal: A Local's Travel Guide to Kushma, Treks and Village Homestays",
    image: "/haljure.jpg",
    imageAlt: "Parbat District Travel Guide",
    tag: "Planning",
    date: "Oct 2026",
    category: "planning",
  },
  {
    url: "/article/nepal-monsoon-officially-exits-2026",
    title: "Monsoon Officially Exits Nepal: Clear Weather and the Best Time for Trekking in 2026",
    image: "/article/monsoon-exits-nepal.jpg",
    imageAlt: "Dhaulagiri range from Kokhe Danda after Nepal's monsoon withdrawal, October 2026",
    tag: "Weather",
    date: "Oct 2026",
    category: "weather",
  },
  {
    url: "/nepal-weather-update-october-2026",
    title: "October Is Here, So Why Is It Still Raining in Nepal? Monsoon Exit & Trekking Outlook",
    image: "/khopra3.jpg",
    imageAlt: "Nepal weather update October 2026, monsoon exit and autumn trekking outlook",
    tag: "Weather",
    date: "Oct 2026",
    category: "weather",
  },
  {
    url: "/article/manaslu-trek-update-alternatives",
    title: "Manaslu Trek Update: 3 Best Alternatives to Explore in Nepal",
    image: "/mulde-view-point.jpg",
    tag: "News",
    date: "Oct 2026",
    category: "news",
  },
  {
    url: "/khopra-ridge-trek-alternative-to-langtang-trek",
    title: "Khopra Ridge Trek: The Best Alternative to Langtang Trek After the 2026 Flood",
    image: "/khopra1.jpg",
    imageAlt: "Khopra Ridge Trek, an alternative to Langtang after the 2026 flood",
    tag: "News",
    date: "Sep 2026",
    category: "news",
  },
  {
    url: "/parbat-dashain-travel-destinations",
    title: "दशैंको बिदामा घुम्न जाने सोचमा हुनुहुन्छ? पर्वतका यी ५ ठाउँ छुटाउनै हुँदैन",
    image: "/kokhe-danda.jpg",
    imageAlt: "दशैंमा घुम्न सकिने पर्वतका ५ ठाउँ, कोखे डाँडा",
    tag: "घुमफिर",
    date: "असोज २०८३",
    category: "nepali",
  },
];
