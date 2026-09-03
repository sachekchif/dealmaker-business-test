import React, { useState } from 'react';
import { Layers, BookOpen } from 'lucide-react';

export const WorkflowsExplorer: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<'reg' | 'vendor' | 'biz' | 'comm' | 'stories'>('reg');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner - Light Theme Soft Cyan (#e8f4fb) */}
      <div className="fintech-card p-6 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#00a3d9]" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Platform Flowcharts & User Stories Explorer</h1>
          </div>
          <p className="text-xs text-slate-600">
            Interactive visualization of customer registration, vendor onboarding, business verification, and 5% commission mapping workflows.
          </p>
        </div>
      </div>

      {/* Switcher Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveDiagram('reg')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeDiagram === 'reg' ? 'bg-[#00a3d9] text-white border-[#00a3d9] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          1. User Registration Flow
        </button>

        <button
          onClick={() => setActiveDiagram('vendor')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeDiagram === 'vendor' ? 'bg-[#00a3d9] text-white border-[#00a3d9] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          2. Vendor Category Choice
        </button>

        <button
          onClick={() => setActiveDiagram('biz')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeDiagram === 'biz' ? 'bg-[#00a3d9] text-white border-[#00a3d9] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          3. Business Verification Architecture
        </button>

        <button
          onClick={() => setActiveDiagram('comm')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeDiagram === 'comm' ? 'bg-[#00a3d9] text-white border-[#00a3d9] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          4. 5% Commission Routing
        </button>

        <button
          onClick={() => setActiveDiagram('stories')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
            activeDiagram === 'stories' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>User Stories & Acceptance Criteria</span>
        </button>
      </div>

      {/* Flowchart Render Area */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        {activeDiagram === 'reg' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Customer Registration & Identity Verification Flowchart</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-xl font-bold text-center">User Arrives</div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="font-bold block text-slate-900">Identity Selection</span>
                <span className="text-[10px] text-slate-500">Retail User vs Vendor</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="font-bold block text-slate-900">BVN / NIN Check</span>
                <span className="text-[10px] text-slate-500">Encrypted Government Match</span>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl font-bold text-center">Account Created</div>
            </div>
          </div>
        )}

        {activeDiagram === 'vendor' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Vendor Category & Legal Structure Flowchart</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-900 block">Retail Vendor (Non-Business)</span>
                <p className="text-[11px] text-amber-800">Individual referral aggregator. NIN/BVN verified. Mapped to Deal Maker Global Ltd.</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 block">Retail Vendor (Business Name)</span>
                <p className="text-[11px] text-blue-800">Registered Business Name (BN). Form 1.1 / BN certificate verified.</p>
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                <span className="font-bold text-indigo-900 block">Corporate Vendor (LLC/PLC)</span>
                <p className="text-[11px] text-indigo-800">Formal company (RC). Board signatories, MEMART, and multi-admin team capabilities.</p>
              </div>
            </div>
          </div>
        )}

        {activeDiagram === 'biz' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">CAC Business Verification Architecture</h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <p className="text-slate-700">1. Verification form collects RC/BN number, TIN, and office address.</p>
              <p className="text-slate-700">2. Compliance matches CAC database records against uploaded certificate.</p>
              <p className="text-slate-700">3. Verified badge awarded upon admin approval.</p>
            </div>
          </div>
        )}

        {activeDiagram === 'comm' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">5% Fixed Referral Commission Distribution Flow</h3>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900 font-medium">
              <p>• Qualifying customer transactions calculate 5.0% referral commission.</p>
              <p>• Unbusiness vendors route execution and payouts through Deal Maker Global Ltd.</p>
              <p>• Commission balances can be transferred to vendor settlement wallets in real-time.</p>
            </div>
          </div>
        )}

        {activeDiagram === 'stories' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">User Stories & Acceptance Criteria</h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">US-1: Vendor Category Onboarding</span>
                <p className="text-slate-600">As a vendor, I can select between Non-Business, Business Name, or Corporate Vendor onboarding so that my legal requirements match my structure.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">US-2: Retail User Business Upgrade</span>
                <p className="text-slate-600">As a retail user, I can click "Verify Business" from my sidebar bottom container to submit CAC documents and upgrade to a business account.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
