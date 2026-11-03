import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { laptops } from '@/data/laptops';
import { formatINR } from '@/utils/format';
import { ShieldCheck, Plus, CheckCircle, Database } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Authorization Verified</span>
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Product Catalog Management</h1>
        </div>

        <button
          type="button"
          onClick={() => alert('New product entry modal would open here.')}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Indian Laptop</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="text-xs text-slate-400 uppercase font-bold">Total Laptops in DB</div>
          <div className="text-2xl font-black text-white mt-1">{laptops.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="text-xs text-slate-400 uppercase font-bold">Market Supported</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">India (INR ₹)</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="text-xs text-slate-400 uppercase font-bold">Verification Engine</div>
          <div className="text-2xl font-black text-secondary mt-1">Multi-Retailer</div>
        </div>
      </div>

      {/* Laptops Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-elevated border-b border-border text-slate-400 uppercase font-bold">
              <tr>
                <th className="p-4">Brand & Model</th>
                <th className="p-4">Processor</th>
                <th className="p-4">GPU</th>
                <th className="p-4">Retail Price (₹)</th>
                <th className="p-4">Retailer</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {laptops.slice(0, 10).map((l) => (
                <tr key={l.id} className="hover:bg-surface-elevated/40">
                  <td className="p-4 font-bold text-white">
                    {l.brand} {l.model}
                  </td>
                  <td className="p-4 text-slate-300">{l.processor}</td>
                  <td className="p-4 text-slate-300">{l.gpu}</td>
                  <td className="p-4 font-bold text-primary">{formatINR(l.price_inr)}</td>
                  <td className="p-4 text-slate-300">{l.retailer}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                      {l.verification_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
