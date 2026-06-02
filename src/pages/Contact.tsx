import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Loader2, Calendar, Mail, MessageSquare, Lock } from 'lucide-react';
import { useLanguage } from '../i18n';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      businessName: String(fd.get('businessName') || ''),
      yourName: String(fd.get('yourName') || ''),
      yourEmail: String(fd.get('yourEmail') || ''),
      phone: String(fd.get('phone') || ''),
      businessDo: String(fd.get('businessDo') || ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error('Request failed');
      setSubmitted(true);
      form.reset();
    } catch {
      setError(t.contact.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="py-16" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f0fffe 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
            {t.contact.tag}
          </span>
          <h1 className="text-[48px] font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t.contact.title}
          </h1>
          <p className="text-[#64748b] text-[18px] max-w-[520px] mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {t.contact.sub}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <span className="inline-flex items-center gap-2 bg-white border border-[#e2edf7] rounded-full px-4 py-2 text-sm text-[#64748b] shadow-sm">
              {t.contact.pill1}
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-[#e2edf7] rounded-full px-4 py-2 text-sm text-[#64748b] shadow-sm">
              {t.contact.pill2}
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-[#e2edf7] rounded-full px-4 py-2 text-sm text-[#64748b] shadow-sm">
              {t.contact.pill3}
            </span>
          </div>
          <p className="text-[#64748b] text-sm mt-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <a href="#pricing" className="text-[#0ea5e9] font-semibold hover:text-[#f97316] transition-colors underline">{t.contact.linkSeeIncluded}</a>
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
        <div className="rounded-[24px] overflow-hidden border border-[#e2edf7]" style={{ boxShadow: '0 20px 60px rgba(15,31,77,0.12)' }}>
          <div className="flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="md:w-[35%] p-12 flex flex-col justify-between" style={{ background: 'linear-gradient(160deg, #0f1f4d 0%, #1a3a6b 100%)' }}>
              <div>
                <h3 className="text-white font-bold text-[22px] mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t.contact.whatNext}
                </h3>
                
                {/* Step 1 */}
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: '1.5px solid rgba(249,115,22,0.5)' }}>
                    <span className="text-[#f97316] font-bold text-[14px]">1</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[15px]">{t.contact.step1Title}</div>
                    <div className="text-[#94a3b8] text-[13px] mt-1 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {t.contact.step1Desc}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: '1.5px solid rgba(249,115,22,0.5)' }}>
                    <span className="text-[#f97316] font-bold text-[14px]">2</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[15px]">{t.contact.step2Title}</div>
                    <div className="text-[#94a3b8] text-[13px] mt-1 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {t.contact.step2Desc}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: '1.5px solid rgba(249,115,22,0.5)' }}>
                    <span className="text-[#f97316] font-bold text-[14px]">3</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[15px]">{t.contact.step3Title}</div>
                    <div className="text-[#94a3b8] text-[13px] mt-1 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {t.contact.step3Desc}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="h-px my-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="text-[#94a3b8] text-xs tracking-widest mb-3">{t.contact.includedTitle}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span className="text-[#f97316]">✓</span> {t.contact.inc1}
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span className="text-[#f97316]">✓</span> {t.contact.inc2}
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span className="text-[#f97316]">✓</span> {t.contact.inc3}
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span className="text-[#f97316]">✓</span> {t.contact.inc4}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="md:w-[65%] bg-white p-12">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="text-emerald-500 h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-[#64748b] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {t.contact.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-[#0f1f4d] font-bold text-[20px] mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {t.contact.formTitle}
                  </h3>

                  <div className="mb-[18px]">
                    <label className="block text-[13px] font-semibold text-[#374151] mb-2" style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}>
                      {t.contact.businessName}
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      placeholder={t.contact.businessNamePh}
                      className="w-full p-3 rounded-[10px] text-[15px] focus:outline-none transition-all"
                      style={{
                        border: '1.5px solid #e2edf7',
                        background: '#f8fafc',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0ea5e9';
                        e.target.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2edf7';
                        e.target.style.background = '#f8fafc';
                      }}
                    />
                  </div>

                  <div className="mb-[18px]">
                    <label className="block text-[13px] font-semibold text-[#374151] mb-2" style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}>
                      {t.contact.yourName}
                    </label>
                    <input
                      type="text"
                      name="yourName"
                      required
                      placeholder={t.contact.yourNamePh}
                      className="w-full p-3 rounded-[10px] text-[15px] focus:outline-none transition-all"
                      style={{
                        border: '1.5px solid #e2edf7',
                        background: '#f8fafc',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0ea5e9';
                        e.target.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2edf7';
                        e.target.style.background = '#f8fafc';
                      }}
                    />
                  </div>

                  <div className="mb-[18px]">
                    <label className="block text-[13px] font-semibold text-[#374151] mb-2" style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}>
                      {t.contact.yourEmail}
                    </label>
                    <input
                      type="email"
                      name="yourEmail"
                      required
                      placeholder={t.contact.yourEmailPh}
                      className="w-full p-3 rounded-[10px] text-[15px] focus:outline-none transition-all"
                      style={{
                        border: '1.5px solid #e2edf7',
                        background: '#f8fafc',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0ea5e9';
                        e.target.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2edf7';
                        e.target.style.background = '#f8fafc';
                      }}
                    />
                  </div>

                  <div className="mb-[18px]">
                    <label className="block text-[13px] font-semibold text-[#374151] mb-2" style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}>
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.contact.phonePh}
                      className="w-full p-3 rounded-[10px] text-[15px] focus:outline-none transition-all"
                      style={{
                        border: '1.5px solid #e2edf7',
                        background: '#f8fafc',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0ea5e9';
                        e.target.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2edf7';
                        e.target.style.background = '#f8fafc';
                      }}
                    />
                  </div>

                  <div className="mb-[18px]">
                    <label className="block text-[13px] font-semibold text-[#374151] mb-2" style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}>
                      {t.contact.businessDo}
                    </label>
                    <textarea
                      rows={4}
                      name="businessDo"
                      required
                      placeholder={t.contact.businessDoPh}
                      className="w-full p-3 rounded-[10px] text-[15px] focus:outline-none transition-all resize-none"
                      style={{
                        border: '1.5px solid #e2edf7',
                        background: '#f8fafc',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif',
                        height: '120px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0ea5e9';
                        e.target.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2edf7';
                        e.target.style.background = '#f8fafc';
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-[17px] rounded-[12px] transition-all flex items-center justify-center gap-2 disabled:bg-orange-400"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> {t.contact.sending}</>
                    ) : (
                      <>{t.contact.sendRequest} <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>

                  {error && (
                    <div className="mt-4 text-center text-[14px] text-red-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-4 text-[#94a3b8] text-[13px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    <Lock className="h-4 w-4" />
                    {t.contact.privacy}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Alternative Tiles */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tile 1 */}
          <div className="bg-white border border-[#e2edf7] rounded-[16px] p-6 text-center" style={{ boxShadow: '0 2px 12px rgba(15,31,77,0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(14,165,233,0.1)' }}>
              <Calendar className="text-[#0ea5e9] h-6 w-6" />
            </div>
            <h3 className="text-[#0f1f4d] font-bold text-[16px] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.contact.prefCallTitle}
            </h3>
            <p className="text-[#64748b] text-[14px] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.contact.prefCallDesc}
            </p>
            <a href="#" className="text-[#f97316] font-semibold text-[14px] hover:underline" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.contact.prefCallLink}
            </a>
          </div>

          {/* Tile 2 */}
          <div className="bg-white border border-[#e2edf7] rounded-[16px] p-6 text-center" style={{ boxShadow: '0 2px 12px rgba(15,31,77,0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(14,165,233,0.1)' }}>
              <Mail className="text-[#0ea5e9] h-6 w-6" />
            </div>
            <h3 className="text-[#0f1f4d] font-bold text-[16px] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.contact.emailUsTitle}
            </h3>
            <p className="text-[#64748b] text-[14px] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.contact.emailUsDesc}
            </p>
            <a href="mailto:support@ishasystems.com" className="text-[#f97316] font-semibold text-[14px] hover:underline" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              support@ishasystems.com
            </a>
          </div>

          {/* Tile 3 */}
          <div className="bg-white border border-[#e2edf7] rounded-[16px] p-6 text-center" style={{ boxShadow: '0 2px 12px rgba(15,31,77,0.05)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(14,165,233,0.1)' }}>
              <MessageSquare className="text-[#0ea5e9] h-6 w-6" />
            </div>
            <h3 className="text-[#0f1f4d] font-bold text-[16px] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.contact.quickQTitle}
            </h3>
            <p className="text-[#64748b] text-[14px] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.contact.quickQDesc}
            </p>
            <a href="#" className="text-[#f97316] font-semibold text-[14px] hover:underline" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.contact.quickQLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
