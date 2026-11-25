import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Portfolio } from './pages/Portfolio';
import { Pricing } from './pages/Pricing';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Unsubscribe } from './pages/Unsubscribe';
import { CartoonPreview } from './pages/CartoonPreview';
import { useLanguage } from './i18n';
import { applySeo, applyNearInsanityPreviewSeo } from './seo';

/** Route root for the standalone Near Insanity concept preview. */
const PREVIEW_ROOT = 'cartoon-preview';

/**
 * Maps the current URL to an app route key. The demo routes are rooted at
 * /cartoon-preview and work in both forms:
 *   clean path  — /cartoon-preview, /cartoon-preview/gallery, /cartoon-preview/packs/10 …
 *   hash form   — #cartoon-preview, #cartoon-preview/gallery, …
 * The legacy /near-insanity-preview (and its hash) maps to the demo root.
 */
function parseRouteFromUrl(): string {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'near-insanity-preview') return PREVIEW_ROOT; // legacy alias
  if (hash.startsWith(PREVIEW_ROOT)) return hash;

  const path = window.location.pathname;
  if (path === '/near-insanity-preview') return PREVIEW_ROOT; // legacy alias
  if (path === `/${PREVIEW_ROOT}`) return PREVIEW_ROOT;
  if (path.startsWith(`/${PREVIEW_ROOT}/`)) return path.slice(1); // '/cartoon-preview/gallery' → 'cartoon-preview/gallery'

  return hash || 'home';
}

/** True for any of the standalone demo pages (and the legacy alias). */
const isPreviewTab = (tab: string) =>
  tab === PREVIEW_ROOT ||
  tab.startsWith(`${PREVIEW_ROOT}/`) ||
  tab === 'near-insanity-preview';

/**
 * Tawk.to live chat — homepage only.
 *
 * The widget must never appear on the standalone demo routes, so it is no
 * longer loaded from index.html. This loader injects the embed script only
 * when the main site's homepage is active, and hides the widget everywhere
 * else (including the other ISHA pages).
 */
const TAWK_EMBED_SRC = 'https://embed.tawk.to/6a22b66a8705f01c35096c0e/1jqbph3uh';

interface TawkApi {
  show?: () => void;
  hide?: () => void;
  onLoad?: () => void;
  customStyle?: unknown;
}

let tawkShouldShow = false;

function setTawkVisibility(visible: boolean) {
  const w = window as unknown as { Tawk_API?: TawkApi };
  tawkShouldShow = visible;

  // Widget already loaded — just show or hide it.
  if (w.Tawk_API) {
    if (visible) w.Tawk_API.show?.();
    else w.Tawk_API.hide?.();
    return;
  }

  // Never load the embed unless we actually need it.
  if (!visible || document.getElementById('tawk-script')) return;

  // Configure before the embed script creates the widget.
  w.Tawk_API = w.Tawk_API ?? {};
  w.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: 'br', xOffset: 20, yOffset: 20 },
      mobile: { position: 'br', xOffset: 15, yOffset: 15 },
    },
  };
  // If the user leaves the homepage while the script is still loading, hide
  // the widget the moment it initializes instead of letting it pop in.
  w.Tawk_API.onLoad = () => {
    const api = (window as unknown as { Tawk_API?: TawkApi }).Tawk_API;
    if (tawkShouldShow) api?.show?.();
    else api?.hide?.();
  };

  const script = document.createElement('script');
  script.id = 'tawk-script';
  script.async = true;
  script.src = TAWK_EMBED_SRC;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.body.appendChild(script);
}

function App() {
  // Active UI language (en / es) drives localized <head> metadata.
  const { lang } = useLanguage();

  // Local state manager to drive sub-page routing without heavy multi-router
  // bundles. Initialized lazily from the URL so deep links work on first
  // paint; the Near Insanity demo answers to both clean paths
  // (/cartoon-preview/gallery) and hash forms (#cartoon-preview/gallery).
  const [currentTab, setCurrentTab] = useState<string>(() => parseRouteFromUrl());

  // Keep document head metadata in sync with the active tab and language
  useEffect(() => {
    if (isPreviewTab(currentTab)) {
      // Demo-only route: noindex + its own title/description/favicon (see seo.ts).
      applyNearInsanityPreviewSeo();
      return;
    }
    applySeo(currentTab, lang);
  }, [currentTab, lang]);

  // Tawk.to live chat: homepage only — hidden on other pages and never loaded
  // on the standalone mockup routes.
  useEffect(() => {
    setTawkVisibility(currentTab === 'home');
  }, [currentTab]);

  // Update URL hash when tab changes
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
  };

  // Listen for hash changes (back/forward browser navigation)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentTab(parseRouteFromUrl());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen for history traversal on clean-path routes (back/forward on the
  // /cartoon-preview/* pages, which navigate with full URLs).
  useEffect(() => {
    const handlePopState = () => {
      setCurrentTab(parseRouteFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={handleTabChange} />;
      case 'portfolio':
        return <Portfolio setCurrentTab={handleTabChange} />;
      case 'pricing':
        return <Pricing />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'unsubscribe':
        return <Unsubscribe />;
      default:
        return <Home setCurrentTab={handleTabChange} />;
    }
  };

  // Standalone concept preview for Bob Johnson's cartoon storefront.
  // Rendered outside the ISHA chrome (no top bar, navbar, or footer) with its
  // own layout, typography, and scoped styles.
  if (isPreviewTab(currentTab)) {
    return <CartoonPreview route={currentTab} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F1F6F9]">
      <div>
        {/* Top info bar */}
        <div className="hidden md:flex" style={{
          background: '#1a2e44',
          height: '36px'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            width: '100%'
          }}>
            <a 
              href="tel:+14047020806"
              style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📞 +1 404-702-0806
            </a>
            <a 
              href="mailto:support@ishasystems.com"
              style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ✉ support@ishasystems.com
            </a>
          </div>
        </div>
        
        {/* Pass state dispatch handlers into navigation layout context */}
        <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} />
        <main className="transition-all duration-300">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
