import React from 'react';
import { ArrowRight, Clock, CheckCircle2, Lock, Gift, Check } from 'lucide-react';
import { useLanguage } from '../i18n';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();
  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '550px' }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Gradient Overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 70%, transparent 85%)'
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ minHeight: '550px' }}>
          <div style={{ 
            maxWidth: '550px',
            padding: '3rem 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '550px'
          }}>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2" style={{
              background: '#e8f5f0',
              borderRadius: '20px',
              padding: '5px 12px',
              marginBottom: '24px',
              width: 'fit-content'
            }}>
              <div style={{ width: '6px', height: '6px', background: '#1D9E75', borderRadius: '50%' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500, color: '#0F6E56' }}>{t.home.heroBadgeNew}</span>
            </div>

            {/* Main headline */}
            <h1 style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif', 
              fontWeight: 700, 
              fontSize: '36px',
              lineHeight: 1.2, 
              color: '#1a1f2e',
              marginBottom: '16px'
            }}>
              {t.home.heroHeadlineNew}
            </h1>

            {/* Subheadline */}
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '17px',
              color: '#1a1a1a',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              {t.home.heroSubheadlineNew}
            </p>

            {/* Pricing */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#777777', marginBottom: '6px' }}>
                {t.home.heroPricingLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '42px', fontWeight: 700, color: '#C84B2D' }}>$29.99</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#888888' }}>{t.home.heroPricePerMo}</span>
              </div>
            </div>

            {/* Bullet points - 2 column grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 24px',
              marginBottom: '24px'
            }}>
              {[t.home.heroBullet1, t.home.heroBullet2, t.home.heroBullet3, t.home.heroBullet4].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#e8f5f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check style={{ width: '12px', height: '12px', color: '#1D9E75', strokeWidth: 3 }} />
                  </div>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13.5px', color: '#444444' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Ownership callout box */}
            <div style={{
              background: '#ffffff',
              border: '0.5px solid #dddddd',
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '24px'
            }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12.5px', color: '#666666' }}>
                <strong style={{ color: '#1a1f2e' }}>{t.home.heroOwnershipTitle}</strong> {t.home.heroOwnershipText}
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setCurrentTab('contact')}
              style={{
                background: '#C84B2D',
                color: '#ffffff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.5px',
                padding: '13px 28px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                width: 'fit-content',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#b54328';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#C84B2D';
              }}
            >
              {t.home.heroCtaButton}
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div style={{ background: '#ffffff', borderTop: '0.5px solid #eeeeee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-14" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <span className="flex items-center gap-2" style={{ fontSize: '16px', color: '#444444' }}>
              <Clock style={{ width: '16px', height: '16px', color: '#1D9E75' }} />
              {t.home.trustBarDelivered}
            </span>
            <span className="flex items-center gap-2" style={{ fontSize: '16px', color: '#444444' }}>
              <Gift style={{ width: '16px', height: '16px', color: '#1D9E75' }} />
              {t.home.trustBarSetupFee}
            </span>
            <span className="flex items-center gap-2" style={{ fontSize: '16px', color: '#444444' }}>
              <Lock style={{ width: '16px', height: '16px', color: '#1D9E75' }} />
              {t.home.trustBarCancel}
            </span>
            <span className="flex items-center gap-2" style={{ fontSize: '16px', color: '#444444' }}>
              <CheckCircle2 style={{ width: '16px', height: '16px', color: '#1D9E75' }} />
              {t.home.trustBarFree}
            </span>
          </div>
        </div>
      </div>

      {/* ── Video Section (Hidden temporarily) ── */}
      {/* <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#f97316] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              {t.home.videoTag}
            </span>
            <h2 className="text-4xl lg:text-[3rem] font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.home.videoTitle}
            </h2>
            <p className="text-[#64748b] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.home.videoSub}
            </p>
          </div>

          <div className="flex justify-center">
            <div
              className="relative w-full max-w-[460px] rounded-2xl overflow-hidden bg-black"
              style={{ aspectRatio: '9 / 16', boxShadow: '0 12px 40px rgba(15,31,77,0.18)' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/MLvlqVOEbR0?rel=0&modestbranding=1"
                title="Isha Systems"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: '22%',
                  background: 'linear-gradient(to bottom, #050a16 0%, #050a16 80%, rgba(5,10,22,0) 100%)',
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Why Smart Businesses Choose Us ── */}
      <section 
        className="py-24"
        style={{ 
          backgroundImage: 'url(/why-pay-more-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
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

          {/* Comparison Grid */}
          <div className="max-w-5xl mx-auto overflow-x-auto" style={{ paddingTop: '16px' }}>
            <div style={{ minWidth: 'min(640px, 100%)', display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr', rowGap: '0', columnGap: '0', position: 'relative' }}>

              {/* ── Header Row ── */}
              <div style={{ padding: '20px clamp(8px, 2.2vw, 24px)' }} />
              <div style={{
                padding: '20px 24px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(14,165,233,0.12) 100%)',
                paddingLeft: 'clamp(8px, 2.2vw, 24px)',
                paddingRight: 'clamp(8px, 2.2vw, 24px)',
                borderTop: '1.5px solid rgba(16,185,129,0.6)',
                borderLeft: '1.5px solid rgba(16,185,129,0.6)',
                borderRight: '1.5px solid rgba(16,185,129,0.6)',
                borderTopLeftRadius: '18px',
                borderTopRightRadius: '18px',
                position: 'relative',
                boxShadow: '0 -8px 30px rgba(16,185,129,0.10)'
              }}>
                <span style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: '#10b981', color: 'white', fontSize: '10px', fontWeight: 800,
                  letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px',
                  borderRadius: '100px', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.4)'
                }}>★ Best Value</span>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '18px', color: 'white', marginTop: '4px' }}>Isha Systems</div>
              </div>
              <div style={{ padding: '20px clamp(8px, 2.2vw, 24px)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(15px, 4vw, 18px)', color: '#c8d4e6' }}>Squarespace</div>
              </div>
              <div style={{ padding: '20px clamp(8px, 2.2vw, 24px)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(15px, 4vw, 18px)', color: '#c8d4e6' }}>Wix / Agencies</div>
              </div>

              {/* ── Data Rows ── */}
              {[
                { feature: t.home.domainTitle, square: '$20/yr', wix: '$15/yr' },
                { feature: t.home.seoTitle, square: '$500+/yr', wix: '$500+/yr' },
                { feature: t.home.sslTitle, square: '$100/yr', wix: '$100/yr' },
                { feature: t.home.emailTitle, square: '$96/yr', wix: '$60/yr' },
                { feature: t.home.hostingTitle, square: '$200+/yr', wix: '$200+/yr' },
              ].map((row, i, arr) => {
                const isLast = i === arr.length - 1;
                return (
                  <React.Fragment key={row.feature}>
                    {/* Feature name */}
                    <div style={{
                      padding: '22px clamp(8px, 2.2vw, 24px)',
                      display: 'flex',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(15px, 4vw, 18px)',
                      color: '#ffffff'
                    }}>{row.feature}</div>

                    {/* Isha Systems (highlighted) */}
                    <div style={{
                      padding: '22px clamp(8px, 2.2vw, 24px)',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(14,165,233,0.07) 100%)',
                      borderLeft: '1.5px solid rgba(16,185,129,0.6)',
                      borderRight: '1.5px solid rgba(16,185,129,0.6)',
                      borderTop: '1px solid rgba(16,185,129,0.25)',
                      borderBottom: isLast ? '1.5px solid rgba(16,185,129,0.6)' : 'none',
                      borderBottomLeftRadius: isLast ? '18px' : '0',
                      borderBottomRightRadius: isLast ? '18px' : '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <CheckCircle2 className="h-5 w-5" style={{ color: '#34d399' }} strokeWidth={2.5} />
                      <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 900, fontSize: '17px', color: '#34d399', letterSpacing: '0.02em' }}>{t.home.free}</span>
                    </div>

                    {/* Squarespace */}
                    <div style={{
                      padding: '22px clamp(8px, 2.2vw, 24px)',
                      textAlign: 'center',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 'clamp(14px, 3.8vw, 17px)',
                      fontWeight: 600,
                      color: '#d0dae8'
                    }}>{row.square}</div>

                    {/* Wix / Agencies */}
                    <div style={{
                      padding: '22px clamp(8px, 2.2vw, 24px)',
                      textAlign: 'center',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 'clamp(14px, 3.8vw, 17px)',
                      fontWeight: 600,
                      color: '#d0dae8'
                    }}>{row.wix}</div>
                  </React.Fragment>
                );
              })}
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
                <img src="/ppc/ppc_homepage.jpg" alt="PyPyCode.com — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
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
                  <a href="https://pypycode.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.home.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 2: Mavi Collision Center */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/mcc/mcc_homepage.jpg" alt="Mavi Collision Center — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
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
                  <a href="https://mavicollisioncenter.com" target="_blank" rel="noopener noreferrer" className="text-[#0f1f4d] font-semibold text-sm hover:text-[#f97316] transition-colors cursor-pointer">{t.home.viewSite}</a>
                </div>
              </div>
            </div>

            {/* Card 3: KidBuzz Daily */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ boxShadow: '0 4px 24px rgba(15,31,77,0.08)', border: '1px solid #e2edf7' }}>
              <div className="h-60 relative overflow-hidden">
                <img src="/kbd/kbd_homepage.jpg" alt="Kid Buzz Daily — affordable small business website designed by ISHA Systems LLC" loading="lazy" className="w-full h-full object-cover" />
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
            {/* Row 1, Tile 1: Turnaround */}
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

            {/* Row 1, Tile 2: SEO */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#10b981]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tileSeoTitle}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tileSeoDesc}
              </p>
            </div>

            {/* Row 1, Tile 3: Infrastructure */}
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

            {/* Row 1, Tile 4: Software */}
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

            {/* Row 2, Tile 1: Pricing */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#f97316]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile4Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile4Desc}
              </p>
            </div>

            {/* Row 2, Tile 2: Email */}
            <div className="bg-white border border-[#e2edf7] rounded-[20px] p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: '0 12px 40px rgba(15,31,77,0.10)' }}>
              <div className="absolute top-0 left-0 w-[3px] h-[40px] bg-[#0ea5e9]" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.10)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3 className="text-[#0f1f4d] font-bold text-[17px] mt-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.home.tile5Title}</h3>
              <p className="text-[#64748b] text-[14px] mt-2 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.home.tile5Desc}
              </p>
            </div>

            {/* Row 2, Tile 3: Design */}
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

            {/* Row 2, Tile 4: Ownership */}
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
