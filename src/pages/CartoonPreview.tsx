import { useEffect } from 'react';
import { NI_CSS } from './cartoon-styles';
import { GalleryPage, HomePage, OfferPage } from './cartoon-pages';

/**
 * Near Insanity — standalone concept preview for Bob Johnson's digital
 * cartoon storefront (prospective client mockup).
 *
 * Multi-page demo rooted at /cartoon-preview (the finished storefront would
 * live entirely on nearinsanity.com):
 *   /cartoon-preview            — homepage
 *   /cartoon-preview/gallery    — shared cartoon gallery
 *   /cartoon-preview/packs/10   — 10-cartoon pack
 *   /cartoon-preview/packs/20   — 20-cartoon pack
 *   /cartoon-preview/packs/30   — 30-cartoon pack
 *   /cartoon-preview/packs/50   — 50-cartoon pack
 *   /cartoon-preview/membership — membership offer
 *
 * Deliberately self-contained: the demo renders outside the ISHA Systems
 * chrome (no header/footer/nav/theme) with its own layout, typography, colors,
 * and fonts. All CSS lives in the scoped <style> tag below and every selector
 * is prefixed with `.ni-root`; the Google Fonts <link> is injected on mount
 * and removed on unmount — so other pages are never affected.
 *
 * Frontend-only demo: no checkout, Stripe, accounts, uploads, signup,
 * referral tracking, or downloadable image generation. Noindex is applied via
 * seo.ts (applyNearInsanityPreviewSeo).
 */

/** Working brand name for the prototype. */
const BRAND = 'Near Insanity';

/** Custom logo: winged toaster + stacked comic wordmark. */
function NiLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 130"
      className={className}
      role="img"
      aria-label="Near Insanity"
    >
      {/* Winged toaster, three-quarter view (mirrors the route favicon) */}
      <g transform="translate(2 26)">
        <path
          d="M12 34 C 3 30, 0 20, 6 10 C 10 14, 12 23, 14 30 Z"
          fill="#F6EFDF"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M54 30 C 60 27, 63 20, 60 13 C 57 17, 55 23, 54 27 Z"
          fill="#F6EFDF"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* burnt-orange toast popping from the slot */}
        <rect
          x="27"
          y="6"
          width="15"
          height="16"
          rx="3"
          transform="rotate(5 34.5 14)"
          fill="#E4572E"
          stroke="#26201A"
          strokeWidth="3.5"
        />
        {/* top face */}
        <path
          d="M14 32 L 26 22 H 58 L 48 32 Z"
          fill="#F6EFDF"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* toast slot on the top face */}
        <path d="M23 29 L 53 23" stroke="#26201A" strokeWidth="3.5" strokeLinecap="round" />
        {/* front face */}
        <path
          d="M14 32 H 48 V 56 Q 48 62 42 62 H 20 Q 14 62 14 56 Z"
          fill="#F6EFDF"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* right face */}
        <path
          d="M48 32 L 58 22 V 52 L 48 62 Z"
          fill="#F6EFDF"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* side lever + knob */}
        <path d="M55 30 V 46" stroke="#26201A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="55" cy="38" r="2.6" fill="#26201A" />
        {/* feet */}
        <path d="M20 62 v 3 M42 62 v 3" stroke="#26201A" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* stacked comic wordmark: NEAR tilted, INSANITY level, left-aligned */}
      <text
        x="86"
        y="56"
        transform="rotate(-4 130 56)"
        textAnchor="start"
        className="ni-logo__near"
      >
        NEAR
      </text>
      <text x="86" y="100" textAnchor="start" className="ni-logo__insanity">
        INSANITY
      </text>
    </svg>
  );
}

/** Smooth-scroll to a section id, respecting reduced motion. */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

/** Shared sticky header: logo home link + page-flow nav + live-preview CTA. */
function Header({ route }: { route: string }) {
  // Section links live on the homepage; from any other page, navigate home
  // first (with a ?scroll= target) and then glide to the section.
  const goToSection = (id: string) => {
    if (route === 'cartoon-preview') {
      scrollToSection(id);
    } else {
      window.location.assign(`/cartoon-preview?scroll=${id}`);
    }
  };

  return (
    <header className="ni-header">
      <div className="ni-header__inner">
        <a className="ni-wordmark" href="/cartoon-preview" aria-label={`${BRAND} — homepage`}>
          <NiLogo className="ni-logo" />
        </a>
        <nav className="ni-nav" aria-label="Page">
          <button type="button" onClick={() => goToSection('how-it-works')}>
            How It Works
          </button>
          <button type="button" onClick={() => goToSection('ni-personalize')}>
            Live Preview
          </button>
          <button type="button" onClick={() => goToSection('ni-compare')}>
            Packs
          </button>
          <button
            type="button"
            className="ni-nav-cta"
            onClick={() => goToSection('ni-personalize')}
          >
            Try Live Preview
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="ni-footer">
      <div className="ni-footer__inner">
        <span className="ni-footer__brand">
          Near <em>Insanity</em>
        </span>
        <span className="ni-footer__meta">
          © 2026 Bob Johnson · Near Insanity Digital Cartoons
        </span>
      </div>
    </footer>
  );
}

/** Route dispatch for the seven demo pages. */
function renderPage(route: string) {
  if (route === 'cartoon-preview/gallery') return <GalleryPage />;
  if (
    route === 'cartoon-preview/membership' ||
    route.startsWith('cartoon-preview/packs/')
  ) {
    return <OfferPage route={route} />;
  }
  return <HomePage />;
}

export function CartoonPreview({ route }: { route: string }) {
  // Scoped typography: load the preview fonts only while this route is shown.
  useEffect(() => {
    const id = 'ni-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Bangers&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,600;1,9..144,700&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
      document.head.appendChild(link);
    }
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  // Match the paper tone on <body> so mobile overscroll doesn't flash white.
  useEffect(() => {
    const prevBackground = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#F6EFDF';
    return () => {
      document.body.style.backgroundColor = prevBackground;
    };
  }, []);

  // Support ?scroll=section targets (used by the header nav when arriving at
  // the homepage from another demo page) — glide to the section once the
  // layout and fonts have settled.
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get('scroll');
    if (!target) return;
    const t = window.setTimeout(() => scrollToSection(target), 150);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="ni-root">
      <style>{NI_CSS}</style>
      <Header route={route} />
      <main>{renderPage(route)}</main>
      <Footer />
    </div>
  );
}