import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Portfolio } from './pages/Portfolio';
import { Pricing } from './pages/Pricing';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

// Per-page SEO metadata, keyed by tab. Drives <title>, description, and canonical.
const SEO: Record<string, { title: string; description: string; path: string }> = {
  home: {
    title: 'Affordable Website Design for Small Business | $300 Complete Package | ISHA Systems LLC',
    description:
      'Get a professional 10-page website for just $300 — includes free domain, free business email, free hosting & SSL. Live in 7 days. Only $30/mo after. ISHA Systems LLC.',
    path: '/',
  },
  pricing: {
    title: 'Website Design Pricing — $300 Flat Fee, Everything Included | ISHA Systems LLC',
    description:
      'Simple, honest website design pricing: one $300 flat fee for a 10-page site with free domain, business email, hosting & SSL. Just $30/mo maintenance. No hidden fees.',
    path: '/pricing',
  },
  portfolio: {
    title: 'Our Work — Small Business Websites Built by ISHA Systems LLC',
    description:
      'See affordable small business websites designed by ISHA Systems LLC. Every site delivered in under 7 days for a $300 flat fee with free domain, email, and hosting.',
    path: '/portfolio',
  },
  contact: {
    title: 'Get Your Small Business Website — Start for $300 | ISHA Systems LLC',
    description:
      "Start your small business website for $300. Free domain, business email, and hosting included. Tell us about your business and we'll reply within 24 hours.",
    path: '/contact',
  },
  privacy: {
    title: 'Privacy Policy | ISHA Systems LLC',
    description: 'How ISHA Systems LLC collects, uses, and protects your information.',
    path: '/privacy-policy',
  },
  terms: {
    title: 'Terms of Service | ISHA Systems LLC',
    description: 'The terms governing use of ISHA Systems LLC web development, hosting, and email services.',
    path: '/terms-of-service',
  },
};

const SITE_ORIGIN = 'https://www.ishasystems.com';

// Update or create a <meta> / <link> head element by selector.
function setMeta(selector: string, attr: 'content' | 'href', value: string) {
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

function applySeo(tab: string) {
  const seo = SEO[tab] || SEO.home;
  const url = `${SITE_ORIGIN}${seo.path}`;
  document.title = seo.title;
  setMeta('meta[name="description"]', 'content', seo.description);
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:title"]', 'content', seo.title);
  setMeta('meta[property="og:description"]', 'content', seo.description);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[name="twitter:title"]', 'content', seo.title);
  setMeta('meta[name="twitter:description"]', 'content', seo.description);
}

function App() {
  // Local state manager to drive sub-page routing without heavy multi-router bundles
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Sync URL hash with current tab
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    setCurrentTab(hash);
  }, []);

  // Keep document head metadata in sync with the active tab
  useEffect(() => {
    applySeo(currentTab);
  }, [currentTab]);

  // Update URL hash when tab changes
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
  };

  // Listen for hash changes (back/forward browser navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentTab(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
      default:
        return <Home setCurrentTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F1F6F9]">
      <div>
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
