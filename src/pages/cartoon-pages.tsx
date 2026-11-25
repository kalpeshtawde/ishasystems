import { useEffect, useRef, useState } from 'react';
import {
  ART_BASE,
  CARTOONS,
  COLLAGE_ASSETS,
  OFFERS,
  PACK_PRICING,
  advanceResolution,
  isMissing,
  srcFor,
  type Cartoon,
  type Offer,
  type Resolution,
} from './cartoon-data';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

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
        Artwork pending — save the file at <code>{`${cartoon.base}.jpg`}</code>
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
/* Gallery page + lightbox                                             */
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
            <img src={srcFor(cartoon, resolved)} alt={cartoon.alt} onError={onError} />
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

export function GalleryPage() {
  const [resolved, setResolved] = useState<Record<string, Resolution>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  // Lock background scroll while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex]);

  return (
    <>
      <section className="ni-section ni-section--band ni-page-head">
        <SectionHeading
          kicker="The cartoons"
          title="The Gallery."
          blurb="The shared catalog — full frames, captions intact. Tap any cartoon for a closer look."
        />
        <div className="ni-gallery">
          {CARTOONS.map((cartoon, i) => (
            <CartoonCard
              key={cartoon.id}
              cartoon={cartoon}
              resolved={resolved}
              onError={() => handleImgError(cartoon)}
              onOpen={() => openLightbox(i)}
            />
          ))}
        </div>
        <p className="ni-gallery-note">
          Showing the current selection from Bob’s artwork — the layout grows
          to the full 50-cartoon catalog as more cartoons are delivered.
        </p>
      </section>

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
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Simplified offer section: tier switcher + clean 2-column card       */
/* ------------------------------------------------------------------ */

/** Fanned 3-card collage cycling the four uploaded cartoon assets. */
function CollageFan({ cycleStart, frontUrl }: { cycleStart: number; frontUrl: string }) {
  const [resolved, setResolved] = useState<Record<string, Resolution>>({});
  const collage = [0, 1, 2].map(
    (k) => COLLAGE_ASSETS[(cycleStart + k) % COLLAGE_ASSETS.length],
  );
  const handleImgError = (cartoon: Cartoon) => {
    setResolved((prev) => advanceResolution(prev, cartoon.id));
  };
  return (
    <div className="ni-collage" aria-hidden="true">
      {collage.map((cartoon, i) => (
        <a
          key={cartoon.id}
          className={`ni-mini ni-mini--${i + 1}${i === 1 ? ' ni-mini--front' : ''}`}
          href="/cartoon-preview/gallery"
          tabIndex={-1}
        >
          <span className="ni-mini__frame">
            {isMissing(cartoon, resolved) ? (
              <ArtworkPlaceholder cartoon={cartoon} />
            ) : (
              <img
                src={srcFor(cartoon, resolved)}
                alt=""
                onError={() => handleImgError(cartoon)}
              />
            )}
            {i === 1 && <span className="ni-plaque-tag">{frontUrl}</span>}
          </span>
        </a>
      ))}
    </div>
  );
}

function tierPillLabel(o: Offer) {
  return o.size != null ? `${o.size} Cartoons` : 'Membership';
}

function tierPriceLine(o: Offer) {
  return o.size != null
    ? `$${o.basePrice} / $${o.totalWithUrl?.toLocaleString()}`
    : `$${o.monthlyPrice}/mo`;
}

function stripLabel(o: Offer) {
  return o.size != null ? `${o.size}-Pack` : `$${o.monthlyPrice}/mo Membership`;
}

/** Compact vertical rail of all five offers beside the main card. */
function OfferRail({ activeKey }: { activeKey: string }) {
  return (
    <aside className="ni-offer-rail" aria-label="All offers">
      {OFFERS.map((o) => {
        const active = o.key === activeKey;
        return (
          <a
            key={o.key}
            className={`ni-offer-rail__item${active ? ' is-active' : ''}`}
            href={o.href}
            aria-current={active ? 'page' : undefined}
          >
            <span className="ni-offer-rail__line1">
              <span className="ni-offer-rail__title">{tierPillLabel(o)}</span>
              <span className="ni-offer-rail__price">{tierPriceLine(o)}</span>
            </span>
            <span className="ni-offer-rail__domain">{o.vanityDomain}</span>
            {!active && <span className="ni-offer-rail__arrow" aria-hidden="true">→</span>}
          </a>
        );
      })}
    </aside>
  );
}

/** The single clean 2-column offer card (zero nested boxes). */
function OfferCard({ activeKey }: { activeKey: string }) {
  const offer = OFFERS.find((o) => o.key === activeKey) ?? OFFERS[0];
  // "With Your Website URL" is the default, highlighted version.
  const [branded, setBranded] = useState(true);

  // Membership card.
  if (offer.size == null) {
    return (
      <div className="ni-offer-card">
        <div className="ni-offer-card__left">
          <span className="ni-funnel-badge">{offer.vanityDomain}</span>
          <h2 className="ni-offer-card__title">{offer.offerName}</h2>
          <p className="ni-offer-card__desc">
            {offer.blurb} Details are pending — benefits, billing frequency,
            and sign-up arrive in a later phase.
          </p>
          <p className="ni-offer__pending">
            Lifetime pricing and specific benefits are left open for now.
          </p>
        </div>
        <div className="ni-offer-card__right">
          <p className="ni-price-display">
            ${offer.monthlyPrice}<span>/month</span>
          </p>
          <p className="ni-price-sub">Bob&rsquo;s proposed price for All-Access Membership.</p>
          <a className="ni-btn ni-btn--primary ni-offer-card__cta" href={offer.href}>
            Get Membership — ${offer.monthlyPrice}/mo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    );
  }

  const pricing = PACK_PRICING[offer.size];
  const cycleStart = OFFERS.findIndex((o) => o.size === offer.size); // 0..3
  const basePerCartoon = pricing.basePrice / pricing.size;
  const total = branded ? pricing.totalWithUrl : pricing.basePrice;

  return (
    <div className="ni-offer-card">
      <div className="ni-offer-card__left">
        <span className="ni-funnel-badge">{offer.vanityDomain}</span>
        <h2 className="ni-offer-card__title">{offer.offerName}</h2>
        <p className="ni-offer-card__desc">{offer.blurb}</p>
        <CollageFan cycleStart={cycleStart} frontUrl="yourbusiness.com" />
        <ul className="ni-license">
          <li>Commercial rights for ads, social &amp; print</li>
          <li>Instant high-res download</li>
          <li>Pick your cartoons or use curated set</li>
        </ul>
      </div>

      <div className="ni-offer-card__right">
        <div className="ni-mode-toggle" role="radiogroup" aria-label="Pack version">
          <button
            type="button"
            role="radio"
            aria-checked={branded}
            className={branded ? 'is-selected' : ''}
            onClick={() => setBranded(true)}
          >
            With Your Website URL
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={!branded}
            className={!branded ? 'is-selected' : ''}
            onClick={() => setBranded(false)}
          >
            Unbranded Pack
          </button>
        </div>

        <p className="ni-price-display">${total.toLocaleString()}</p>
        <p className="ni-price-sub">
          {branded
            ? `Includes $${pricing.basePrice} for ${pricing.size} cartoons + $${pricing.urlFee.toLocaleString()} URL branding ($${pricing.urlFeePerCartoon}/cartoon)`
            : `$${basePerCartoon} per cartoon · Standard shared catalog without custom URL`}
        </p>

        <a className="ni-btn ni-btn--primary ni-offer-card__cta" href={offer.href}>
          {branded
            ? `Get Branded Pack — $${pricing.totalWithUrl.toLocaleString()}`
            : `Get Unbranded Pack — $${pricing.basePrice}`}{' '}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

/** Understated strip referencing the other four funnel offers. */
function OtherOffersStrip({ activeKey }: { activeKey: string }) {
  const others = OFFERS.filter((o) => o.key !== activeKey);
  return (
    <p className="ni-other-strip">
      Other offers:{' '}
      {others.map((o, i) => (
        <span key={o.key}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <a href={o.href}>
            {stripLabel(o)} ({o.vanityDomain})
          </a>
        </span>
      ))}
    </p>
  );
}

/** Offer section: main card + vertical tier rail + cross-reference strip. */
export function OfferSection({ activeKey, id }: { activeKey: string; id?: string }) {
  return (
    <section className="ni-section ni-section--packs" id={id}>
      <div className="ni-offer-layout">
        <OfferCard activeKey={activeKey} />
        <OfferRail activeKey={activeKey} />
      </div>
      <OtherOffersStrip activeKey={activeKey} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Offer pages (packs + membership)                                    */
/* ------------------------------------------------------------------ */

export function PackOfferPage({ size }: { size: number }) {
  const offer = OFFERS.find((o) => o.size === size) ?? OFFERS[0];
  return (
    <>
      <section className="ni-section ni-section--band ni-page-head">
        <span className="ni-kicker">Cartoon pack</span>
        <h1 className="ni-offer__title">{size}-Cartoon Pack</h1>
        <a className="ni-offer__gallery-link" href="/cartoon-preview/gallery">
          Browse the shared gallery →
        </a>
      </section>
      <OfferSection activeKey={offer.key} />
    </>
  );
}

export function OfferPage({ route }: { route: string }) {
  const offer =
    OFFERS.find((o) => o.key === route.replace('cartoon-preview/', '')) ?? OFFERS[0];

  if (offer.size != null) {
    return <PackOfferPage size={offer.size} />;
  }

  return (
    <>
      <section className="ni-section ni-section--band ni-page-head">
        <span className="ni-kicker">Membership</span>
        <h1 className="ni-offer__title">Membership</h1>
        <a className="ni-offer__gallery-link" href="/cartoon-preview/gallery">
          Browse the shared gallery →
        </a>
      </section>
      <OfferSection activeKey="membership" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Personalization preview (homepage)                                  */
/* ------------------------------------------------------------------ */

export function PersonalizeSection() {
  const [websiteUrl, setWebsiteUrl] = useState('nearinsanity.com');
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Sample addresses so visitors can test the auto-shrinking plaque type
  // with a single click instead of typing.
  const SAMPLES = ['acmecoffee.com', 'brightdental.co', 'oakstreetlaw.com'];

  // Keep the personalized address legible on the plaque: size the overlay
  // text to fill the lettering band, shrinking when the address is long so
  // it always fits the plaque (single line, like engraved lettering).
  useEffect(() => {
    const fit = () => {
      const frame = frameRef.current;
      const text = textRef.current;
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
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [websiteUrl]);

  return (
    <section className="ni-section ni-section--personalize" id="ni-personalize">
      <SectionHeading
        kicker="Personalize"
        title="Put your website on the artwork."
        blurb="Bob’s framed Thanksgiving cartoon ships with a wooden plaque — add your own website address and see it engraved in place. Try it with a longer address; the lettering shrinks to fit."
      />
      <div className="ni-personalize">
        <div className="ni-personalize__field">
          <label className="ni-personalize__label" htmlFor="ni-website-url">
            Your website address
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
          <div className="ni-personalize__samples" role="group" aria-label="Sample website addresses">
            {SAMPLES.map((sample) => (
              <button
                key={sample}
                type="button"
                className="ni-pill"
                onClick={() => setWebsiteUrl(sample)}
              >
                {sample}
              </button>
            ))}
          </div>
          <p className="ni-personalize__hint">
            The plaque updates as you type — local demo only.
          </p>
        </div>
        <div className="ni-personalize__frame" ref={frameRef}>
          <div className="ni-personalize__imgwrap">
            <img
              src={`${ART_BASE}/thanksgiving-frame.png`}
              alt="Bob Johnson’s framed Thanksgiving cartoon with a wooden plaque at the bottom"
              className="ni-personalize__img"
            />
            <div className="ni-personalize__plaque" aria-hidden="true">
              <span className="ni-personalize__plaque-text" ref={textRef}>
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
  );
}

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

export function HomePage() {
  const [resolved, setResolved] = useState<Record<string, Resolution>>({});
  const featured = CARTOONS[0];

  const handleImgError = (cartoon: Cartoon) => {
    setResolved((prev) => advanceResolution(prev, cartoon.id));
  };

  return (
    <>
      {/* Hero */}
      <section className="ni-hero">
        <div className="ni-hero__copy">
          <span className="ni-kicker">Syndicated cartoons for marketing</span>
          <h1 className="ni-hero__title">
            Cartoons for an <em>absurd</em> world.
          </h1>
          <p className="ni-hero__lead">
            Bob Johnson&rsquo;s digital cartoons — strange everyday moments and
            rock-and-roll chaos — ready for your marketing, with your own
            website address on the artwork.
          </p>
          <div className="ni-hero__actions">
            <a className="ni-btn ni-btn--primary" href="/cartoon-preview/gallery">
              Browse Cartoons <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              className="ni-btn ni-btn--outline"
              onClick={() => scrollToSection('ni-personalize')}
            >
              Try Your URL Live <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
        <div className="ni-hero__art-col">
          <a className="ni-card ni-hero__art" href="/cartoon-preview/gallery">
            <span className="ni-card__frame">
              {isMissing(featured, resolved) ? (
                <ArtworkPlaceholder cartoon={featured} />
              ) : (
                <img
                  src={srcFor(featured, resolved)}
                  alt={featured.alt}
                  onError={() => handleImgError(featured)}
                />
              )}
            </span>
            <span className="ni-card__caption">
              <span className="ni-card__title">{featured.title}</span>
              <span className="ni-card__tag">{featured.tag} — open the gallery</span>
              <span className="ni-card__callout">
                yourbusiness.com — engraved on every cartoon
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="ni-section ni-section--intro" id="how-it-works">
        <SectionHeading
          kicker="How it works"
          title="Your marketing, with a cartoon twist."
          blurb="Businesses use Bob’s absurd cartoons in ads, social posts, and packaging — then make them their own."
        />
        <div className="ni-steps">
          <div className="ni-step">
            <span className="ni-step__num">01</span>
            <span className="ni-step__title">Browse the gallery</span>
            <p className="ni-step__text">
              Full cartoon frames, captions included, from the shared catalog.
            </p>
            <a className="ni-step__link" href="/cartoon-preview/gallery">
              See the cartoons →
            </a>
          </div>
          <div className="ni-step">
            <span className="ni-step__num">02</span>
            <span className="ni-step__title">Pick a pack</span>
            <p className="ni-step__text">
              Choose the pack size that fits your marketing — starting with 10
              cartoons.
            </p>
            <a className="ni-step__link" href="/cartoon-preview/packs/10">
              The 10-cartoon pack →
            </a>
          </div>
          <div className="ni-step">
            <span className="ni-step__num">03</span>
            <span className="ni-step__title">Add your website address</span>
            <p className="ni-step__text">
              Optional: put your address on the artwork, engraved on the
              plaque. Try it below.
            </p>
            <a className="ni-step__link" href="#ni-personalize" onClick={(e) => { e.preventDefault(); scrollToSection('ni-personalize'); }}>
              Try the preview →
            </a>
          </div>
        </div>
      </section>

      {/* Personalization demo */}
      <PersonalizeSection />

      {/* Unified offer: featured 10-pack + all five funnel offers */}
      <OfferSection activeKey="packs/10" id="ni-offers" />
    </>
  );
}