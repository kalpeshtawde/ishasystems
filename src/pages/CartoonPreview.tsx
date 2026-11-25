import { useEffect, useRef, useState } from 'react';

/**
 * Near Insanity — standalone concept preview for Bob Johnson's digital
 * cartoon storefront (prospective client mockup).
 *
 * Deliberately self-contained: this route renders outside the ISHA Systems
 * chrome (no header/footer/nav/theme) with its own layout, typography, colors,
 * and fonts. All CSS lives in the scoped <style> tag below and every selector
 * is prefixed with `.ni-root`, and the Google Fonts <link> is injected on
 * mount and removed on unmount — so other pages are never affected.
 *
 * Frontend-only demo: no checkout, Stripe, accounts, uploads, or orders.
 * Noindex is applied via seo.ts (applyCartoonPreviewSeo).
 */

/** Working brand name for the prototype. */
const BRAND = 'Near Insanity';

/** Where Bob's cartoon images live (public assets, served at this path). */
const ART_BASE = '/near-insanity-preview/art';

/** Image formats probed in order, so Bob can drop jpg, png, or webp files. */
const EXTS = ['jpg', 'png', 'webp'] as const;
type Ext = (typeof EXTS)[number];
type Resolution = Ext | 'missing';

interface Cartoon {
  id: string;
  title: string;
  tag: string;
  base: string; // path without extension — the loader probes jpg → png → webp
  alt: string;
}

// The three supplied cartoons. The "Too Much to Dream" bedroom cartoon leads
// the hero and the gallery; the two rock-and-roll cartoons sit alongside it.
// Add more entries to this array to grow the gallery for Bob's full catalog.
const CARTOONS: Cartoon[] = [
  {
    id: 'too-much-to-dream',
    title: '“Too Much to Dream”',
    tag: 'Strange everyday moments',
    base: `${ART_BASE}/cartoon-too-much-to-dream`,
    alt: 'Bob Johnson cartoon, “Too Much to Dream”: a bedroom scene where an ordinary night of sleep turns into an absurd, overflowing dream.',
  },
  {
    id: 'rock-1',
    title: 'Rock ’n’ Roll Chaos #1',
    tag: 'Rock-and-roll chaos',
    base: `${ART_BASE}/cartoon-rock-1`,
    alt: 'Bob Johnson rock-and-roll cartoon #1: onstage pandemonium — amps, noise, and energy running wild.',
  },
  {
    id: 'rock-2',
    title: 'Rock ’n’ Roll Chaos #2',
    tag: 'Rock-and-roll chaos',
    base: `${ART_BASE}/cartoon-rock-2`,
    alt: 'Bob Johnson rock-and-roll cartoon #2: a second scene of stage-side chaos and loud, absurd rock-and-roll.',
  },
];

/** Four pack sizes; 10 is emphasized as the proposed starting option. */
const PACKS = [
  {
    size: 10,
    featured: true,
    desc: 'A starter set of Bob’s best cartoons — the proposed first pack.',
  },
  {
    size: 20,
    featured: false,
    desc: 'A deeper run through the favourites.',
  },
  {
    size: 30,
    featured: false,
    desc: 'A solid wall of absurdity.',
  },
  {
    size: 50,
    featured: false,
    desc: 'The near-complete collection.',
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Resolved src for a cartoon given the current probe state. */
function srcFor(cartoon: Cartoon, resolved: Record<string, Resolution>) {
  const r = resolved[cartoon.id];
  if (!r || r === 'missing') return `${cartoon.base}.jpg`;
  return `${cartoon.base}.${r}`;
}

function isMissing(cartoon: Cartoon, resolved: Record<string, Resolution>) {
  return resolved[cartoon.id] === 'missing';
}

/** Advance the probe state for a failed image load (jpg → png → webp). */
function advanceResolution(
  prev: Record<string, Resolution>,
  id: string,
): Record<string, Resolution> {
  const cur = prev[id];
  // No entry yet means the default .jpg probe is what just failed — advance
  // straight to the next candidate so the src actually changes.
  if (!cur) return { ...prev, [id]: EXTS[1] };
  const idx = cur === 'missing' ? -1 : EXTS.indexOf(cur);
  if (idx === -1 || idx >= EXTS.length - 1) {
    return { ...prev, [id]: 'missing' };
  }
  return { ...prev, [id]: EXTS[idx + 1] };
}

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

function smoothScrollTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}

/** Keep Tab inside a modal dialog. */
function trapFocus(e: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return;
  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled'));
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/* ------------------------------------------------------------------ */
/* Artwork + cards                                                     */
/* ------------------------------------------------------------------ */

/** Rendered when Bob's artwork file has not been dropped in yet. */
function ArtworkPlaceholder({ cartoon }: { cartoon: Cartoon }) {
  return (
    <span className="ni-placeholder">
      <svg
        className="ni-placeholder__scribble"
        viewBox="0 0 80 60"
        width="80"
        height="60"
        aria-hidden="true"
      >
        <path
          d="M10 44 C 22 18, 34 18, 40 32 S 58 46, 68 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M64 44 q -3 -6 3 -8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="ni-placeholder__title">{cartoon.title}</span>
      <span className="ni-placeholder__hint">
        Artwork pending — save the file at{' '}
        <code>{`${cartoon.base}.jpg`}</code>
      </span>
    </span>
  );
}

function CartoonCard({
  cartoon,
  resolved,
  onError,
  onOpen,
  className = '',
  showTag = true,
}: {
  cartoon: Cartoon;
  resolved: Record<string, Resolution>;
  onError: () => void;
  onOpen: () => void;
  className?: string;
  showTag?: boolean;
}) {
  return (
    <button type="button" className={`ni-card ${className}`} onClick={onOpen}>
      <span className="ni-card__frame">
        {isMissing(cartoon, resolved) ? (
          <ArtworkPlaceholder cartoon={cartoon} />
        ) : (
          <img
            src={srcFor(cartoon, resolved)}
            alt={cartoon.alt}
            loading="lazy"
            onError={onError}
          />
        )}
      </span>
      <span className="ni-card__caption">
        <span className="ni-card__title">{cartoon.title}</span>
        {showTag && <span className="ni-card__tag">{cartoon.tag}</span>}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Modal: cartoon lightbox                                             */
/* ------------------------------------------------------------------ */

function Lightbox({
  cartoons,
  index,
  resolved,
  onError,
  onClose,
  onPrev,
  onNext,
}: {
  cartoons: Cartoon[];
  index: number;
  resolved: Record<string, Resolution>;
  onError: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cartoon = cartoons[index];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'Tab') {
        trapFocus(e, dialogRef.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onPrev, onNext]);

  return (
    <div className="ni-overlay" onClick={onClose}>
      <div
        className="ni-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`Cartoon preview: ${cartoon.title}`}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="ni-iconbtn ni-iconbtn--close"
          onClick={onClose}
          aria-label="Close cartoon preview"
        >
          ✕
        </button>
        <button
          type="button"
          className="ni-navbtn ni-navbtn--prev"
          onClick={onPrev}
          aria-label="Previous cartoon"
        >
          ←
        </button>
        <figure className="ni-lightbox__figure">
          {isMissing(cartoon, resolved) ? (
            <ArtworkPlaceholder cartoon={cartoon} />
          ) : (
            <img
              src={srcFor(cartoon, resolved)}
              alt={cartoon.alt}
              onError={onError}
            />
          )}
          <figcaption className="ni-lightbox__caption">
            <span className="ni-lightbox__title">{cartoon.title}</span>
            <span className="ni-lightbox__tag">{cartoon.tag}</span>
            <span className="ni-lightbox__credit">Bob Johnson · digital cartoon</span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="ni-navbtn ni-navbtn--next"
          onClick={onNext}
          aria-label="Next cartoon"
        >
          →
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal: pack preview panel                                           */
/* ------------------------------------------------------------------ */

function PackPanel({
  size,
  onClose,
}: {
  size: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shownSlots = Math.min(size, 12);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        trapFocus(e, dialogRef.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="ni-overlay" onClick={onClose}>
      <div
        className="ni-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${size}-cartoon pack preview`}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="ni-iconbtn ni-iconbtn--close"
          onClick={onClose}
          aria-label="Close pack preview"
        >
          ✕
        </button>
        <span className="ni-kicker">Pack preview</span>
        <h3 className="ni-panel__title">
          {size}-Cartoon Pack
        </h3>
        <p className="ni-panel__copy">
          You opened a preview of the {size}-cartoon pack. Pack contents and
          selection rules are still open — whether packs are curated by Bob or
          buyers choose their own cartoons is to be confirmed, and pricing
          lands once Bob locks it in.
        </p>
        <div className="ni-slots" aria-hidden="true">
          {Array.from({ length: shownSlots }, (_, i) => (
            <span className="ni-slot" key={i}>
              {i + 1}
            </span>
          ))}
        </div>
        {size > shownSlots && (
          <p className="ni-slots__more">+ {size - shownSlots} more cartoon slots</p>
        )}
        <p className="ni-slots__note">
          Slots shown as placeholders — contents to be confirmed.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

function SectionHeading({
  kicker,
  title,
  blurb,
}: {
  kicker: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="ni-section-head">
      <span className="ni-kicker">{kicker}</span>
      <h2 className="ni-section-head__title">{title}</h2>
      {blurb && <p className="ni-section-head__blurb">{blurb}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                               */
/* ------------------------------------------------------------------ */

/**
 * Near Insanity logo: a bold, compact, stacked comic wordmark — "NEAR" tilted
 * above a level "INSANITY", left-aligned with tight spacing — paired with a
 * winged toaster in three-quarter view (thick dark-ink outline, toast slot,
 * side lever, one burnt-orange toast). No face, sparkles, or motion marks.
 */
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
        {/* left wing */}
        <path
          d="M12 34 C 3 30, 0 20, 6 10 C 10 14, 12 23, 14 30 Z"
          fill="#F6EFDF"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* right wing */}
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
        <path
          d="M23 29 L 53 23"
          stroke="#26201A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
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

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

export function CartoonPreview() {
  const [resolved, setResolved] = useState<Record<string, Resolution>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [packPreview, setPackPreview] = useState<number | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('nearinsanity.com');
  const personalizeFrameRef = useRef<HTMLDivElement>(null);
  const plaqueTextRef = useRef<HTMLSpanElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const handleImgError = (cartoon: Cartoon) => {
    setResolved((prev) => advanceResolution(prev, cartoon.id));
  };

  const openLightbox = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    lastFocused.current?.focus();
  };
  const nextCartoon = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % CARTOONS.length));
  const prevCartoon = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + CARTOONS.length) % CARTOONS.length,
    );

  const openPackPreview = (size: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setPackPreview(size);
  };
  const closePackPreview = () => {
    setPackPreview(null);
    lastFocused.current?.focus();
  };

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

  // Lock background scroll while a modal is open.
  useEffect(() => {
    if (lightboxIndex === null && packPreview === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, packPreview]);

  // Keep the personalized address legible on the plaque: size the overlay
  // text to fill the lettering band, shrinking when the address is long so
  // it always fits the plaque (single line, like engraved lettering).
  useEffect(() => {
    const fit = () => {
      const frame = personalizeFrameRef.current;
      const text = plaqueTextRef.current;
      if (!frame || !text) return;
      const box = text.parentElement as HTMLElement | null;
      if (!box) return;
      const boxW = box.clientWidth;
      const boxH = box.clientHeight;
      if (!boxW || !boxH) return;
      let fs = boxH * 0.82;
      text.style.fontSize = `${fs}px`;
      while (text.scrollWidth > boxW && fs > boxH * 0.28) {
        fs *= 0.96;
        text.style.fontSize = `${fs}px`;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (personalizeFrameRef.current) ro.observe(personalizeFrameRef.current);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [websiteUrl]);

  return (
    <div className="ni-root">
      <style>{NI_CSS}</style>

      <header className="ni-header">
        <div className="ni-header__inner">
          <button
            type="button"
            className="ni-wordmark"
            onClick={smoothScrollTop}
            aria-label={`${BRAND} — back to top`}
          >
            <NiLogo className="ni-logo" />
          </button>
          <nav className="ni-nav" aria-label="Sections">
            <button type="button" onClick={() => smoothScrollTo('ni-cartoons')}>
              Cartoons
            </button>
            <button type="button" onClick={() => smoothScrollTo('ni-packs')}>
              Packs
            </button>
            <button
              type="button"
              onClick={() => smoothScrollTo('ni-membership')}
            >
              Membership
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="ni-hero">
          <div className="ni-hero__copy">
            <span className="ni-kicker">Digital cartoons · working title</span>
            <h1 className="ni-hero__title">
              Cartoons for an <em>absurd</em> world.
            </h1>
            <p className="ni-hero__lead">
              Explore Bob Johnson&rsquo;s digital cartoons, from strange
              everyday moments to rock-and-roll chaos.
            </p>
            <div className="ni-hero__actions">
              <button
                type="button"
                className="ni-btn ni-btn--primary"
                onClick={() => smoothScrollTo('ni-cartoons')}
              >
                Browse Cartoons <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          <div className="ni-hero__art-col">
            <CartoonCard
              cartoon={CARTOONS[0]}
              resolved={resolved}
              onError={() => handleImgError(CARTOONS[0])}
              onOpen={() => openLightbox(0)}
              className="ni-hero__art"
              showTag
            />
          </div>
        </section>

        {/* ---------- Cartoon gallery ---------- */}
        <section className="ni-section ni-section--gallery" id="ni-cartoons">
          <SectionHeading
            kicker="01 · The cartoons"
            title="The Cartoons."
            blurb="Full frames, captions intact — tap any cartoon for a closer look."
          />
          <div className="ni-gallery">
            {CARTOONS.map((cartoon, i) => (
              <CartoonCard
                key={cartoon.id}
                cartoon={cartoon}
                resolved={resolved}
                onError={() => handleImgError(cartoon)}
                onOpen={() => openLightbox(i)}
                className={i === 0 ? 'ni-featured' : 'ni-side'}
              />
            ))}
          </div>
        </section>

        {/* ---------- Cartoon packs ---------- */}
        <section className="ni-section ni-section--packs" id="ni-packs">
          <SectionHeading
            kicker="02 · Packs"
            title="Cartoon Packs."
            blurb="Pick a pack size for your wall. The 10-cartoon pack is the proposed starting option; pricing to be confirmed."
          />
          <div className="ni-packs-grid">
            {PACKS.map((pack) => (
              <div
                key={pack.size}
                className={`ni-pack-card${pack.featured ? ' ni-pack-card--featured' : ''}`}
              >
                {pack.featured && (
                  <span className="ni-pack-card__badge">
                    Proposed starting pack
                  </span>
                )}
                <span className="ni-pack-card__size">{pack.size}</span>
                <span className="ni-pack-card__unit">Cartoons</span>
                <p className="ni-pack-card__desc">{pack.desc}</p>
                <span className="ni-pack-card__price">Price — to be confirmed</span>
                <button
                  type="button"
                  className="ni-btn ni-btn--outline ni-pack-card__action"
                  onClick={() => openPackPreview(pack.size)}
                >
                  Preview pack
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Personalize ---------- */}
        <section className="ni-section ni-section--personalize" id="ni-personalize">
          <SectionHeading
            kicker="03 · Personalize"
            title="Personalize with your website."
            blurb="Picture your own address engraved on the plaque. Type below and watch it appear on the artwork — this preview never saves, links, or exports anything."
          />
          <div className="ni-personalize">
            <div className="ni-personalize__field">
              <label className="ni-personalize__label" htmlFor="ni-website-url">
                Your website address.
              </label>
              <input
                id="ni-website-url"
                className="ni-personalize__input"
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="yourwebsite.com"
                maxLength={80}
                autoComplete="off"
                spellCheck={false}
              />
              <p className="ni-personalize__hint">
                The plaque updates as you type. Local demo only.
              </p>
            </div>
            <div className="ni-personalize__frame" ref={personalizeFrameRef}>
              <div className="ni-personalize__imgwrap">
                <img
                  src={`${ART_BASE}/thanksgiving-frame.png`}
                  alt="Bob Johnson’s framed Thanksgiving cartoon with a wooden plaque at the bottom"
                  className="ni-personalize__img"
                />
                <div className="ni-personalize__plaque" aria-hidden="true">
                  <span className="ni-personalize__plaque-text" ref={plaqueTextRef}>
                    {websiteUrl.trim() || 'yourwebsite.com'}
                  </span>
                </div>
              </div>
              <p className="ni-personalize__caption">
                Framed Thanksgiving cartoon — plaque preview with your address.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Membership ---------- */}
        <section
          className="ni-section ni-section--membership"
          id="ni-membership"
        >
          <SectionHeading
            kicker="04 · Membership"
            title="Membership."
            blurb="Where the membership offer will live."
          />
          <div className="ni-membership-card">
            <span className="ni-membership-card__pill">Coming soon</span>
            <h3 className="ni-membership-card__title">
              Membership details coming soon
            </h3>
            <p className="ni-membership-card__copy">
              Benefits, billing frequency, and sign-up land in a later phase.
            </p>
          </div>
        </section>
      </main>

      <footer className="ni-footer">
        <div className="ni-footer__inner">
          <span className="ni-footer__brand">
            Near <em>Insanity</em>
          </span>
          <span className="ni-footer__meta">
            © 2026 Bob Johnson · working title · digital cartoons
          </span>
          <span className="ni-footer__concept">Concept preview</span>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <Lightbox
          cartoons={CARTOONS}
          index={lightboxIndex}
          resolved={resolved}
          onError={() => handleImgError(CARTOONS[lightboxIndex])}
          onClose={closeLightbox}
          onPrev={prevCartoon}
          onNext={nextCartoon}
        />
      )}
      {packPreview !== null && (
        <PackPanel size={packPreview} onClose={closePackPreview} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scoped styles — every selector lives under .ni-root so the ISHA      */
/* pages are never affected. Removed from the DOM when route unmounts.  */
/* ------------------------------------------------------------------ */

const NI_CSS = `
.ni-root {
  --ni-paper: #F6EFDF;
  --ni-paper-light: #FCF7EA;
  --ni-paper-deep: #EEE1C4;
  --ni-ink: #26201A;
  --ni-ink-soft: #5B5144;
  --ni-line: rgba(38, 32, 26, 0.16);
  --ni-red: #E4572E;
  --ni-yellow: #F5B301;
  --ni-blue: #2E6DA4;
  --ni-shadow: 6px 6px 0 rgba(38, 32, 26, 0.14);
  --ni-font-display: 'Fraunces', Georgia, serif;
  --ni-font-body: 'Public Sans', system-ui, -apple-system, sans-serif;

  min-height: 100vh;
  background-color: var(--ni-paper);
  background-image: radial-gradient(rgba(38, 32, 26, 0.05) 1px, transparent 1.4px);
  background-size: 22px 22px;
  color: var(--ni-ink);
  font-family: var(--ni-font-body);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.ni-root ::selection {
  background: var(--ni-yellow);
  color: var(--ni-ink);
}

.ni-root :focus-visible {
  outline: 3px solid var(--ni-blue);
  outline-offset: 2px;
}

.ni-root button {
  font-family: inherit;
  cursor: pointer;
}

.ni-root code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.82em;
  background: var(--ni-paper-deep);
  border-radius: 4px;
  padding: 1px 5px;
}

/* ---------------- Header ---------------- */

.ni-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(246, 239, 223, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid var(--ni-ink);
}

.ni-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.ni-wordmark {
  display: inline-flex;
  align-items: center;
  background: none;
  border: 0;
  padding: 0;
  color: var(--ni-ink);
  line-height: 1;
}

/* Custom logo: winged toaster + stacked hand-lettered wordmark. */
.ni-logo {
  display: block;
  height: 54px;
  width: auto;
}

@media (max-width: 640px) {
  .ni-logo {
    height: 46px;
  }
}

.ni-logo__near,
.ni-logo__insanity {
  font-family: 'Bangers', 'Comic Sans MS', 'Segoe Print', cursive;
  fill: var(--ni-ink);
}

.ni-logo__near {
  font-size: 44px;
  letter-spacing: 0.02em;
}

.ni-logo__insanity {
  font-size: 36px;
  letter-spacing: 0.02em;
}

.ni-nav {
  display: flex;
  gap: 6px;
}

.ni-nav button {
  background: none;
  border: 0;
  padding: 8px 14px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ni-ink);
  border-radius: 999px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.ni-nav button:hover {
  background: var(--ni-yellow);
}

/* ---------------- Shared bits ---------------- */

.ni-kicker {
  display: inline-block;
  background: var(--ni-yellow);
  color: var(--ni-ink);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  transform: rotate(-1deg);
}

.ni-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  font-size: 1.02rem;
  font-weight: 700;
  padding: 14px 26px;
  border: 2px solid var(--ni-ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.ni-btn--primary {
  background: var(--ni-ink);
  color: var(--ni-paper-light);
  box-shadow: 5px 5px 0 rgba(38, 32, 26, 0.35);
}

.ni-btn--primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 rgba(38, 32, 26, 0.35);
}

.ni-btn--outline {
  background: transparent;
  color: var(--ni-ink);
}

.ni-btn--outline:hover {
  background: var(--ni-yellow);
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 rgba(38, 32, 26, 0.2);
}

/* ---------------- Hero ---------------- */

.ni-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(64px, 9vw, 128px) 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  align-items: center;
}

@media (min-width: 920px) {
  .ni-hero {
    grid-template-columns: 1.02fr 1fr;
    gap: 64px;
  }
}

.ni-hero__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(2.9rem, 7vw, 5.1rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  margin: 22px 0 18px;
}

.ni-hero__title em {
  font-style: italic;
  color: var(--ni-red);
}

.ni-hero__lead {
  font-size: 1.18rem;
  color: var(--ni-ink-soft);
  max-width: 46ch;
  margin: 0 0 30px;
}

.ni-hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.ni-hero__art-col {
  justify-self: center;
  width: 100%;
  max-width: 560px;
}

/* ---------------- Cartoon cards ---------------- */

.ni-card {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 6px;
  padding: 14px;
  box-shadow: var(--ni-shadow);
  color: var(--ni-ink);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.ni-card:hover {
  transform: translateY(-4px) rotate(0deg);
  box-shadow: 9px 9px 0 rgba(38, 32, 26, 0.18);
}

.ni-card__frame {
  display: block;
  background: #fff;
  border: 1.5px solid var(--ni-line);
  overflow: hidden;
}

.ni-card__frame img {
  display: block;
  width: 100%;
  height: auto;
  /* Full frame, captions and all — never cropped or overlaid. */
  object-fit: contain;
}

.ni-card__caption {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 4px 4px;
}

.ni-card__title {
  font-family: var(--ni-font-display);
  font-weight: 700;
  font-size: 1.12rem;
  line-height: 1.25;
}

.ni-card__tag {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ni-ink-soft);
}

/* Hero artwork: a tilted, framed piece. */
.ni-hero__art {
  transform: rotate(-1.5deg);
}

.ni-hero__art:hover {
  transform: rotate(0deg) translateY(-4px);
}

/* ---------------- Gallery ---------------- */

.ni-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(64px, 8vw, 110px) 24px;
  scroll-margin-top: 96px;
}

.ni-section--gallery {
  background: var(--ni-paper-light);
  border-top: 2px solid var(--ni-ink);
  border-bottom: 2px solid var(--ni-ink);
  max-width: none;
}

.ni-section--gallery > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.ni-section-head {
  margin-bottom: 44px;
}

.ni-section-head__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(2.1rem, 4.6vw, 3.1rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 16px 0 10px;
}

.ni-section-head__blurb {
  color: var(--ni-ink-soft);
  max-width: 58ch;
  margin: 0;
  font-size: 1.06rem;
}

.ni-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  align-items: start;
}

@media (min-width: 860px) {
  .ni-gallery {
    grid-template-columns: 2fr 1fr;
    gap: 32px;
  }
  .ni-featured {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
  .ni-side {
    grid-column: 2;
  }
  .ni-side:nth-child(2) {
    transform: rotate(0.6deg);
  }
  .ni-side:nth-child(3) {
    transform: rotate(-0.6deg);
  }
  .ni-side:hover {
    transform: rotate(0deg) translateY(-4px);
  }
}

/* Extra catalog entries (beyond the three demo cartoons) flow full-width. */
.ni-gallery .ni-card:nth-child(n + 4) {
  grid-column: 1 / -1;
}

/* ---------------- Placeholder (artwork not dropped in yet) ---------------- */

.ni-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 280px;
  padding: 28px 18px;
  text-align: center;
  color: var(--ni-ink-soft);
}

.ni-placeholder__scribble {
  color: var(--ni-red);
  opacity: 0.85;
}

.ni-placeholder__title {
  font-family: var(--ni-font-display);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--ni-ink);
}

.ni-placeholder__hint {
  font-size: 0.85rem;
  max-width: 40ch;
}

/* ---------------- Lightbox ---------------- */

.ni-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(38, 32, 26, 0.84);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.ni-lightbox {
  position: relative;
  width: 100%;
  max-width: 1000px;
  max-height: 92vh;
  overflow-y: auto;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 8px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.35);
}

.ni-lightbox__figure {
  margin: 0;
  padding: 20px 20px 0;
  text-align: center;
}

.ni-lightbox__figure img {
  display: block;
  max-width: 100%;
  max-height: 72vh;
  width: auto;
  height: auto;
  margin: 0 auto;
  background: #fff;
}

.ni-lightbox__caption {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 16px 8px 22px;
}

.ni-lightbox__title {
  font-family: var(--ni-font-display);
  font-weight: 700;
  font-size: 1.45rem;
  line-height: 1.2;
}

.ni-lightbox__tag {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ni-ink-soft);
}

.ni-lightbox__credit {
  font-size: 0.85rem;
  color: var(--ni-ink-soft);
  margin-top: 4px;
}

.ni-iconbtn {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid var(--ni-ink);
  font-size: 1.05rem;
  line-height: 1;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.ni-iconbtn:hover {
  background: var(--ni-yellow);
  transform: rotate(6deg);
}

.ni-iconbtn--close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  background: var(--ni-ink);
  color: var(--ni-paper-light);
}

.ni-navbtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid var(--ni-ink);
  background: var(--ni-paper-light);
  font-size: 1.15rem;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.ni-navbtn:hover {
  background: var(--ni-yellow);
}

.ni-navbtn--prev {
  left: 12px;
}

.ni-navbtn--next {
  right: 12px;
}

@media (max-width: 640px) {
  .ni-navbtn {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
  .ni-navbtn--prev {
    left: 6px;
  }
  .ni-navbtn--next {
    right: 6px;
  }
}

/* ---------------- Packs ---------------- */

.ni-section--packs {
  background: var(--ni-paper-deep);
  border-top: 2px solid var(--ni-ink);
  border-bottom: 2px solid var(--ni-ink);
  max-width: none;
}

.ni-section--packs > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.ni-packs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 24px;
}

.ni-pack-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 8px;
  padding: 30px 26px 26px;
  box-shadow: var(--ni-shadow);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.ni-pack-card:hover {
  transform: translateY(-4px);
  box-shadow: 9px 9px 0 rgba(38, 32, 26, 0.18);
}

.ni-pack-card--featured {
  background: #FBF3D6;
  border: 3px solid var(--ni-red);
}

.ni-pack-card__badge {
  position: absolute;
  top: -16px;
  right: 16px;
  background: var(--ni-red);
  color: var(--ni-paper-light);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  border: 2px solid var(--ni-ink);
  transform: rotate(2deg);
  box-shadow: 3px 3px 0 rgba(38, 32, 26, 0.3);
}

.ni-pack-card__size {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: 3.1rem;
  line-height: 1;
  margin-top: 6px;
}

.ni-pack-card__unit {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ni-ink-soft);
  margin-top: 6px;
}

.ni-pack-card__desc {
  margin: 16px 0 8px;
  color: var(--ni-ink-soft);
  font-size: 0.98rem;
}

.ni-pack-card__price {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ni-ink-soft);
  margin-bottom: 20px;
}

.ni-pack-card__action {
  margin-top: auto;
}

/* ---------------- Pack preview panel ---------------- */

.ni-panel {
  position: relative;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 8px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.35);
  padding: 34px 30px 28px;
}

.ni-panel__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -0.02em;
  margin: 14px 0 8px;
}

.ni-panel__copy {
  color: var(--ni-ink-soft);
  margin: 0 0 22px;
}

.ni-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.ni-slot {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border: 2px dashed var(--ni-ink-soft);
  border-radius: 6px;
  background: var(--ni-paper);
  font-family: var(--ni-font-display);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ni-ink-soft);
}

.ni-slots__more {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ni-red);
  margin: 0 0 8px;
}

.ni-slots__note {
  font-size: 0.84rem;
  color: var(--ni-ink-soft);
  margin: 0;
}

/* ---------------- Personalize ---------------- */

.ni-section--personalize {
  background: var(--ni-paper-light);
  border-top: 2px solid var(--ni-ink);
  border-bottom: 2px solid var(--ni-ink);
  max-width: none;
}

.ni-section--personalize > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.ni-personalize {
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;
  align-items: start;
}

@media (min-width: 920px) {
  .ni-personalize {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 56px;
  }
}

.ni-personalize__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ni-personalize__label {
  font-weight: 700;
  font-size: 1.02rem;
}

.ni-personalize__input {
  font-family: var(--ni-font-body);
  font-size: 1.18rem;
  font-weight: 600;
  color: var(--ni-ink);
  background: var(--ni-paper);
  border: 2px solid var(--ni-ink);
  border-radius: 12px;
  padding: 14px 18px;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.ni-personalize__input:focus-visible {
  outline: 3px solid var(--ni-blue);
  outline-offset: 2px;
  box-shadow: 4px 4px 0 rgba(38, 32, 26, 0.25);
}

.ni-personalize__hint {
  margin: 0;
  font-size: 0.9rem;
  color: var(--ni-ink-soft);
}

.ni-personalize__frame {
  border: 2px solid var(--ni-ink);
  border-radius: 6px;
  background: var(--ni-paper-light);
  padding: 12px;
  box-shadow: var(--ni-shadow);
  transform: rotate(1deg);
}

.ni-personalize__imgwrap {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1.5px solid var(--ni-line);
}

.ni-personalize__img {
  display: block;
  width: 100%;
  height: auto;
}

/* The plaque lettering band: centered over the engraved "nearinsanity.com"
   (measured on the cropped artwork). Background is the sampled plaque wood
   so the typed text cleanly replaces the original engraving. */
.ni-personalize__plaque {
  position: absolute;
  left: 42.5%;
  right: 27.5%;
  top: 91.6%;
  height: 3.6%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgb(100, 69, 51);
  border-radius: 2px;
}

.ni-personalize__plaque-text {
  display: inline-block;
  white-space: nowrap;
  font-family: var(--ni-font-display);
  font-weight: 600;
  letter-spacing: 0.015em;
  line-height: 1;
  color: #221309;
  /* Slight engraved effect */
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
}

.ni-personalize__caption {
  margin: 10px 2px 2px;
  font-size: 0.86rem;
  color: var(--ni-ink-soft);
}

/* ---------------- Membership ---------------- */

.ni-membership-card {
  position: relative;
  max-width: 680px;
  text-align: center;
  border: 2px dashed var(--ni-ink);
  border-radius: 12px;
  background: var(--ni-paper-light);
  padding: 56px 36px;
  margin: 0 auto;
}

.ni-membership-card__pill {
  display: inline-block;
  background: var(--ni-yellow);
  color: var(--ni-ink);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  border: 2px solid var(--ni-ink);
  transform: rotate(-2deg);
}

.ni-membership-card__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(1.6rem, 3.4vw, 2.1rem);
  letter-spacing: -0.02em;
  margin: 18px 0 10px;
}

.ni-membership-card__copy {
  color: var(--ni-ink-soft);
  margin: 0;
}

/* ---------------- Footer ---------------- */

.ni-footer {
  border-top: 2px solid var(--ni-ink);
  background: var(--ni-paper-light);
}

.ni-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 26px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.ni-footer__brand {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: 1.1rem;
}

.ni-footer__brand em {
  font-style: italic;
  color: var(--ni-red);
}

.ni-footer__meta {
  font-size: 0.86rem;
  color: var(--ni-ink-soft);
}

.ni-footer__concept {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ni-ink-soft);
  border: 1.5px solid var(--ni-ink-soft);
  border-radius: 999px;
  padding: 5px 12px;
}

/* ---------------- Reduced motion ---------------- */

@media (prefers-reduced-motion: reduce) {
  .ni-root .ni-card,
  .ni-root .ni-btn,
  .ni-root .ni-nav button,
  .ni-root .ni-iconbtn,
  .ni-root .ni-navbtn,
  .ni-root .ni-pack-card {
    transition: none;
  }
  .ni-root .ni-card:hover,
  .ni-root .ni-hero__art:hover {
    transform: none;
  }
}
`;