// ─── SITE-WIDE SETTINGS ─────────────────────────────────
// Change something here once and it updates on every page.

export const SITE = {
  name: 'Discover Parbat',
  url: 'https://discoverparbat.com', // non-www, no trailing slash
  email: 'info@discoverparbat.com',
  whatsapp: '9779867649780',
  logo: '/logo.png',
  themeColor: '#1a3d2b',
  defaultImage: '/kokhe.jpg',
  facebook: 'https://www.facebook.com/discoverparbat',
  google: 'https://maps.app.goo.gl/wJ8wzmghg8FJQt8T8',
};

// Main menu (header, mobile menu and footer "Explore" column)
export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Treks', href: '/treks' },
  { label: 'Custom Trek', href: '/custom-trek' },
  { label: 'Articles', href: '/articles' },
  { label: 'Shop', href: '/shop' },
];

// Footer "Company" column
export const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Cancellation Policy', href: '/cancellation' },
];

/** Turn a path like "/kokhe.jpg" into "https://discoverparbat.com/kokhe.jpg" */
export function absUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;
  if (path === '/' || path === '') return SITE.url + '/';
  return SITE.url + (path.startsWith('/') ? path : '/' + path);
}
