import React from 'react';
import { Terminal } from 'lucide-react';
import { useLanguage } from '../i18n';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0B192C] text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2">
            <Terminal className="text-[#FF6500] h-5 w-5" />
            <span className="font-bold text-lg text-white">Isha<span className="text-[#FF6500]">Systems</span></span>
          </div>
          <div className="text-sm text-center md:text-left">
            {t.footer.tagline}
          </div>
          <div className="text-sm md:text-right text-slate-300">
            {t.footer.managed}
          </div>
        </div>
        <p className="pt-8 text-center text-[12px] text-slate-500 max-w-[700px] mx-auto leading-relaxed">
          {t.footer.seoText}
        </p>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>&copy; {new Date().getFullYear()} Isha Systems. {t.footer.rights}</div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white">{t.footer.privacy}</a>
            <a href="#terms" className="hover:text-white">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
