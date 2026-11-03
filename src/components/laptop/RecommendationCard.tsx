import React from 'react';
import { Link } from 'react-router-dom';
import { Recommendation } from '@/types';
import { formatINR, formatScore, getVerificationLabel } from '@/utils/format';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { useComparison } from '@/context/ComparisonContext';
import { ShieldCheck, Cpu, HardDrive, Battery, ExternalLink, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  recommendation: Recommendation;
  rank: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, rank }) => {
  const { laptop, match_score, why_matches, requirements_met, compromises, strongest_advantage, label } = recommendation;
  const { addToCompare, isInComparison, removeFromCompare } = useComparison();
  const compared = isInComparison(laptop.id);
  const statusInfo = getVerificationLabel(laptop.verification_status);

  const labelConfig: Record<string, { text: string; bg: string }> = {
    best_overall: { text: '★ Best Overall Match', bg: 'bg-primary text-white' },
    best_performance: { text: '⚡ Best Raw Performance', bg: 'bg-amber-500 text-black' },
    best_value: { text: '💎 Best Value for Money', bg: 'bg-emerald-500 text-black' },
    best_durability: { text: '🛡️ Best Structural Durability', bg: 'bg-cyan-500 text-black' },
    best_battery: { text: '🔋 Best Battery Endurance', bg: 'bg-teal-500 text-black' },
    best_budget: { text: '🏷️ Best Budget Choice', bg: 'bg-indigo-500 text-white' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="bg-surface border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col md:flex-row relative group"
    >
      {/* Left Column: Image & Rank Badge */}
      <div className="w-full md:w-72 bg-surface-elevated/40 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-border relative">
        {/* Top Badges */}
        <div className="w-full flex items-center justify-between mb-2">
          <span className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-outfit font-black text-sm text-slate-300">
            #{rank}
          </span>
          {label && labelConfig[label] && (
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${labelConfig[label].bg}`}>
              {labelConfig[label].text}
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="my-auto py-4">
          <img
            src={laptop.product_image}
            alt={`${laptop.brand} ${laptop.model}`}
            className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Durability and Status */}
        <div className="w-full text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs text-slate-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Durability: {formatScore(laptop.durability_score)}/10</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusInfo.color }}></span>
            <span>{statusInfo.label}</span>
          </div>
        </div>
      </div>

      {/* Center & Right Column: Details, Match Score & Reasons */}
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          {/* Header row: Title & Score Ring */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-primary mb-1">
                {laptop.brand} • {laptop.chassis_material}
              </div>
              <Link to={`/laptops/${laptop.id}`}>
                <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors">
                  {laptop.brand} {laptop.model}
                </h3>
              </Link>
              <p className="text-xs text-slate-400 mt-0.5">{laptop.exact_configuration}</p>
            </div>

            {/* Match Score Gauge */}
            <div className="flex flex-col items-center flex-shrink-0">
              <ScoreRing score={match_score} size={64} strokeWidth={6} />
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Match Score</span>
            </div>
          </div>

          {/* Key Hardware Specs Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
            <div className="p-2 rounded-xl bg-surface-elevated border border-border/80 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-slate-300 truncate">{laptop.processor}</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-elevated border border-border/80 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-slate-300 truncate">{laptop.ram}GB / {laptop.storage}GB</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-elevated border border-border/80 flex items-center gap-2">
              <Battery className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300 truncate">~{laptop.estimated_battery_life} hrs</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-elevated border border-border/80 flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">GPU</span>
              <span className="text-slate-300 truncate">{laptop.gpu}</span>
            </div>
          </div>

          {/* AI Intelligence / Why it matches */}
          <div className="space-y-1.5 mb-4">
            {why_matches.slice(0, 2).map((reason, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
            {compromises.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-amber-400/90">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Note: {compromises[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing, Comparison & Purchase Footer */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase font-semibold text-slate-400">Verified Retail Price</div>
            <div className="text-2xl font-black font-outfit text-white">
              {formatINR(laptop.price_inr)}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (compared) removeFromCompare(laptop.id);
                else addToCompare(laptop);
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                compared
                  ? 'bg-secondary/20 text-secondary border-secondary/40'
                  : 'bg-surface-elevated border-border text-slate-300 hover:text-white'
              }`}
            >
              {compared ? 'In Comparison' : '+ Compare'}
            </button>

            <Link
              to={`/laptops/${laptop.id}`}
              className="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-slate-700 border border-border text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>Full Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={laptop.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all"
            >
              <span>Buy on {laptop.retailer}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
