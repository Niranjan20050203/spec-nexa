import React, { useState, useMemo } from 'react';
import { laptops } from '@/data/laptops';
import { LaptopCard } from '@/components/laptop/LaptopCard';
import { INDIAN_BRANDS } from '@/utils/constants';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { formatINR } from '@/utils/format';

export const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [onlyDedicatedGPU, setOnlyDedicatedGPU] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'durability' | 'battery'>('price_asc');

  // Filter and sort catalog
  const filteredLaptops = useMemo(() => {
    return laptops
      .filter((l) => {
        if (!l.is_available) return false;
        if (selectedBrand !== 'All' && l.brand !== selectedBrand) return false;
        if (l.price_inr > maxPrice) return false;
        if (onlyDedicatedGPU && !l.gpu_dedicated) return false;
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = `${l.brand} ${l.model} ${l.processor} ${l.gpu}`.toLowerCase();
          if (!matchName.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price_inr - b.price_inr;
        if (sortBy === 'price_desc') return b.price_inr - a.price_inr;
        if (sortBy === 'durability') return b.durability_score - a.durability_score;
        if (sortBy === 'battery') return b.estimated_battery_life - a.estimated_battery_life;
        return 0;
      });
  }, [searchTerm, selectedBrand, maxPrice, onlyDedicatedGPU, sortBy]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white mb-2">
          Explore Indian Laptops Catalog
        </h1>
        <p className="text-slate-400 text-sm">
          Browse our verified database of 30+ laptops available in India with honest specs, durability scores, and verified retail links.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 mb-8 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by brand, processor, GPU (e.g. RTX 4060, ThinkPad, OLED)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-elevated border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface-elevated border border-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="durability">Highest Durability</option>
              <option value="battery">Longest Battery Life</option>
            </select>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/60 text-xs">
          {/* Brand select */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-surface-elevated border border-border rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
            >
              <option value="All">All Brands</option>
              {INDIAN_BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Max Price:</span>
            <input
              type="range"
              min="25000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 sm:w-36 accent-primary"
            />
            <span className="text-primary font-bold">{formatINR(maxPrice)}</span>
          </div>

          {/* Dedicated GPU toggle */}
          <label className="flex items-center gap-2 cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={onlyDedicatedGPU}
              onChange={(e) => setOnlyDedicatedGPU(e.target.checked)}
              className="w-4 h-4 rounded bg-surface border-border text-primary focus:ring-primary"
            />
            <span className="text-slate-300">Dedicated GPU Only</span>
          </label>
        </div>
      </div>

      {/* Catalog Results Grid */}
      <div className="mb-4 text-xs font-semibold text-slate-400">
        Showing <span className="text-white">{filteredLaptops.length}</span> of {laptops.length} laptops
      </div>

      {filteredLaptops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-surface border border-border">
          <p className="text-slate-400 text-sm">No laptops found matching your current search and filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedBrand('All');
              setMaxPrice(250000);
              setOnlyDedicatedGPU(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
