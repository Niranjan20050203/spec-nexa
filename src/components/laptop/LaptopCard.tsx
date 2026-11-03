import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop } from '@/types';
import { formatINR, formatScore, getVerificationLabel } from '@/utils/format';
import { useComparison } from '@/context/ComparisonContext';
import { Cpu, HardDrive, ShieldCheck, Scale, ExternalLink, ArrowRight, Bookmark } from 'lucide-react';

interface LaptopCardProps {
  laptop: Laptop;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({ laptop }) => {
  const { addToCompare, isInComparison, removeFromCompare } = useComparison();
  const compared = isInComparison(laptop.id);
  const statusInfo = getVerificationLabel(laptop.verification_status);

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col group shadow-lg">
      {/* Top Banner / Retailer status */}
      <div className="px-4 py-2 bg-surface-elevated border-b border-border/60 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">{laptop.retailer}</span>
        <span className="inline-flex items-center gap-1 font-medium" style={{ color: statusInfo.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusInfo.color }}></span>
          {statusInfo.label}
        </span>
      </div>

      {/* Image & Main Info */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="relative mb-4 overflow-hidden rounded-xl bg-surface-elevated/40 h-44 flex items-center justify-center p-3">
          <img
            src={laptop.product_image}
            alt={`${laptop.brand} ${laptop.model}`}
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10 uppercase">
            {laptop.brand}
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-primary/20 backdrop-blur-md text-[11px] font-bold text-primary-300 border border-primary/30">
            {laptop.display_size}" {laptop.refresh_rate}Hz
          </div>
        </div>

        {/* Title */}
        <Link to={`/laptops/${laptop.id}`}>
          <h3 className="font-outfit font-bold text-base text-white hover:text-primary transition-colors line-clamp-1 mb-1">
            {laptop.brand} {laptop.model}
          </h3>
        </Link>
        <p className="text-xs text-slate-400 line-clamp-1 mb-3">{laptop.exact_configuration}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-surface-elevated/50 p-3 rounded-xl mb-4">
          <div className="flex items-center gap-1.5 line-clamp-1">
            <Cpu className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="truncate">{laptop.processor}</span>
          </div>
          <div className="flex items-center gap-1.5 line-clamp-1">
            <HardDrive className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="truncate">{laptop.ram}GB / {laptop.storage}GB</span>
          </div>
          <div className="flex items-center gap-1.5 line-clamp-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Durability: {formatScore(laptop.durability_score)}/10</span>
          </div>
          <div className="flex items-center gap-1.5 line-clamp-1">
            <Scale className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{laptop.weight} kg</span>
          </div>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Indian Retail Price</div>
            <div className="text-xl font-extrabold font-outfit text-white">
              {formatINR(laptop.price_inr)}
            </div>
          </div>
          <Link
            to={`/laptops/${laptop.id}`}
            className="p-2.5 rounded-xl bg-primary/10 text-primary-400 hover:bg-primary hover:text-white border border-primary/20 transition-all"
            title="View Full Specifications"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Comparison & Purchase Buttons */}
      <div className="px-4 py-3 bg-surface-elevated/80 border-t border-border flex items-center justify-between gap-2 text-xs">
        <button
          type="button"
          onClick={() => {
            if (compared) removeFromCompare(laptop.id);
            else addToCompare(laptop);
          }}
          className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
            compared
              ? 'bg-secondary/20 text-secondary border-secondary/40'
              : 'border-border text-slate-300 hover:text-white hover:border-slate-500'
          }`}
        >
          {compared ? 'In Comparison' : '+ Compare'}
        </button>

        <a
          href={laptop.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-300 font-semibold transition-colors"
        >
          <span>Buy on {laptop.retailer}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default LaptopCard;
