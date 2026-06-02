import React from 'react';
import { useLanguage } from '../i18n';

interface PortfolioProps {
  setCurrentTab: (tab: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();
  return (
    <div>
      {/* ── Portfolio Section ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0f1f4d] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              {t.portfolio.tag}
            </span>
            <h1 className="text-4xl lg:text-[3rem] font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.portfolio.title}
            </h1>
            <p className="text-[#64748b] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.portfolio.sub}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1: PyPyCode.com */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/ppc/ppc_homepage.jpg" alt="PyPyCode.com — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.portfolio.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.portfolio.catTech}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>PyPyCode.com</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.liveIn5}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="https://pypycode.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.portfolio.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 2: Mavi Collision Center */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/mcc/mcc_homepage.jpg" alt="Mavi Collision Center — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.portfolio.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.portfolio.catAuto}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Mavi Collision Center</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.liveIn6}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="https://mavicollisioncenter.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.portfolio.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 3: KidBuzz Daily */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/kbd/kbd_homepage.jpg" alt="Kid Buzz Daily — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.portfolio.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.portfolio.catKids}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Kid Buzz Daily</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.liveIn4}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="https://kidbuzzdaily.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.portfolio.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 4: League of Tennis */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/lot/lot_homepage.jpg" alt="League of Tennis — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.portfolio.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.portfolio.catSports}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>League of Tennis</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.portfolio.liveIn5}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.portfolio.viewSite}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio CTA */}
          <div className="text-center">
            <h3 className="text-[#0f1f4d] font-bold text-xl mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.portfolio.ctaTitle}
            </h3>
            <p className="text-[#64748b] mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.portfolio.ctaSub}
            </p>
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-sm rounded-lg transition-all shadow-lg"
            >
              {t.portfolio.ctaButton}
            </button>
            <p className="text-[#64748b] text-sm mt-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <a href="#contact" className="text-[#0ea5e9] font-semibold hover:text-[#f97316] transition-colors underline">{t.portfolio.linkGetWebsite}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
