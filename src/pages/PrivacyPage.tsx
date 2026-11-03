import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black font-outfit text-white mb-6">Privacy Policy</h1>
      <div className="bg-surface border border-border rounded-3xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <p>
          At SPEC NEXA, your privacy is paramount. This policy describes how we collect, store, and utilize your information when using our recommendation platform.
        </p>

        <h3 className="text-base font-bold text-white">1. Information We Collect</h3>
        <p>
          We do not require account registration to receive laptop recommendations. Questionnaire answers (budget preferences, intended workloads, hardware needs) are processed locally in your session.
        </p>

        <h3 className="text-base font-bold text-white">2. Retailer Links & Affiliate Transparency</h3>
        <p>
          SPEC NEXA provides direct product search links to verified Indian retailers (Amazon.in, Flipkart, Croma, Reliance Digital). When clicking an external link, you are directed to legitimate merchant domains.
        </p>

        <h3 className="text-base font-bold text-white">3. Contact</h3>
        <p>
          For questions or data deletion requests, contact privacy@specnexa.in.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
