import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../i18n';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [years, setYears] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculate costs
  const ishaCost = Math.ceil(29.99 * 12 * years);
  const squarespaceCost = 392 * years;
  const agencyCost = 5400 + (2400 * (years - 1));
  const savings = agencyCost - ishaCost;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e2edf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748b' }}>
            <a href="#home" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>Home</a> <span style={{ margin: '0 8px' }}>›</span> <span style={{ color: '#0f1f4d', fontWeight: 600 }}>Pricing</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f0fffe 100%)' }}>
        {/* SECTION 1 — PAGE HEADER */}
        <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}>
            {t.pricing.tag}
          </span>
          <h1 className="text-[52px] font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t.pricing.title}
          </h1>
          <p className="text-[#64748b] text-[18px] max-w-[560px] mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {t.pricing.sub}
          </p>
        </div>
      </div>

      {/* SECTION 2 — PRICING CARDS */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* STARTER PLAN — Website + Logo */}
          <div className="rounded-[28px] overflow-hidden border border-[#e2edf7] bg-white flex flex-col" style={{ boxShadow: '0 8px 32px rgba(15,31,77,0.08)' }}>
            {/* Blue Ribbon */}
            <div className="bg-[#0ea5e9] py-2.5 text-center">
              <span className="text-white text-[14px] font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.starterBadge}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-[28px] font-extrabold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t.pricing.starterTitle}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[56px] font-black text-[#0ea5e9]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t.pricing.starterPrice}
                </span>
              </div>
              <div className="text-[#64748b] text-[15px] mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.starterPriceSub}
              </div>

              <div className="h-px my-6 bg-[#f1f5f9]" />

              <div className="text-xs font-bold tracking-widest text-[#94a3b8] mb-4">{t.pricing.includedTitle}</div>
              
              {t.pricing.starterFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-[#0ea5e9] flex items-center justify-center flex-shrink-0">
                    <Check className="text-white h-3 w-3" />
                  </div>
                  <span className="text-[#0f1f4d] text-[15px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item}
                  </span>
                </div>
              ))}

              <div className="mt-auto pt-6">
                <a
                  href="#contact"
                  className="block w-full py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-[17px] rounded-[14px] transition-all text-center"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,165,233,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {t.pricing.starterCta} <ArrowRight className="inline h-4 w-4 ml-1" />
                </a>

                <div className="text-center text-[#94a3b8] text-[13px] mt-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {t.pricing.starterNote}
                </div>
              </div>
            </div>
          </div>

          {/* MAIN PLAN — Everything Included */}
          <div className="rounded-[28px] overflow-hidden border border-[#e2edf7] bg-white" style={{ boxShadow: '0 8px 32px rgba(15,31,77,0.08)' }}>
            {/* Green Ribbon */}
            <div className="bg-[#10b981] py-2.5 text-center">
              <span className="text-white text-[14px] font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.badge}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <h3 className="text-[28px] font-extrabold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t.pricing.monthlyLabel}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[56px] font-black text-[#f97316]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t.pricing.monthlyAmount}
                </span>
              </div>
              <div className="text-[#64748b] text-[15px] mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.monthlySub}
              </div>

              <div className="h-px my-6 bg-[#f1f5f9]" />

              <div className="text-xs font-bold tracking-widest text-[#94a3b8] mb-4">{t.pricing.includedTitle}</div>
              
              {t.pricing.features.map((item, index) => (
                <div key={index} className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                    <Check className="text-white h-3 w-3" />
                  </div>
                  <span className="text-[#0f1f4d] text-[15px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item}
                  </span>
                </div>
              ))}

              <a
                href="#contact"
                className="block w-full py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-[17px] rounded-[14px] transition-all mt-6 text-center"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t.pricing.claimButton} <ArrowRight className="inline h-4 w-4 ml-1" />
              </a>

              <div className="flex items-center justify-center gap-2 text-[#94a3b8] text-[13px] mt-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <Lock className="h-4 w-4" />
                {t.pricing.noPayment}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — SAVINGS CALCULATOR */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-[36px] font-extrabold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t.pricing.calcTitle}
          </h2>
          <p className="text-[#64748b] text-[16px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {t.pricing.calcSub}
          </p>
        </div>

        <div className="bg-white rounded-[24px] border border-[#e2edf7] p-5 sm:p-10" style={{ boxShadow: '0 8px 32px rgba(15,31,77,0.08)' }}>
          <label className="block text-[#374151] text-[15px] font-semibold mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {t.pricing.calcLabel}
          </label>
          
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-[#e2edf7] rounded-lg appearance-none cursor-pointer accent-[#f97316]"
          />
          
          <div className="flex justify-between mt-2 text-[#94a3b8] text-[12px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {[1, 2, 3, 4, 5].map(year => (
              <span key={year}>{year}{t.pricing.yearShort}</span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8">
            {/* ISHA SYSTEMS */}
            <div className="bg-[#fff7ed] border-2 border-[#f97316] rounded-[16px] p-3 sm:p-6 text-center">
              <div className="text-[#f97316] text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest mb-2">ISHA SYSTEMS</div>
              <div className="font-bold text-[#0f1f4d]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(18px, 5.2vw, 40px)' }}>
                ${ishaCost.toLocaleString()}
              </div>
              <div className="text-[#64748b] text-[13px] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.totalOver} {years} {years > 1 ? t.pricing.years : t.pricing.year}
              </div>
              <div className="inline-block mt-2 bg-[#10b981] text-white text-xs font-bold px-3 py-1 rounded-full">
                {t.pricing.youSave} ${savings.toLocaleString()}
              </div>
              <div className="mt-3 text-[#10b981] text-[11px] font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                🔑 Code after 12mo
              </div>
            </div>

            {/* Squarespace */}
            <div className="bg-[#f8fafc] border border-[#e2edf7] rounded-[16px] p-3 sm:p-6 text-center">
              <div className="text-[#94a3b8] text-[10px] sm:text-xs tracking-wider sm:tracking-widest mb-2">SQUARESPACE</div>
              <div className="font-bold text-[#64748b]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(18px, 5.2vw, 40px)' }}>
                ${squarespaceCost.toLocaleString()}
              </div>
              <div className="text-[#94a3b8] text-[13px] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.totalOver} {years} {years > 1 ? t.pricing.years : t.pricing.year}
              </div>
              <div className="text-[#f87171] text-[12px] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.squarespaceNote}
              </div>
            </div>

            {/* Local Agency */}
            <div className="bg-[#f8fafc] border border-[#e2edf7] rounded-[16px] p-3 sm:p-6 text-center">
              <div className="text-[#94a3b8] text-[10px] sm:text-xs tracking-wider sm:tracking-widest mb-2">{t.pricing.agencyName}</div>
              <div className="font-bold text-[#64748b]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(18px, 5.2vw, 40px)' }}>
                ${agencyCost.toLocaleString()}
              </div>
              <div className="text-[#94a3b8] text-[13px] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.totalOver} {years} {years > 1 ? t.pricing.years : t.pricing.year}
              </div>
              <div className="text-[#94a3b8] text-[12px] mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.pricing.agencyNote}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 — FAQ */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-[36px] font-extrabold text-[#0f1f4d] text-center mb-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {t.pricing.faqTitle}
        </h2>

        {t.pricing.faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-[#e2edf7] rounded-[16px] p-6 mb-4 cursor-pointer hover:border-[#0ea5e9] transition-colors"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <span className="text-[#0f1f4d] font-bold text-[16px]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {faq.q}
              </span>
              {openFaq === index ? (
                <ChevronUp className="text-[#0ea5e9] h-5 w-5" />
              ) : (
                <ChevronDown className="text-[#0ea5e9] h-5 w-5" />
              )}
            </div>
            {openFaq === index && (
              <div className="text-[#64748b] text-[15px] mt-3 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM CTA BANNER */}
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="rounded-[24px] p-14 text-center" style={{ background: 'linear-gradient(135deg, #0f1f4d, #1a3a6b)' }}>
          <h2 className="text-[40px] font-extrabold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t.pricing.bottomTitle}
          </h2>
          <p className="text-[#94a3b8] text-[17px] mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {t.pricing.bottomSub}
          </p>
          <button className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-[18px] px-10 py-4 rounded-xl transition-all" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t.pricing.bottomCta} <ArrowRight className="inline h-5 w-5 ml-2" />
          </button>
          <p className="text-[#94a3b8] text-[14px] mt-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <a href="#contact" className="text-[#0ea5e9] font-semibold hover:text-white transition-colors underline">{t.pricing.linkGetStarted}</a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};
