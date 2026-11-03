import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '@/context/ComparisonContext';
import { formatINR, formatScore } from '@/utils/format';
import { X, ExternalLink, ArrowRight, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { items, removeFromCompare, clearComparison } = useComparison();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-white mb-2">No Laptops in Comparison</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md">
          You haven't added any laptops to compare yet. Add up to 4 laptops from the catalog or recommendation results.
        </p>
        <Link
          to="/laptops"
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-700 text-white font-semibold text-xs transition-all"
        >
          Explore Catalog to Compare
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black font-outfit text-white mb-1">Side-by-Side Comparison</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Comparing {items.length} of 4 maximum laptops side-by-side.
          </p>
        </div>
        <button
          type="button"
          onClick={clearComparison}
          className="px-4 py-2 rounded-xl bg-surface-elevated border border-border text-slate-300 hover:text-white text-xs font-semibold transition-all"
        >
          Clear All
        </button>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto pb-6">
        <table className="w-full text-xs text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 w-44 bg-surface font-bold text-slate-400 uppercase tracking-wider">Specifications</th>
              {items.map((item: any) => (
                <th key={item.laptop.id} className="p-4 bg-surface-elevated text-center relative border-l border-border min-w-[200px]">
                  <button
                    type="button"
                    onClick={() => removeFromCompare(item.laptop.id)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-400"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={item.laptop.product_image}
                    alt={item.laptop.model}
                    className="h-28 mx-auto object-contain mb-3"
                  />
                  <div className="font-outfit font-bold text-white text-sm line-clamp-1">
                    {item.laptop.brand} {item.laptop.model}
                  </div>
                  <div className="text-primary font-black text-base mt-1">
                    {formatINR(item.laptop.price_inr)}
                  </div>
                  <a
                    href={item.laptop.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white"
                  >
                    <span>{item.laptop.retailer}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {/* Processor */}
            <tr>
              <td className="p-4 bg-surface font-bold text-slate-400">Processor</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  {item.laptop.processor}
                </td>
              ))}
            </tr>

            {/* Graphics */}
            <tr className="bg-surface-elevated/30">
              <td className="p-4 bg-surface font-bold text-slate-400">Graphics (GPU)</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  {item.laptop.gpu}
                </td>
              ))}
            </tr>

            {/* RAM */}
            <tr>
              <td className="p-4 bg-surface font-bold text-slate-400">Memory (RAM)</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  {item.laptop.ram}GB ({item.laptop.ram_upgradeable ? 'Upgradeable' : 'Soldered'})
                </td>
              ))}
            </tr>

            {/* Storage */}
            <tr className="bg-surface-elevated/30">
              <td className="p-4 bg-surface font-bold text-slate-400">Storage</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  {item.laptop.storage}GB {item.laptop.storage_type}
                </td>
              ))}
            </tr>

            {/* Display */}
            <tr>
              <td className="p-4 bg-surface font-bold text-slate-400">Display</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  {item.laptop.display_size}" {item.laptop.display_panel.toUpperCase()} ({item.laptop.refresh_rate}Hz)
                </td>
              ))}
            </tr>

            {/* Battery */}
            <tr className="bg-surface-elevated/30">
              <td className="p-4 bg-surface font-bold text-slate-400">Battery Life</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  ~{item.laptop.estimated_battery_life} hrs ({item.laptop.battery_capacity}Wh)
                </td>
              ))}
            </tr>

            {/* Durability */}
            <tr>
              <td className="p-4 bg-surface font-bold text-slate-400">Durability Score</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-emerald-400 font-bold border-l border-border">
                  {formatScore(item.laptop.durability_score)} / 10
                </td>
              ))}
            </tr>

            {/* Weight */}
            <tr className="bg-surface-elevated/30">
              <td className="p-4 bg-surface font-bold text-slate-400">Weight</td>
              {items.map((item: any) => (
                <td key={item.laptop.id} className="p-4 text-center text-white border-l border-border">
                  {item.laptop.weight} kg
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;
