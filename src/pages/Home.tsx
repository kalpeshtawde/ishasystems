import React from 'react';
import { Mail, ShieldCheck, ArrowRight, Languages, Clock, CheckCircle2, Lock, Code } from 'lucide-react';
import { useLanguage } from '../i18n';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();
  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 30%, #dbeeff 60%, #f0fffe 100%)' }}>
        {/* Top-right teal circle blur */}
        <div 
          className="absolute top-0 right-0 pointer-events-none"
          style={{ 
            top: '-100px', 
            right: '-100px',
            width: '500px', 
            height: '500px',
            background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
            borderRadius: '50%'
          }} 
        />
        {/* Bottom-left orange blob */}
        <div 
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{ 
            bottom: '-80px', 
            left: '-80px',
            width: '350px', 
            height: '350px',
            background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
            borderRadius: '50%'
          }} 
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left Column ── */}
            <div>
              {/* Main Value Headline */}
              <h1 className="text-4xl lg:text-[3.5rem] font-extrabold text-[#0f1f4d] leading-[1.25] mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t.home.heroTitle1}<br />
                {t.home.heroTitle2}<br />
                {t.home.heroOnly} <span className="text-[#f97316]">$300.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base text-[#64748b] mb-8 max-w-xl leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.heroSub}
              </p>

              {/* Pricing badge row */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="bg-white border border-[#cbd5e1] rounded-full px-4 py-2 shadow-sm">
                  <span className="text-[#0f1f4d] font-semibold text-sm">{t.home.badgeSetup}</span>
                </div>
                <div className="bg-white border border-[#cbd5e1] rounded-full px-4 py-2 shadow-sm">
                  <span className="text-[#0f1f4d] font-semibold text-sm">{t.home.badgeMaintenance}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="px-8 py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {t.home.ctaLaunch} <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="px-8 py-4 text-[#0f1f4d] font-semibold text-sm rounded-lg border-2 border-[#0f1f4d] hover:bg-[#0f1f4d] hover:text-white transition-all"
                >
                  {t.home.ctaTalk}
                </button>
              </div>
            </div>

            {/* ── Right Column: What's Included Cards ── */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-white border border-[#e2edf7] rounded-2xl p-6 hover:shadow-lg transition-all" style={{ boxShadow: '0 4px 24px rgba(14,165,233,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(14,165,233,0.12)' }}>
                    <Code className="text-[#0ea5e9] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0f1f4d] font-bold text-lg mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.card1Title}</h3>
                    <p className="text-[#64748b] text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.home.card1Desc}</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#e2edf7] rounded-2xl p-6 hover:shadow-lg transition-all" style={{ boxShadow: '0 4px 24px rgba(14,165,233,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(14,165,233,0.12)' }}>
                    <Mail className="text-[#0ea5e9] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0f1f4d] font-bold text-lg mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.card2Title}</h3>
                    <p className="text-[#64748b] text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.home.card2Desc}</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-[#e2edf7] rounded-2xl p-6 hover:shadow-lg transition-all" style={{ boxShadow: '0 4px 24px rgba(14,165,233,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(14,165,233,0.12)' }}>
                    <ShieldCheck className="text-[#0ea5e9] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0f1f4d] font-bold text-lg mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.card3Title}</h3>
                    <p className="text-[#64748b] text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.home.card3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-[#e2edf7] rounded-2xl p-6 hover:shadow-lg transition-all" style={{ boxShadow: '0 4px 24px rgba(14,165,233,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(14,165,233,0.12)' }}>
                    <Languages className="text-[#0ea5e9] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0f1f4d] font-bold text-lg mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.card4Title}</h3>
                    <p className="text-[#64748b] text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.home.card4Desc}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="bg-white border-t border-b border-[#e2edf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-base text-[#0f1f4d]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <span className="flex items-center gap-2">
              <Clock className="text-[#0ea5e9] h-5 w-5" />
              {t.home.trust1}
            </span>
            <span className="text-[#cbd5e1]">·</span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#0ea5e9] h-5 w-5" />
              {t.home.trust2}
            </span>
            <span className="text-[#cbd5e1]">·</span>
            <span className="flex items-center gap-2">
              <Lock className="text-[#0ea5e9] h-5 w-5" />
              {t.home.trust3}
            </span>
            <span className="text-[#cbd5e1]">·</span>
            <span className="flex items-center gap-2">
              <Mail className="text-[#0ea5e9] h-5 w-5" />
              {t.home.trust4}
            </span>
          </div>
        </div>
      </div>

      {/* ── Why Smart Businesses Choose Us ── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0f1f4d 0%, #1a3a6b 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#f97316] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              {t.home.smartChoiceTag}
            </span>
            <h2 className="text-4xl lg:text-[3rem] font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.home.smartChoiceTitle}
            </h2>
            <p className="text-[#94a3b8] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.home.smartChoiceSub}
            </p>
          </div>

          {/* ROW 1: What's Always Free Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Card 1: Domain */}
            <div 
              className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative"
              style={{ 
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1 rounded-full">{t.home.free}</span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(14, 165, 233, 0.15)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.domainTitle}</h3>
              <p className="text-[#94a3b8] text-sm mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.domainDesc}
              </p>
              <div className="h-0.5 w-12 bg-[#f97316] rounded-full" />
            </div>

            {/* Card 2: Business Email */}
            <div 
              className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative"
              style={{ 
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1 rounded-full">{t.home.free}</span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(14, 165, 233, 0.15)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.emailTitle}</h3>
              <p className="text-[#94a3b8] text-sm mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.emailDesc}
              </p>
              <div className="h-0.5 w-12 bg-[#f97316] rounded-full" />
            </div>

            {/* Card 3: Web Hosting + SSL */}
            <div 
              className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative"
              style={{ 
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1 rounded-full">{t.home.free}</span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(14, 165, 233, 0.15)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.hostingTitle}</h3>
              <p className="text-[#94a3b8] text-sm mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.hostingDesc}
              </p>
              <div className="h-0.5 w-12 bg-[#f97316] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Work Portfolio Section ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0f1f4d] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              {t.home.portfolioTag}
            </span>
            <h2 className="text-4xl lg:text-[3rem] font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.home.portfolioTitle}
            </h2>
            <p className="text-[#64748b] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.home.portfolioSub}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1: PyPyCode.com */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/ppc/ppc_homepage.jpg" alt="PyPyCode.com Website" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.home.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.home.catTech}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>PyPyCode.com</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.liveIn5}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="https://pypycode.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.home.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 2: Mavi Collision Center */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/mcc/mcc_homepage.jpg" alt="Mavi Collision Center Website" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.home.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.home.catAuto}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Mavi Collision Center</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.liveIn6}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="https://mavicollisioncenter.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.home.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 3: KidBuzz Daily */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/kbd/kbd_homepage.jpg" alt="Kid Buzz Daily Website" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.home.delivered}</span>
              </div>
              <div className="p-5">
                <span className="inline-block bg-[#f0f7ff] text-[#0ea5e9] text-xs font-semibold px-3 py-1 rounded-full mb-3">{t.home.catKids}</span>
                <h3 className="text-[#0f1f4d] font-bold text-lg mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Kid Buzz Daily</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.pages10}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.customEmail}</span>
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs px-2 py-1 rounded-full">{t.home.liveIn4}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f97316] font-bold text-lg">$300</span>
                  <a href="https://kidbuzzdaily.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.home.viewSite}</a>
                </div>
              </div>
            </div>

          </div>

          {/* Portfolio CTA */}
          <div className="text-center">
            <h3 className="text-[#0f1f4d] font-bold text-xl mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.home.portfolioCtaTitle}
            </h3>
            <p className="text-[#64748b] mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.home.portfolioCtaSub}
            </p>
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-sm rounded-lg transition-all shadow-lg flex items-center gap-2 mx-auto"
            >
              {t.home.startMySite} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Section ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0f1f4d] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              {t.home.whyChooseTag}
            </span>
            <h2 className="text-[42px] font-extrabold text-[#0f1f4d] max-w-[700px] mx-auto mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.home.whyChooseTitle}
            </h2>
            <p className="text-[#64748b] text-[18px] mt-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.home.whyChooseSub}
            </p>
          </div>

          {/* 8-Tile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {/* Tile 1: Turnaround */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#f97316]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile1Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile1Desc}
              </p>
            </div>

            {/* Tile 2: Infrastructure */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#0ea5e9]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile2Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile2Desc}
              </p>
            </div>

            {/* Tile 3: Software */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#6366f1]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#6366f1" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile3Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile3Desc}
              </p>
            </div>

            {/* Tile 4: Pricing */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#10b981]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile4Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile4Desc}
              </p>
            </div>

            {/* Tile 5: Email */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#f97316]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile5Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile5Desc}
              </p>
            </div>

            {/* Tile 6: Updates */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#0ea5e9]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile6Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile6Desc}
              </p>
            </div>

            {/* Tile 7: Design */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#6366f1]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#6366f1" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile7Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile7Desc}
              </p>
            </div>

            {/* Tile 8: Ownership */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#10b981]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile8Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile8Desc}
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 rounded-[24px] p-10 flex flex-col md:flex-row justify-between items-center gap-6" style={{ background: 'linear-gradient(135deg, #0f1f4d 0%, #1a3a6b 100%)' }}>
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-[26px]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t.home.bannerTitle}
              </h3>
              <p className="text-[#94a3b8] text-[15px] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.bannerSub}
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-[16px] rounded-xl transition-all hover:scale-[1.02] w-full md:w-auto"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {t.home.bannerCta}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
