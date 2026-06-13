/**
 * Sitemap generator for Isha Systems LLC.
 *
 * Single source of truth for the public, crawlable pages. Emits
 * `public/sitemap.xml` with multi-language (en/es) hreflang alternates so
 * search engines understand the EN/ES variants share the same URL.
 *
 * Usage:  node scripts/generate-sitemap.mjs
 * Wired into `npm run build` via the `prebuild` script.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://www.ishasystems.com';

// Public routes. `lastmod` defaults to today (build time) when omitted.
const PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

const LANGS = ['en', 'es'];
const today = new Date().toISOString().slice(0, 10);

function urlEntry({ path, changefreq, priority }) {
  const loc = `${SITE_ORIGIN}${path}`;
  // hreflang alternates: EN/ES share the same URL, plus x-default.
  const alternates = [
    ...LANGS.map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`,
  ].join('\n');

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.map(urlEntry).join('\n')}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, 'utf8');

console.log(`✓ sitemap.xml generated with ${PAGES.length} URLs at ${outPath}`);
