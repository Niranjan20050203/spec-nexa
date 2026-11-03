import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';

export const SavedPage: React.FC = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black font-outfit text-white mb-1">Saved Laptops</h1>
        <p className="text-slate-400 text-xs sm:text-sm">Manage your bookmarked laptops for quick reference.</p>
      </div>

      <div className="p-12 text-center rounded-3xl bg-surface border border-border">
        <div className="w-12 h-12 rounded-full bg-surface-elevated text-slate-400 flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold font-outfit text-white mb-2">No Saved Laptops Yet</h3>
        <p className="text-slate-400 text-xs mb-6 max-w-sm mx-auto">
          Explore our Indian laptop catalog or run the questionnaire to find and save your favorite devices.
        </p>
        <Link
          to="/laptops"
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default SavedPage;
