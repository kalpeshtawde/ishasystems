import React from 'react';
import { useLanguage } from '../i18n';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacyPage;

  return (
    <div className="min-h-screen bg-[#F1F6F9] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {p.title}
          </h1>
          <p className="text-[#64748b] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {p.subtitle}
          </p>
          <p className="text-sm text-[#94a3b8] mt-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {p.effective}
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-[#334155]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.introTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.introText1}</p>
            <p className="leading-relaxed">{p.introText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.collectTitle}</h2>
            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.collectYouTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.collectYouText}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              {p.collectYouItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.collectAutoTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.collectAutoText}</p>
            <ul className="list-disc pl-6 space-y-1">
              {p.collectAutoItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.useTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.useText}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              {p.useItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="leading-relaxed">{p.useNoSell}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.infraTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.infraText1}</p>
            <p className="leading-relaxed">{p.infraText2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.sharingTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.sharingText}</p>
            <ul className="list-disc pl-6 space-y-1">
              {p.sharingItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.retentionTitle}</h2>
            <p className="leading-relaxed">{p.retentionText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.rightsTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.rightsText}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              {p.rightsItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="leading-relaxed">
              {p.rightsContact} <a href="mailto:support@ishasystems.com" className="text-[#f97316] hover:underline">support@ishasystems.com</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.cookiesTitle}</h2>
            <p className="leading-relaxed">{p.cookiesText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.childrenTitle}</h2>
            <p className="leading-relaxed">{p.childrenText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.changesTitle}</h2>
            <p className="leading-relaxed">{p.changesText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.contactTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.contactText}</p>
            <ul className="list-none space-y-1">
              <li><strong>{p.emailLabel}</strong> <a href="mailto:support@ishasystems.com" className="text-[#f97316] hover:underline">support@ishasystems.com</a></li>
              <li><strong>{p.websiteLabel}</strong> ishasystems.com</li>
              <li><strong>{p.businessLabel}</strong> ISHA Systems LLC</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
