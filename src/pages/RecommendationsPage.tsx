import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { laptops } from '@/data/laptops';
import { getRecommendations } from '@/algorithms/recommendation';
import { RecommendationCard } from '@/components/laptop/RecommendationCard';
import { Sparkles, SlidersHorizontal, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { formatINR } from '@/utils/format';

export const RecommendationsPage: React.FC = () => {
  const { state } = useQuestionnaire();
  const preferences = state.preferences;

  // Run the deterministic recommendation algorithm
  const recommendations = useMemo(() => {
    return getRecommendations(laptops, preferences as any);
  }, [preferences]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>AI Verified Match Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">
            Your Top 10 Laptop Recommendations
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Calculated across 8 weighted dimensions for {preferences.usage?.join(', ') || 'General Workload'} • Max Budget: {formatINR(preferences.budget_max || 80000)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/questionnaire"
            className="px-4 py-2.5 rounded-xl border border-border bg-surface-elevated text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span>Adjust Requirements</span>
          </Link>
        </div>
      </div>

      {/* Results Count & Data Freshness notice */}
      <div className="p-4 rounded-2xl bg-surface-elevated/60 border border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 mb-8 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            Found <strong className="text-white">{recommendations.length} qualifying laptop(s)</strong> matching your criteria in India.
          </span>
        </div>
        <div>Indian Retail Prices checked as of November 2026</div>
      </div>

      {/* List of Recommendations */}
      {recommendations.length > 0 ? (
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={rec.laptop.id}
              recommendation={rec}
              rank={index + 1}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-surface border border-border text-center max-w-xl mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-outfit text-white mb-2">
            No Laptops Match These Strict Constraints
          </h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Your selected budget of {formatINR(preferences.budget_max || 0)} combined with mandatory hardware specs (e.g. Dedicated GPU or 32GB RAM) yielded 0 current Indian retail configurations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/questionnaire"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Relax Filters & Budget</span>
            </Link>
            <Link
              to="/laptops"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-surface-elevated border border-border text-slate-300 hover:text-white font-semibold text-xs transition-all"
            >
              <span>Explore All 30+ Laptops</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;
