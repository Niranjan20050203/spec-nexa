import React from 'react';
import { ShieldCheck, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white mb-3">
          About SPEC NEXA
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          AI-Powered Laptop Intelligence & Smart Buyer Recommendation System tailored exclusively for the Indian market.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-300">
        <div className="p-8 rounded-3xl bg-surface border border-border">
          <h2 className="text-xl font-bold font-outfit text-white mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Our Core Mission</span>
          </h2>
          <p className="mb-4">
            Buying a laptop in India is often overwhelming due to conflicting processor generations, deceptive TDP power limits, soldered RAM configurations, and erratic pricing across retailers.
          </p>
          <p>
            SPEC NEXA solves this by combining deterministic multi-dimensional scoring (usage suitability, thermal design, RAM expansion, structural durability) with Google Gemini AI intelligence, providing transparent recommendations priced strictly in Indian Rupees (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="text-base font-bold font-outfit text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>India-First Architecture</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We exclusively list Indian retail stock (Amazon.in, Flipkart, Croma, Reliance Digital, and official brand stores) with authentic Indian warranties. We never convert foreign USD prices or link to international storefronts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="text-base font-bold font-outfit text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Durability Intelligence</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every laptop is evaluated for chassis rigidity, hinge resistance, thermal heat pipes, and MIL-STD-810H certifications so your investment withstands 3-5 years of Indian commutes and climate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
