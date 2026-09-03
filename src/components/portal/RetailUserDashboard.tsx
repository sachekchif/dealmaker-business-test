import React from 'react';
import { StatCard } from './StatCard';
import { ShieldCheck, ArrowRight, Building2, CheckCircle2, Clock } from 'lucide-react';

interface RetailUserDashboardProps {
  userName: string;
  userEmail: string;
  isBusinessVerified?: boolean;
  onVerifyBusinessClick: () => void;
}

export const RetailUserDashboard: React.FC<RetailUserDashboardProps> = ({
  userName,
  userEmail,
  isBusinessVerified = false,
  onVerifyBusinessClick,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner - 100% Light Theme Soft Cyan Fill (#e8f4fb) */}
      <div className="fintech-card p-6 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, {userName}!</h1>
            {isBusinessVerified ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Business Account (BN-9876543)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                <Clock className="w-4 h-4 text-amber-600" />
                Normal User (No Verified Business)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600">
            Account: {userEmail} • Identity verified via BVN/NIN
          </p>
        </div>

        {!isBusinessVerified ? (
          <button
            onClick={onVerifyBusinessClick}
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Building2 className="w-4 h-4 text-white" />
            <span>Verify Business Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="bg-white border border-emerald-300 p-3 rounded-xl text-xs text-emerald-900 font-medium space-y-1 shrink-0 shadow-xs">
            <p className="font-bold flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified CAC Business Profile
            </p>
            <p className="text-[11px] text-slate-600">Amina Bello Enterprises • BN-9876543</p>
          </div>
        )}
      </div>

      {/* Retail User Stat Cards Grid (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Wallet Balance"
          value={350000}
          isCurrency={true}
          subtitle="Available for withdrawal"
          onRefresh={() => alert('Refreshing wallet balance...')}
        />

        <StatCard
          title="Active Deals"
          value={3}
          subtitle="Escrow protected orders"
          onRefresh={() => alert('Refreshing deals...')}
        />

        <StatCard
          title="Total Deals"
          value={18}
          subtitle="Completed transactions"
          onRefresh={() => alert('Refreshing total deals...')}
        />

        <StatCard
          title="Total Disputes"
          value={0}
          subtitle="0 active dispute flags"
          onRefresh={() => alert('Refreshing disputes...')}
        />
      </div>

      {/* Business Account Status Highlight Box */}
      <div className="fintech-card p-5 bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#00a3d9]" />
            <h3 className="text-sm font-bold text-slate-900">
              {isBusinessVerified ? 'Business Profile Verified & Active' : 'Business Account Upgrade'}
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            {isBusinessVerified
              ? 'Your CAC registered business name is verified. You can conduct higher transaction volumes and earn platform commissions.'
              : 'Register your official CAC business identity (BN/RC) to receive a verified business badge on your profile and increase transaction thresholds.'}
          </p>
        </div>

        {!isBusinessVerified && (
          <button
            onClick={onVerifyBusinessClick}
            className="btn-primary text-xs py-2 px-4 shrink-0 flex items-center gap-1.5"
          >
            <span>Start Business Verification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Recent Activity Table */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Retail Transactions</h3>
          <span className="text-xs text-[#00a3d9] font-bold cursor-pointer hover:underline">View All</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Transaction ID</th>
                <th className="py-2.5 px-3">Merchant / Counterparty</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-3 font-mono text-slate-800">TX-9849201</td>
                <td className="py-2.5 px-3">Jiji Electronics Aggregator</td>
                <td className="py-2.5 px-3 text-slate-500">2026-03-01</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">₦120,000</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-3 font-mono text-slate-800">TX-9849205</td>
                <td className="py-2.5 px-3">Samuel & Co. Enterprise</td>
                <td className="py-2.5 px-3 text-slate-500">2026-02-28</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">₦45,000</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
