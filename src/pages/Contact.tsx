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

      {/* Main Contact Section with Background Image */}
      <section 
        className="relative min-h-[600px]"
        style={{
          backgroundImage: 'url(/contact-bg.png)',
          backgroundSize: '85% auto',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffffff'
        }}
      >
        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl">
            {/* Header */}
            <div className="text-[#64748b] text-xs font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t.contact.getInTouch}
            </div>
            <h1 className="text-[36px] font-bold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t.contact.title}
            </h1>
            <p className="text-[#64748b] text-[15px] mb-8" style={{ fontFamily: 'DM Sans, sans-serif', lineHeight: 1.6 }}>
              {t.contact.sub}
            </p>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 shadow-lg" style={{ border: '1px solid #e5e7eb' }}>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="text-emerald-500 h-14 w-14 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-[#64748b] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {t.contact.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      name="yourName"
                      required
                      placeholder={t.contact.yourNamePlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    />
                    <input
                      type="email"
                      name="yourEmail"
                      required
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      name="businessName"
                      placeholder={t.contact.businessNamePlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.contact.phoneNumberPlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <textarea
                      rows={4}
                      name="businessDo"
                      required
                      placeholder={t.contact.writeMessagePlaceholder}
                      className="w-full p-3 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      style={{
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        color: '#0f1f4d',
                        fontFamily: 'DM Sans, sans-serif'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#C84B2D] hover:bg-[#b54328] text-white font-semibold text-[15px] rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <>{t.contact.submitRequest}</>
                    )}
                  </button>

                  {error && (
                    <div className="mt-3 text-center text-[13px] text-red-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {error}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="flex flex-wrap gap-8 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-sm">
                  <Phone className="h-5 w-5 text-[#C84B2D]" />
                </div>
                <div>
                  <div className="text-[#0f1f4d] font-semibold text-[16px]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.contact.phoneLabel}</div>
                  <a href="tel:+14047020806" className="text-[#64748b] text-[15px] hover:text-[#C84B2D] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    +1 404-702-0806
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-sm">
                  <Mail className="h-5 w-5 text-[#C84B2D]" />
                </div>
                <div>
                  <div className="text-[#0f1f4d] font-semibold text-[16px]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.contact.emailLabel}</div>
                  <a href="mailto:support@ishasystems.com" className="text-[#64748b] text-[15px] hover:text-[#C84B2D] transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    support@ishasystems.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
