import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Portfolio } from './pages/Portfolio';
import { Pricing } from './pages/Pricing';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

function App() {
  // Local state manager to drive sub-page routing without heavy multi-router bundles
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Sync URL hash with current tab
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    setCurrentTab(hash);
  }, []);

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
