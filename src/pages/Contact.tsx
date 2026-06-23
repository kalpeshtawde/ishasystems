import React, { useState } from 'react';
import { CheckCircle2, Loader2, Phone, Mail } from 'lucide-react';
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
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e2edf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748b' }}>
            <a href="#home" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>Home</a> <span style={{ margin: '0 8px' }}>›</span> <span style={{ color: '#0f1f4d', fontWeight: 600 }}>Contact Us</span>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <div className="text-[#64748b] text-xs font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.contact.getInTouch}
              </div>
              <h1 className="text-[40px] font-bold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t.contact.title}
              </h1>
              <p className="text-[#64748b] text-[16px] mb-10" style={{ fontFamily: 'DM Sans, sans-serif', lineHeight: 1.6 }}>
                {t.contact.sub}
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#f0f7ff' }}>
                      <Phone className="h-5 w-5 text-[#0f1f4d]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[#0f1f4d] font-bold text-[17px] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.contact.phoneLabel}</div>
                    <a href="tel:+14047020806" className="text-[#64748b] text-[16px] hover:text-[#f97316] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      +1 404-702-0806
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#f0f7ff' }}>
                      <Mail className="h-5 w-5 text-[#0f1f4d]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[#0f1f4d] font-bold text-[17px] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.contact.emailLabel}</div>
                    <a href="mailto:support@ishasystems.com" className="text-[#64748b] text-[16px] hover:text-[#f97316] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      support@ishasystems.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="rounded-2xl p-8" style={{ background: '#f0f7ff' }}>
              <h2 className="text-[#0f1f4d] font-bold text-[24px] mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t.contact.getInTouchTitle}
              </h2>

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
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        name="yourName"
                        required
                        placeholder={t.contact.yourNamePlaceholder}
                        className="w-full p-3 rounded-lg text-[14px] focus:outline-none transition-all"
                        style={{
                          border: '1px solid #d1e3f8',
                          background: 'white',
                          color: '#0f1f4d',
                          fontFamily: 'DM Sans, sans-serif'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#d1e3f8'}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="yourEmail"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full p-3 rounded-lg text-[14px] focus:outline-none transition-all"
                        style={{
                          border: '1px solid #d1e3f8',
                          background: 'white',
                          color: '#0f1f4d',
                          fontFamily: 'DM Sans, sans-serif'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#d1e3f8'}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      name="businessName"
                      placeholder={t.contact.businessNamePlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none transition-all"
                      style={{
                        border: '1px solid #d1e3f8',
                        background: 'white',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1e3f8'}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.contact.phoneNumberPlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none transition-all"
                      style={{
                        border: '1px solid #d1e3f8',
                        background: 'white',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1e3f8'}
                    />
                  </div>

                  <div className="mb-6">
                    <textarea
                      rows={5}
                      name="businessDo"
                      required
                      placeholder={t.contact.writeMessagePlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none transition-all resize-none"
                      style={{
                        border: '1px solid #d1e3f8',
                        background: 'white',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif',
                        height: '140px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1e3f8'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-3 px-6 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-[15px] rounded-lg transition-all flex items-center justify-center gap-2 disabled:bg-blue-400"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <>{t.contact.submitRequest}</>
                    )}
                  </button>

                  {error && (
                    <div className="mt-4 text-center text-[14px] text-red-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {error}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
