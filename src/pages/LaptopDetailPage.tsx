import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { laptops } from '@/data/laptops';
import { formatINR, formatScore, getVerificationLabel } from '@/utils/format';
import { useComparison } from '@/context/ComparisonContext';
import { 
  Cpu, HardDrive, ShieldCheck, Battery, ExternalLink, ArrowLeft, 
  CheckCircle2, XCircle, Wrench, Sparkles, AlertCircle 
} from 'lucide-react';

export const LaptopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'durability'>('overview');
  const { addToCompare, isInComparison, removeFromCompare } = useComparison();

  const laptop = laptops.find((l) => l.id === id);

  if (!laptop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold font-outfit text-white mb-2">Laptop Record Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested laptop model could not be found in our Indian database.</p>
        <Link to="/laptops" className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold">
          Back to Laptop Catalog
        </Link>
      </div>
    );
  }

  const compared = isInComparison(laptop.id);
  const statusInfo = getVerificationLabel(laptop.verification_status);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link to="/laptops" className="hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Laptops</span>
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-medium">{laptop.brand}</span>
        <span>/</span>
        <span className="text-slate-400 truncate">{laptop.model}</span>
      </div>

      {/* Hero Showcase Card */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Product Image */}
        <div className="p-8 rounded-2xl bg-surface-elevated/50 flex items-center justify-center h-72 border border-border/60">
          <img
            src={laptop.product_image}
            alt={`${laptop.brand} ${laptop.model}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Right: Key Specs & Pricing */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-300 text-xs font-bold uppercase tracking-wider">
              {laptop.brand}
            </span>
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: statusInfo.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusInfo.color }}></span>
              {statusInfo.label}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white mb-2">
            {laptop.brand} {laptop.model}
          </h1>
          <p className="text-xs text-slate-400 mb-6">{laptop.exact_configuration}</p>

          <div className="p-4 rounded-2xl bg-surface-elevated border border-border mb-6">
            <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Indian Retail Price</div>
            <div className="text-3xl font-black font-outfit text-white">
              {formatINR(laptop.price_inr)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Verified retailer: <strong className="text-slate-200">{laptop.retailer}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={laptop.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow py-3 px-6 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all"
            >
              <span>Buy on {laptop.retailer}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => {
                if (compared) removeFromCompare(laptop.id);
                else addToCompare(laptop);
              }}
              className={`py-3 px-5 rounded-xl border text-sm font-semibold transition-all ${
                compared
                  ? 'bg-secondary/20 text-secondary border-secondary/40'
                  : 'bg-surface-elevated border-border text-slate-300 hover:text-white'
              }`}
            >
              {compared ? 'In Comparison' : '+ Compare'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-3 border-b border-border pb-4 mb-8">
        {[
          { id: 'overview', label: 'Overview & Intelligence' },
          { id: 'specs', label: 'Full Technical Specs' },
          { id: 'durability', label: 'Durability & Upgradeability' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-slate-400 hover:text-white bg-surface-elevated/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="font-outfit font-bold text-emerald-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Advantages</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {laptop.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="font-outfit font-bold text-amber-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Known Compromises</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {laptop.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specs' && (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-xs sm:text-sm text-left">
            <tbody className="divide-y divide-border">
              <tr className="bg-surface-elevated/40">
                <td className="p-4 font-bold text-slate-400 w-1/3">Processor</td>
                <td className="p-4 text-white font-medium">{laptop.processor} ({laptop.processor_generation})</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Graphics (GPU)</td>
                <td className="p-4 text-white font-medium">{laptop.gpu} {laptop.gpu_vram ? `(${laptop.gpu_vram}GB VRAM)` : ''}</td>
              </tr>
              <tr className="bg-surface-elevated/40">
                <td className="p-4 font-bold text-slate-400">RAM</td>
                <td className="p-4 text-white font-medium">{laptop.ram}GB {laptop.ram_type} {laptop.ram_upgradeable ? '(Upgradeable SODIMM)' : '(Soldered)'}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Storage</td>
                <td className="p-4 text-white font-medium">{laptop.storage}GB {laptop.storage_type}</td>
              </tr>
              <tr className="bg-surface-elevated/40">
                <td className="p-4 font-bold text-slate-400">Display</td>
                <td className="p-4 text-white font-medium">{laptop.display_size}" {laptop.display_resolution} {laptop.display_panel.toUpperCase()} ({laptop.refresh_rate}Hz)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Battery & Endurance</td>
                <td className="p-4 text-white font-medium">{laptop.battery_capacity}Wh (~{laptop.estimated_battery_life} hours typical workload)</td>
              </tr>
              <tr className="bg-surface-elevated/40">
                <td className="p-4 font-bold text-slate-400">Weight & Chassis</td>
                <td className="p-4 text-white font-medium">{laptop.weight} kg • {laptop.chassis_material}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Operating System</td>
                <td className="p-4 text-white font-medium">{laptop.operating_system}</td>
              </tr>
              <tr className="bg-surface-elevated/40">
                <td className="p-4 font-bold text-slate-400">Official Indian Warranty</td>
                <td className="p-4 text-white font-medium">{laptop.warranty}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'durability' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase font-bold text-emerald-400 mb-1">Structural Rigidity Assessment</div>
              <h3 className="text-xl font-bold font-outfit text-white">Durability Score: {formatScore(laptop.durability_score)} / 10</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xl">{laptop.durability_notes}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-surface-elevated border border-border">
              <span className="text-2xl font-black text-white">{formatScore(laptop.durability_score)}</span>
              <span className="text-xs text-slate-400 block mt-0.5">Confidence: {laptop.durability_confidence}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-surface-elevated border border-border">
              <span className="font-bold text-slate-400 block mb-1">RAM Upgradeability:</span>
              <span className="font-semibold text-white">
                {laptop.ram_upgradeable ? '✓ Yes, user accessible SODIMM slots' : '✗ No, onboard soldered memory'}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-elevated border border-border">
              <span className="font-bold text-slate-400 block mb-1">Storage Upgradeability:</span>
              <span className="font-semibold text-white">
                {laptop.storage_upgradeable ? '✓ Secondary M.2 NVMe slot available' : 'Single M.2 slot replaceable'}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-elevated border border-border">
              <span className="font-bold text-slate-400 block mb-1">Thermal & Cooling:</span>
              <span className="text-slate-300">{laptop.cooling_information}</span>
            </div>
            <div className="p-4 rounded-xl bg-surface-elevated border border-border">
              <span className="font-bold text-slate-400 block mb-1">Military Standard (MIL-STD-810H):</span>
              <span className="font-semibold text-white">
                {laptop.mil_std_810h ? '✓ Certified Military Grade Durability' : 'Standard Commercial Rigidity'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopDetailPage;
