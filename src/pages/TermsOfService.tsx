import React from 'react';
import { useLanguage } from '../i18n';

export const TermsOfService: React.FC = () => {
  const { t } = useLanguage();
  const p = t.termsPage;

  return (
    <div className="min-h-screen bg=[F1F6F9] py-16 px4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f1f4d] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {p.title}
          </h1>
          <p className="text-[(#64748b] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {p.subtitle}
          </p>
          <p className="text-sm text-[(#94a3b8] mt-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {p.effective}
          </p>
        </div>

        <div className="prose prose-slte max-w-none text-[#334155]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.agreementTitle}</h2>
            <p className="leading-relaxed">{p.agreementText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.servicesTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.servicesText}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              {p.servicesItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="leading-relaxed">{p.servicesExtra}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.feesTitle}</h2>
            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.setupFeeTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.setupFeeText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.monthlyFeeTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.monthlyFeeText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.extraWorkTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.extraWorkText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.latePaymentTitle}</h3>
            <p className="leading-relaxed">{p.latePaymentText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.ownershipTitle}</h2>
            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.domainTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.domainText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.codeTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.codeText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.infraTitle}</h3>
            <p className="leading-relaxed">{p.infraText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.clientRespTitle}</h2>
            <p className="mb-4 leading-relaxed">{p.clientRespText}</p>
            <ul className="list-disc pl-6 space-y-1">
              {p.clientRespItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.timelineTitle}</h2>
            <p className="leading-relaxed">{p.timelineText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.terminationTitle}</h2>
            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.termClientTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.termClientText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.termCompanyTitle}</h3>
            <p className="mb-4 leading-relaxed">{p.termCompanyText}</p>

            <h3 className="text-lg font-semibold text-[#0f1f4d] mb-2">{p.termEffectTitle}</h3>
            <p className="leading-relaxed">{p.termEffectText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.liabilityTitle}</h2>
            <p className="leading-relaxed">{p.liabilityText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.disclaimersTitle}</h2>
            <p className="leading-relaxed">{p.disclaimersText}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#0f1f4d] mb-3">{p.governingTitle}</h2>
            <p className="leading-relaxed">{p.governingText}</p>
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
