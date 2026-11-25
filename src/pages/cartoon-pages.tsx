import { useEffect, useRef, useState } from 'react';
import {
  ART_BASE,
  CARTOONS,
  OFFERS,
  PACKS,
  advanceResolution,
  isMissing,
  srcFor,
  type Cartoon,
  type Resolution,
} from './cartoon-data';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
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
/* Offer pages (packs + membership)                                    */
/* ------------------------------------------------------------------ */

export function OfferPage({ route }: { route: string }) {
  const offer =
    OFFERS.find((o) => o.key === route.replace('cartoon-preview/', '')) ?? OFFERS[0];
  const others = OFFERS.filter((o) => o.key !== offer.key); // exactly four
  const isPack = offer.size != null;

  return (
    <>
      <section className="ni-section ni-section--band ni-page-head">
        <span className="ni-kicker">{isPack ? 'Cartoon pack' : 'Membership'}</span>
        <h1 className="ni-offer__title">{offer.label}</h1>
        <a className="ni-offer__gallery-link" href="/cartoon-preview/gallery">
          Browse the shared gallery →
        </a>

        <div className="ni-offer__body">
          {isPack ? (
            <>
              <p>
                This pack includes <strong>{offer.size} cartoons</strong> from
                Bob&rsquo;s shared catalog, delivered as ready-to-use artwork
                for your marketing.
              </p>
              <p>
                Adding <strong>your website address to the artwork</strong> is
                an optional customization — the same personalization preview
                you can try on the homepage.
              </p>
              <p className="ni-offer__pending">
                Pricing is to be confirmed, including any fee for adding a
                website address. Whether packs are curated by Bob or buyers
                choose their own cartoons is also still open.
              </p>
            </>
          ) : (
            <>
              <p className="ni-offer__price">
                $25<span>/month</span>
              </p>
              <p className="ni-offer__proposed">
                Bob&rsquo;s proposed price for membership.
              </p>
              <p>
                Membership details are pending. Benefits, billing frequency,
                and sign-up arrive in a later phase, once Bob confirms them.
              </p>
              <p className="ni-offer__pending">
                Lifetime pricing and specific benefits are left open for now.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="ni-section ni-section--others">
        <h2 className="ni-others__title">Explore other offers</h2>
        <ul className="ni-others">
          {others.map((o) => (
            <li key={o.key}>
              <a className="ni-other-link" href={o.href}>
                <span className="ni-other-link__label">{o.label}</span>
                <span className="ni-other-link__blurb">{o.blurb}</span>
                <span className="ni-other-link__go">View offer →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
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
          <span className="ni-kicker">Digital cartoons · working title</span>
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
            </span>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="ni-section ni-section--intro">
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
            <a className="ni-step__link" href="#ni-personalize">
              Try the preview →
            </a>
          </div>
        </div>
      </section>

      {/* Personalization demo */}
      <PersonalizeSection />

      {/* Featured offer */}
      <section className="ni-section ni-section--packs">
        <SectionHeading
          kicker="Starting offer"
          title="The 10-Cartoon Pack."
          blurb="The proposed way to start — a starter set of Bob’s best cartoons for your marketing."
        />
        <div className="ni-feature-offer">
          <a className="ni-pack-card ni-pack-card--featured" href="/cartoon-preview/packs/10">
            <span className="ni-pack-card__badge">Starting offer</span>
            <span className="ni-pack-card__size">10</span>
            <span className="ni-pack-card__unit">Cartoons</span>
            <span className="ni-pack-card__desc">
              {PACKS[0].desc} Add your website address to the artwork as an
              optional customization.
            </span>
            <span className="ni-pack-card__price">Price — to be confirmed</span>
            <span className="ni-pack-card__cta">View the pack →</span>
          </a>
        </div>
      </section>
    </>
  );
}