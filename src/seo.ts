/**
 * Centralised, language-aware SEO + AEO (Answer Engine Optimization) module.
 *
 * This project is a hash-routed SPA, so there is no server framework to render
 * <head> tags per route. Instead of pulling in react-helmet, we keep the existing
 * lightweight approach and mutate document.head imperatively. This module is the
 * single source of truth for:
 *   - Localized <title> + <meta name="description">
 *   - Open Graph + Twitter Card tags (with locale)
 *   - rel="canonical" + hreflang alternates (en / es / x-default)
 *   - JSON-LD structured data (ProfessionalService) injected per language
 *
 * Visual design/layout is intentionally untouched.
 */

export type Lang = 'en' | 'es';

/** Canonical host. The codebase consistently uses the www host, so we keep it. */
export const SITE_ORIGIN = 'https://www.ishasystems.com';

/** Absolute URL of the social-share preview image. */
const OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

/** Maps an internal tab key to its public, crawlable path. */
const TAB_PATHS: Record<string, string> = {
  home: '/',
  pricing: '/pricing',
  portfolio: '/portfolio',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  unsubscribe: '/unsubscribe',
};

interface PageSeo {
  title: string;
  description: string;
  /** Short alt text describing the OG image for this page (accessibility + AEO). */
  imageAlt: string;
}

/**
 * Per-page, per-language metadata. Keywords are integrated naturally for a
 * US + Canada small-business audience (e.g. "affordable small business web
 * design US", "managed website subscription Canada", "no upfront cost web
 * development").
 */
const SEO_BY_LANG: Record<Lang, Record<string, PageSeo>> = {
  en: {
    home: {
      title:
        'Affordable Small Business Web Design (US & Canada) | $0 to Start, $29.99/mo | ISHA Systems LLC',
      description:
        'Managed website subscription for small businesses across the US & Canada. No upfront cost web development — free domain, business email, hosting & SSL. Live in 7 days, just $29.99/month, with full code ownership after 12 months.',
      imageAlt:
        'ISHA Systems LLC — affordable managed website subscription for small businesses, $0 setup and $29.99/mo.',
    },
    pricing: {
      title:
        'Website Pricing — $0 Setup, $29.99/mo, Everything Included | ISHA Systems LLC',
      description:
        'Transparent managed website subscription pricing for US & Canada small businesses: $0 setup fee, $29.99/month for a 10-page site with free domain, business email, hosting & SSL. Code ownership after 12 months. No hidden fees.',
      imageAlt: 'ISHA Systems LLC pricing — $0 setup fee and $29.99 per month, everything included.',
    },
    portfolio: {
      title: 'Our Work — Small Business Websites Built by ISHA Systems LLC',
      description:
        'See affordable small business websites designed by ISHA Systems LLC for clients across the US & Canada. Every site delivered in under 7 days with free domain, business email, and hosting included.',
      imageAlt: 'Portfolio of small business websites designed and hosted by ISHA Systems LLC.',
    },
    contact: {
      title: 'Get Your Small Business Website — $0 to Start | ISHA Systems LLC',
      description:
        "Start your small business website for $0 — no upfront cost web development for the US & Canada. Free domain, business email, and hosting included for $29.99/month. Tell us about your business and we'll reply within 24 hours.",
      imageAlt: 'Contact ISHA Systems LLC to start a $0 small business website subscription.',
    },
    privacy: {
      title: 'Privacy Policy | ISHA Systems LLC',
      description: 'How ISHA Systems LLC collects, uses, and protects your information.',
      imageAlt: 'ISHA Systems LLC privacy policy.',
    },
    terms: {
      title: 'Terms of Service | ISHA Systems LLC',
      description:
        'The terms governing use of ISHA Systems LLC web development, hosting, and email services.',
      imageAlt: 'ISHA Systems LLC terms of service.',
    },
    unsubscribe: {
      title: 'Unsubscribe | ISHA Systems LLC',
      description: 'Unsubscribe from marketing emails from ISHA Systems LLC.',
      imageAlt: 'ISHA Systems LLC unsubscribe page.',
    },
  },
  es: {
    home: {
      title:
        'Diseño Web Asequible para Pequeñas Empresas (EE. UU. y Canadá) | $0 para Empezar, $29.99/mes | ISHA Systems LLC',
      description:
        'Suscripción de sitio web administrado para pequeñas empresas en EE. UU. y Canadá. Desarrollo web sin costo inicial — dominio, correo empresarial, hosting y SSL gratis. En línea en 7 días, solo $29.99/mes, con propiedad total del código después de 12 meses.',
      imageAlt:
        'ISHA Systems LLC — suscripción de sitio web administrado y asequible para pequeñas empresas, $0 de configuración y $29.99/mes.',
    },
    pricing: {
      title:
        'Precios de Sitios Web — $0 de Configuración, $29.99/mes, Todo Incluido | ISHA Systems LLC',
      description:
        'Precios transparentes de suscripción de sitio web administrado para pequeñas empresas de EE. UU. y Canadá: $0 de configuración, $29.99/mes por un sitio de 10 páginas con dominio, correo empresarial, hosting y SSL gratis. Propiedad del código tras 12 meses. Sin costos ocultos.',
      imageAlt: 'Precios de ISHA Systems LLC — $0 de configuración y $29.99 al mes, todo incluido.',
    },
    portfolio: {
      title: 'Nuestro Trabajo — Sitios Web para Pequeñas Empresas por ISHA Systems LLC',
      description:
        'Vea sitios web asequibles para pequeñas empresas diseñados por ISHA Systems LLC para clientes en EE. UU. y Canadá. Cada sitio se entrega en menos de 7 días con dominio, correo empresarial y hosting incluidos.',
      imageAlt: 'Portafolio de sitios web para pequeñas empresas diseñados y alojados por ISHA Systems LLC.',
    },
    contact: {
      title: 'Obtenga el Sitio Web de su Pequeña Empresa — $0 para Empezar | ISHA Systems LLC',
      description:
        'Comience el sitio web de su pequeña empresa por $0 — desarrollo web sin costo inicial para EE. UU. y Canadá. Dominio, correo empresarial y hosting incluidos por $29.99/mes. Cuéntenos sobre su negocio y le responderemos en 24 horas.',
      imageAlt: 'Contacte a ISHA Systems LLC para comenzar una suscripción de sitio web por $0.',
    },
    privacy: {
      title: 'Política de Privacidad | ISHA Systems LLC',
      description: 'Cómo ISHA Systems LLC recopila, usa y protege su información.',
      imageAlt: 'Política de privacidad de ISHA Systems LLC.',
    },
    terms: {
      title: 'Términos del Servicio | ISHA Systems LLC',
      description:
        'Los términos que rigen el uso de los servicios de desarrollo web, hosting y correo de ISHA Systems LLC.',
      imageAlt: 'Términos del servicio de ISHA Systems LLC.',
    },
    unsubscribe: {
      title: 'Cancelar Suscripción | ISHA Systems LLC',
      description: 'Cancelar la suscripción a correos de marketing de ISHA Systems LLC.',
      imageAlt: 'Página de cancelación de suscripción de ISHA Systems LLC.',
    },
  },
};

/** Maps our app language to a BCP-47 / Open Graph locale. */
const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_US' };

/**
 * Creates or updates a single <meta>/<link> element identified by `selector`.
 * Keeps the head free of duplicates by reusing any existing matching node.
 */
function setHeadTag(selector: string, attr: 'content' | 'href', value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    if (selector.startsWith('meta[name=')) {
      el.setAttribute('name', selector.slice(11, -2));
    } else if (selector.startsWith('meta[property=')) {
      el.setAttribute('property', selector.slice(15, -2));
    } else if (selector.startsWith('link[rel=')) {
      el.setAttribute('rel', selector.slice(10, -2));
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Replaces (or creates) a hreflang alternate <link>. We key it by hreflang so
 * each language/x-default gets exactly one entry.
 */
function setAlternate(hreflang: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Builds the ProfessionalService JSON-LD graph for the active language.
 * Explicitly encodes pricing ($0 setup + $29.99/mo), area served (US + CA),
 * and the subscription offer so answer engines can quote accurate facts.
 */
function buildJsonLd(lang: Lang) {
  const isEs = lang === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Isha Systems LLC',
    legalName: 'Isha Systems LLC',
    url: SITE_ORIGIN,
    image: OG_IMAGE,
    logo: `${SITE_ORIGIN}/favicon.svg`,
    email: 'hello@ishasystems.com',
    description: isEs
      ? 'Suscripción de sitio web totalmente administrado para pequeñas empresas con $0 de configuración y propiedad del código después de 12 meses.'
      : 'Fully-managed website subscription for small businesses with $0 setup fee and code ownership after 12 months.',
    priceRange: '$$',
    inLanguage: ['en', 'es'],
    knowsLanguage: ['en', 'es'],
    address: { '@type': 'PostalAddress', addressCountry: 'US' },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
    ],
    serviceType: 'Website design, hosting, and managed subscription',
    sameAs: [
      'https://www.facebook.com/ishasystems',
      'https://www.linkedin.com/company/ishasystems',
    ],
    offers: {
      '@type': 'Offer',
      name: isEs ? 'Suscripción de Sitio Web' : 'Managed Website Subscription',
      description: isEs
        ? 'Sitio web de 10 páginas con dominio, correo empresarial, hosting y SSL gratis. $0 de configuración. Propiedad del código después de 12 meses.'
        : '10-page website with free domain, business email, hosting, and SSL. $0 setup fee. Code ownership after 12 months.',
      price: '29.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      eligibleRegion: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Canada' },
      ],
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          name: isEs ? 'Cuota de configuración' : 'Setup fee',
          price: '0',
          priceCurrency: 'USD',
        },
        {
          '@type': 'UnitPriceSpecification',
          name: isEs ? 'Suscripción mensual' : 'Monthly subscription',
          price: '29.99',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
          billingIncrement: '1',
        },
      ],
    },
  };
}

/** Injects/replaces the dynamic ProfessionalService JSON-LD for the language. */
function injectJsonLd(lang: Lang) {
  const id = 'seo-jsonld-professional-service';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(buildJsonLd(lang));
}

/**
 * Applies all SEO metadata for the given tab + language. Call this whenever the
 * active tab or language changes.
 */
export function applySeo(tab: string, lang: Lang) {
  const pages = SEO_BY_LANG[lang] || SEO_BY_LANG.en;
  const seo = pages[tab] || pages.home;
  const path = TAB_PATHS[tab] ?? '/';
  const url = `${SITE_ORIGIN}${path}`;

  // Reflect the active language on the document for crawlers + a11y.
  document.documentElement.lang = lang;

  // Core tags
  document.title = seo.title;
  setHeadTag('meta[name="description"]', 'content', seo.description);
  setHeadTag('link[rel="canonical"]', 'href', url);

  // Open Graph
  setHeadTag('meta[property="og:type"]', 'content', 'website');
  setHeadTag('meta[property="og:site_name"]', 'content', 'ISHA Systems LLC');
  setHeadTag('meta[property="og:title"]', 'content', seo.title);
  setHeadTag('meta[property="og:description"]', 'content', seo.description);
  setHeadTag('meta[property="og:url"]', 'content', url);
  setHeadTag('meta[property="og:image"]', 'content', OG_IMAGE);
  setHeadTag('meta[property="og:image:alt"]', 'content', seo.imageAlt);
  setHeadTag('meta[property="og:locale"]', 'content', OG_LOCALE[lang]);
  setHeadTag(
    'meta[property="og:locale:alternate"]',
    'content',
    OG_LOCALE[lang === 'en' ? 'es' : 'en'],
  );

  // Twitter Card
  setHeadTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setHeadTag('meta[name="twitter:title"]', 'content', seo.title);
  setHeadTag('meta[name="twitter:description"]', 'content', seo.description);
  setHeadTag('meta[name="twitter:image"]', 'content', OG_IMAGE);
  setHeadTag('meta[name="twitter:image:alt"]', 'content', seo.imageAlt);

  // hreflang alternates — same path served in both languages, plus x-default.
  setAlternate('en', url);
  setAlternate('es', url);
  setAlternate('x-default', url);

  // Structured data
  injectJsonLd(lang);
}
