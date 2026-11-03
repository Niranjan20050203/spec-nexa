import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Bookmark, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Welcome Header */}
      <div className="p-8 rounded-3xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-black text-xl flex items-center justify-center">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-outfit text-white">
              Welcome, {user?.name || 'Explorer'}!
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={signOut}
            className="px-4 py-2 rounded-xl border border-border bg-surface-elevated text-slate-300 hover:text-white text-xs font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Link
          to="/questionnaire"
          className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="font-outfit font-bold text-white text-base mb-1">New Search</h3>
          <p className="text-xs text-slate-400">Run a personalized questionnaire for your target budget.</p>
        </Link>

        <Link
          to="/saved"
          className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="font-outfit font-bold text-white text-base mb-1">Saved Laptops</h3>
          <p className="text-xs text-slate-400">View laptops bookmarked during your search sessions.</p>
        </Link>

        <Link
          to="/compare"
          className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-outfit font-bold text-white text-base mb-1">Comparison Engine</h3>
          <p className="text-xs text-slate-400">Side-by-side spec and durability analysis for up to 4 laptops.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
