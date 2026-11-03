import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black font-outfit text-white mb-6">Terms and Conditions</h1>
      <div className="bg-surface border border-border rounded-3xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <p>
          Welcome to SPEC NEXA. By accessing our platform, you agree to comply with and be bound by the following terms.
        </p>

        <h3 className="text-base font-bold text-white">1. Retail Pricing Disclaimer</h3>
        <p>
          Laptop prices in India fluctuate frequently based on bank discounts, retailer sales events, and stock levels. SPEC NEXA provides verified benchmark prices in INR, but users must verify current checkout totals on the destination retailer.
        </p>

        <h3 className="text-base font-bold text-white">2. No Financial Advice</h3>
        <p>
          Our recommendations are generated through algorithmic analysis and AI evaluation of public technical specifications. They do not constitute formal commercial warranties.
        </p>

        <h3 className="text-base font-bold text-white">3. Governing Law</h3>
        <p>
          These terms are governed in accordance with the laws of the Republic of India.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
