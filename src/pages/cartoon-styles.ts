/**
 * Route-scoped styles for the Near Insanity concept preview.
 * Every selector lives under `.ni-root`, and the <style> tag is rendered only
 * while the demo is mounted — the ISHA Systems pages are never affected.
 */

export const NI_CSS = `
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
  scroll-behavior: smooth;
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

/* Custom logo: winged toaster + stacked comic wordmark. */
.ni-logo {
  display: block;
  height: 68px;
  width: auto;
}

@media (max-width: 640px) {
  .ni-logo {
    height: 56px;
  }
}

.ni-logo__near,
.ni-logo__insanity {
  font-family: 'Bangers', 'Comic Sans MS', 'Segoe Print', cursive;
  fill: var(--ni-ink);
}

.ni-logo__near {
  font-size: 48px;
  letter-spacing: 0.02em;
}

.ni-logo__insanity {
  font-size: 40px;
  letter-spacing: 0.02em;
}

.ni-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.ni-nav a,
.ni-nav button {
  background: none;
  border: 0;
  padding: 9px 14px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ni-ink);
  text-decoration: none;
  border-radius: 999px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.ni-nav a:hover,
.ni-nav button:hover {
  background: var(--ni-yellow);
}

/* Compact dark pill CTA (Try Live Preview) on the far right. */
.ni-nav button.ni-nav-cta {
  background: var(--ni-ink);
  color: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  padding: 8px 18px;
  font-weight: 700;
}

.ni-nav button.ni-nav-cta:hover {
  background: var(--ni-red);
  border-color: var(--ni-red);
}

/* ---------------- Shared bits ---------------- */

.ni-kicker {
  display: inline-block;
  background: var(--ni-yellow);
  color: var(--ni-ink);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
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
  text-decoration: none;
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

/* ---------------- Sections / page heads ---------------- */

.ni-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(64px, 8vw, 110px) 24px;
  scroll-margin-top: 96px;
}

/* Page-level header (gallery, offer pages) */
.ni-page-head {
  padding-top: clamp(72px, 10vw, 140px);
}

/* Match the offer card container (1120px) so headings align with the card. */
.ni-section--band .ni-page-head__inner {
  max-width: 1120px;
  margin: 0 auto;
}

.ni-page-head__pills {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ni-section--band {
  background: var(--ni-paper-light);
  border-top: 2px solid var(--ni-ink);
  border-bottom: 2px solid var(--ni-ink);
  max-width: none;
}

.ni-section--band > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

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
  text-decoration: none;
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

/* Hero callout: live example domain engraved on every cartoon. */
.ni-card__callout {
  align-self: flex-start;
  margin-top: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--ni-red);
  border: 1.5px solid var(--ni-red);
  border-radius: 999px;
  padding: 4px 12px;
  background: rgba(228, 87, 46, 0.06);
}

/* Hero artwork: a tilted, framed piece. */
.ni-hero__art {
  transform: rotate(-1.5deg);
}

.ni-hero__art:hover {
  transform: rotate(0deg) translateY(-4px);
}

/* ---------------- Gallery ---------------- */

/* Responsive grid that scales to Bob's full catalog — extra entries in the
   CARTOONS array simply flow into new columns/rows. */
.ni-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  align-items: start;
}

.ni-gallery-note {
  margin: 34px 0 0;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ni-ink-soft);
  border-top: 2px solid var(--ni-line);
  padding-top: 18px;
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

/* ---------------- How it works (homepage intro) ---------------- */

.ni-section--intro {
  background: var(--ni-paper-light);
  border-top: 2px solid var(--ni-ink);
  border-bottom: 2px solid var(--ni-ink);
  max-width: none;
}

.ni-section--intro > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.ni-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.ni-step {
  position: relative;
  background: var(--ni-paper);
  border: 2px solid var(--ni-ink);
  border-radius: 8px;
  padding: 26px 24px;
  box-shadow: var(--ni-shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ni-step__num {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: 0.95rem;
  color: var(--ni-red);
}

.ni-step__title {
  font-family: var(--ni-font-display);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
}

.ni-step__text {
  margin: 0;
  color: var(--ni-ink-soft);
  font-size: 0.98rem;
}

.ni-step__link {
  margin-top: auto;
  font-weight: 700;
  color: var(--ni-ink);
  text-decoration: underline;
  text-decoration-color: var(--ni-red);
  text-underline-offset: 4px;
}

/* Sample custom domain engraved on the front frame's plaque. */
.ni-plaque-tag {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 4%;
  display: block;
  padding: 3px 7px;
  background: rgb(100, 69, 51);
  border-radius: 2px;
  color: #F6EFDF;
  font-family: var(--ni-font-display);
  font-weight: 600;
  font-size: clamp(0.62rem, 1.1vw, 0.78rem);
  line-height: 1.15;
  letter-spacing: 0.02em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------------- Offer pages ---------------- */

.ni-offer__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 20px 0 8px;
}

.ni-offer__gallery-link {
  display: inline-block;
  margin: 12px 0 34px;
  font-weight: 700;
  color: var(--ni-ink);
  text-decoration: underline;
  text-decoration-color: var(--ni-red);
  text-underline-offset: 4px;
}

.ni-offer__pending {
  border: 2px dashed var(--ni-line);
  border-radius: 10px;
  padding: 16px 18px;
  background: var(--ni-paper-light);
  color: var(--ni-ink-soft);
  font-size: 0.98rem;
}

/* ---------------- Offer layout (card + vertical tier rail) ---------------- */

.ni-offer-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
}

@media (min-width: 900px) {
  .ni-offer-layout {
    grid-template-columns: 72fr 28fr;
    align-items: stretch;
  }
}

/* Vertical rail: all five offers stacked from the card's top edge. */
.ni-offer-rail {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ni-offer-rail__item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-radius: 14px;
  border: 1px solid var(--ni-ink);
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.6);
  color: var(--ni-ink);
  text-decoration: none;
  transition: background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

.ni-offer-rail__item:not(.is-active) {
  padding-right: 34px;
}

.ni-offer-rail__item:not(.is-active):hover {
  background: var(--ni-yellow);
  transform: translateX(-2px);
}

.ni-offer-rail__item.is-active {
  background: #1c1917;
  border-color: #1c1917;
  color: #fff;
}

.ni-offer-rail__line1 {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  font-weight: 700;
  font-size: 0.95rem;
}

.ni-offer-rail__price {
  font-weight: 600;
  font-size: 0.78rem;
  opacity: 0.82;
  white-space: nowrap;
}

.ni-offer-rail__domain {
  font-size: 0.74rem;
  font-weight: 600;
  opacity: 0.78;
}

.ni-offer-rail__arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ni-red);
}

/* ---------------- Main offer card (single column, big art) ---------------- */

.ni-offer-card {
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 14px;
  padding: clamp(26px, 4vw, 40px);
  box-shadow: var(--ni-shadow);
}

.ni-offer-card__top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.ni-funnel-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--ni-red);
  border: 1.5px solid var(--ni-red);
  border-radius: 999px;
  padding: 4px 12px;
  background: rgba(228, 87, 46, 0.06);
}

.ni-offer-card__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(2rem, 4.4vw, 2.8rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0;
}

.ni-offer-card__desc {
  margin: 0;
  color: var(--ni-ink-soft);
  font-size: 1.02rem;
  max-width: 52ch;
}

/* Large 2×2 artwork showcase — the primary selling point. */
.ni-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  width: 100%;
  margin: 6px 0 2px;
}

.ni-showcard {
  display: block;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 8px;
  padding: 10px;
  box-shadow: var(--ni-shadow);
  transition: transform 0.18s ease;
}

.ni-showcard__frame {
  position: relative;
  display: block;
  background: #fff;
  border: 1.5px solid var(--ni-line);
  overflow: hidden;
}

.ni-showcard__frame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.ni-showcard--1 { transform: rotate(-1.5deg); }
.ni-showcard--2 { transform: rotate(1deg); }
.ni-showcard--3 { transform: rotate(0.8deg); }
.ni-showcard--4 { transform: rotate(-0.8deg); }

.ni-showcard:hover {
  transform: rotate(0deg);
  z-index: 2;
}

/* Bottom row: pricing & CTA alongside license checkmarks. */
.ni-offer-card__bottom {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  border-top: 2px solid var(--ni-line);
  padding-top: 24px;
}

@media (min-width: 900px) {
  .ni-offer-card__bottom {
    grid-template-columns: 1.1fr 1fr;
    gap: 40px;
    align-items: center;
  }
}

.ni-offer-card__pricing {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* With Your Website URL vs. Unbranded Pack selector. */
.ni-mode-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: var(--ni-paper);
  border: 2px solid var(--ni-ink);
  border-radius: 12px;
  padding: 6px;
}

.ni-mode-toggle button {
  font-family: var(--ni-font-body);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--ni-ink-soft);
  background: transparent;
  border: 0;
  border-radius: 8px;
  padding: 10px 8px;
  line-height: 1.2;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.ni-mode-toggle button.is-selected {
  background: var(--ni-ink);
  color: var(--ni-paper-light);
}

.ni-price-display {
  margin: 4px 0 0;
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(2.6rem, 5vw, 3.6rem);
  line-height: 1;
}

.ni-price-display span {
  font-size: 0.45em;
  font-weight: 600;
  color: var(--ni-ink-soft);
}

.ni-price-sub {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ni-ink-soft);
}

.ni-offer-card__cta {
  width: 100%;
  justify-content: center;
  margin-top: 4px;
}

.ni-license {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ni-license li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 600;
}

.ni-license li::before {
  content: '✓';
  flex-shrink: 0;
  font-weight: 800;
  color: var(--ni-red);
}

/* ---------------- Other offers strip ---------------- */

.ni-other-strip {
  max-width: 1120px;
  margin: 26px auto 0;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ni-ink-soft);
}

.ni-other-strip a {
  color: var(--ni-ink);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--ni-red);
  text-underline-offset: 3px;
}

/* ---------------- Engraved samples ---------------- */

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

/* 2×2 grid of engraved Thanksgiving frames. */
.ni-engrave {
  display: grid;
  grid-template-columns: 1fr;
  gap: 26px;
}

@media (min-width: 720px) {
  .ni-engrave {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

.ni-engrave-card {
  margin: 0;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 10px;
  padding: 12px;
  box-shadow: var(--ni-shadow);
  transform: rotate(-0.6deg);
  transition: transform 0.18s ease;
}

.ni-engrave-card:nth-child(even) {
  transform: rotate(0.6deg);
}

.ni-engrave-card:hover {
  transform: rotate(0deg);
}

.ni-engrave-card__frame {
  display: block;
  background: #fff;
  border: 1.5px solid var(--ni-line);
  overflow: hidden;
}

.ni-engrave-card__frame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.ni-engrave-card__caption {
  display: block;
  text-align: center;
  padding: 12px 4px 4px;
  font-family: var(--ni-font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--ni-red);
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

/* ---------------- Reduced motion ---------------- */

@media (prefers-reduced-motion: reduce) {
  .ni-root .ni-card,
  .ni-root .ni-btn,
  .ni-root .ni-nav a,
  .ni-root .ni-nav button,
  .ni-root .ni-iconbtn,
  .ni-root .ni-navbtn,
  .ni-root .ni-offer-rail__item,
  .ni-root .ni-showcard,
  .ni-root .ni-engrave-card {
    transition: none;
  }
  .ni-root .ni-card:hover,
  .ni-root .ni-hero__art:hover {
    transform: none;
  }
}
`;