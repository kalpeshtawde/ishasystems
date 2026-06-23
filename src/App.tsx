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
import { useLanguage } from './i18n';
import { applySeo } from './seo';

function App() {
  // Active UI language (en / es) drives localized <head> metadata.
  const { lang } = useLanguage();

  // Local state manager to drive sub-page routing without heavy multi-router bundles
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Sync URL hash with current tab
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    setCurrentTab(hash);
  }, []);

  // Keep document head metadata in sync with the active tab and language
  useEffect(() => {
    applySeo(currentTab, lang);
  }, [currentTab, lang]);

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
      case 'unsubscribe':
        return <Unsubscribe />;
      default:
        return <Home setCurrentTab={handleTabChange} />;
    }
  };

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
