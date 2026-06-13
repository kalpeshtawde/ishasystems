import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className="inline-flex items-center rounded-full border border-[#e2edf7] bg-[#f8fafc] p-0.5"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          lang === 'en' ? 'bg-[#0f1f4d] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f1f4d]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          lang === 'es' ? 'bg-[#0f1f4d] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f1f4d]'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigate then close the mobile menu
  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    setMenuOpen(false);
  };

  return (
    <header>
    <nav className="bg-white sticky top-0 z-50 border-b border-[#e2edf7]" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNav('home')}
          >
            <span className="font-extrabold text-xl tracking-tight text-[#0f1f4d]">ISHA</span>
            <span className="font-normal text-xl tracking-wide text-[#0f1f4d] ml-1.5 opacity-80">SYSTEMS</span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNav('pricing')}
                className={`text-sm font-medium transition-colors ${currentTab === 'pricing' ? 'text-[#0ea5e9]' : 'text-[#374151] hover:text-[#0ea5e9]'}`}
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => handleNav('portfolio')}
                className={`text-sm font-medium transition-colors ${currentTab === 'portfolio' ? 'text-[#0ea5e9]' : 'text-[#374151] hover:text-[#0ea5e9]'}`}
              >
                {t.nav.portfolio}
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="bg-[#0f1f4d] hover:bg-[#0a1628] text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all"
              >
                {t.nav.getStarted}
              </button>
            </div>
            <LanguageToggle />
            {/* Mobile hamburger toggle */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center text-[#0f1f4d] p-1"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e2edf7] bg-white px-4 sm:px-6 py-4 flex flex-col gap-2">
          <button
            onClick={() => handleNav('pricing')}
            className={`text-left text-sm font-medium py-2 transition-colors ${currentTab === 'pricing' ? 'text-[#0ea5e9]' : 'text-[#374151] hover:text-[#0ea5e9]'}`}
          >
            {t.nav.pricing}
          </button>
          <button
            onClick={() => handleNav('portfolio')}
            className={`text-left text-sm font-medium py-2 transition-colors ${currentTab === 'portfolio' ? 'text-[#0ea5e9]' : 'text-[#374151] hover:text-[#0ea5e9]'}`}
          >
            {t.nav.portfolio}
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="bg-[#0f1f4d] hover:bg-[#0a1628] text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all text-center mt-1"
          >
            {t.nav.getStarted}
          </button>
        </div>
      )}
    </nav>
    </header>
  );
};
