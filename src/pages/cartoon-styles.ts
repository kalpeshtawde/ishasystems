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

.ni-nav a {
  background: none;
  border: 0;
  padding: 8px 14px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ni-ink);
  text-decoration: none;
  border-radius: 999px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.ni-nav a:hover {
  background: var(--ni-yellow);
}

.ni-nav a.is-active {
  background: var(--ni-ink);
  color: var(--ni-paper-light);
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

/* ---------------- Featured offer (homepage) ---------------- */

.ni-feature-offer {
  max-width: 560px;
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
  color: var(--ni-ink);
  text-decoration: none;
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
  margin-bottom: 18px;
}

.ni-pack-card__cta {
  margin-top: auto;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--ni-red);
  text-underline-offset: 4px;
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

.ni-offer__body {
  max-width: 640px;
  font-size: 1.1rem;
}

.ni-offer__body p {
  margin: 0 0 18px;
}

.ni-offer__price {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  line-height: 1;
  margin: 0 0 6px;
}

.ni-offer__price span {
  font-size: 0.45em;
  color: var(--ni-ink-soft);
}

.ni-offer__proposed {
  font-weight: 600;
  color: var(--ni-ink-soft);
  margin: 0 0 22px;
}

.ni-offer__pending {
  border: 2px dashed var(--ni-line);
  border-radius: 10px;
  padding: 16px 18px;
  background: var(--ni-paper-light);
  color: var(--ni-ink-soft);
  font-size: 0.98rem;
}

/* ---------------- Explore other offers ---------------- */

.ni-section--others {
  background: var(--ni-paper-deep);
  border-top: 2px solid var(--ni-ink);
  max-width: none;
}

.ni-section--others > * {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.ni-others__title {
  font-family: var(--ni-font-display);
  font-weight: 900;
  font-size: clamp(1.6rem, 3.6vw, 2.3rem);
  letter-spacing: -0.02em;
  margin: 0 0 26px;
}

.ni-others {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ni-other-link {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  background: var(--ni-paper-light);
  border: 2px solid var(--ni-ink);
  border-radius: 8px;
  padding: 20px 22px;
  color: var(--ni-ink);
  text-decoration: none;
  box-shadow: var(--ni-shadow);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.ni-other-link:hover {
  transform: translateY(-3px);
  box-shadow: 8px 8px 0 rgba(38, 32, 26, 0.18);
}

.ni-other-link__label {
  font-family: var(--ni-font-display);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.2;
}

.ni-other-link__blurb {
  margin: 0;
  font-size: 0.9rem;
  color: var(--ni-ink-soft);
}

.ni-other-link__go {
  margin-top: auto;
  font-weight: 700;
  color: var(--ni-red);
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
  .ni-root .ni-nav a,
  .ni-root .ni-iconbtn,
  .ni-root .ni-navbtn,
  .ni-root .ni-pack-card,
  .ni-root .ni-other-link {
    transition: none;
  }
  .ni-root .ni-card:hover,
  .ni-root .ni-hero__art:hover {
    transform: none;
  }
}
`;