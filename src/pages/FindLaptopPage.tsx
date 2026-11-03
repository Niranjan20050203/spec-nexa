import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FindLaptopPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>Intelligent Multi-Dimensional Matcher</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-outfit text-white mb-4">
          Find Your Perfect Laptop in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">8 Simple Steps</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-inter">
          Stop guessing between confusing processor names and marketing claims. Our deterministic algorithm pairs with AI to find your top 10 laptop matches in the Indian market.
        </p>
      </motion.div>

      {/* Process Steps Visual */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { step: '01', title: 'Workload & Purpose', desc: 'Programming, Gaming, Video Editing, AI/ML, or Everyday college use' },
          { step: '02', title: 'Budget in ₹ INR', desc: 'Define your strict ceiling or flexible budget range with no hidden costs' },
          { step: '03', title: 'Hardware Needs', desc: 'Processors, RAM upgradeability, dedicated graphics, & display panels' },
          { step: '04', title: 'Top 10 Matches', desc: 'Transparent match scores, verified Indian retailer links, & durability intelligence' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 relative group"
          >
            <div className="text-3xl font-black font-outfit text-primary/30 group-hover:text-primary transition-colors mb-3">
              {item.step}
            </div>
            <h3 className="text-xl font-bold font-outfit text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-surface-elevated via-surface to-background border border-border text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-white mb-4">
            Ready to Discover Your Ideal Laptop?
          </h2>
          <p className="text-slate-300 mb-8 font-inter">
            Takes under 2 minutes. No sign-up required. Completely free and tuned strictly for Indian pricing and warranty terms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/questionnaire"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-700 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all group"
            >
              <span>Start Questionnaire Wizard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/laptops"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-surface hover:bg-surface-elevated border border-border text-slate-300 hover:text-white font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Browse All Indian Laptops</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FindLaptopPage;
