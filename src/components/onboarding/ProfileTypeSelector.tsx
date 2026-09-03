import React from 'react';
import type { UserRole } from '../../types';
import { User, Building2, Store, CheckCircle } from 'lucide-react';

interface ProfileTypeSelectorProps {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
}

export const ProfileTypeSelector: React.FC<ProfileTypeSelectorProps> = ({
  selectedRole,
  onSelectRole,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">What are you joining as?</h2>
        <p className="text-sm text-slate-600">
          Select how you intend to use the Deal Maker platform. You can update or add business profiles later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
        {/* Retail User Card */}
        <div
          onClick={() => onSelectRole('RETAIL_USER')}
          className={`fintech-card p-6 cursor-pointer relative flex flex-col justify-between transition-all duration-200 ${
            selectedRole === 'RETAIL_USER'
              ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
              : 'hover:border-slate-300 hover:shadow-md'
          }`}
        >
          {selectedRole === 'RETAIL_USER' && (
            <div className="absolute top-4 right-4 text-blue-600">
              <CheckCircle className="w-5 h-5 fill-blue-600 text-white" />
            </div>
          )}
          <div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Retail User</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Consumer & Trader</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Use the platform for normal buying, selling, deposits, wallet transactions, and receiving income.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-2">
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Fast personal identity verification
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Buy, sell & manage wallet
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                No referral commissions by default
              </li>
            </ul>
          </div>
        </div>

        {/* Business User Card */}
        <div
          onClick={() => onSelectRole('BUSINESS_USER')}
          className={`fintech-card p-6 cursor-pointer relative flex flex-col justify-between transition-all duration-200 ${
            selectedRole === 'BUSINESS_USER'
              ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
              : 'hover:border-slate-300 hover:shadow-md'
          }`}
        >
          {selectedRole === 'BUSINESS_USER' && (
            <div className="absolute top-4 right-4 text-blue-600">
              <CheckCircle className="w-5 h-5 fill-blue-600 text-white" />
            </div>
          )}
          <div>
            <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Business User</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Enterprise Representative</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Represent a registered or non-registered business to conduct business operations and financial activities.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-2">
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Supports CAC Registered Businesses & LLCs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Representative identity & authority proof
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Verified Business Badge on approval
              </li>
            </ul>
          </div>
        </div>

        {/* Vendor Card */}
        <div
          onClick={() => onSelectRole('RETAIL_VENDOR_NON_BUSINESS')}
          className={`fintech-card p-6 cursor-pointer relative flex flex-col justify-between transition-all duration-200 ${
            selectedRole?.includes('VENDOR')
              ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
              : 'hover:border-slate-300 hover:shadow-md'
          }`}
        >
          {selectedRole?.includes('VENDOR') && (
            <div className="absolute top-4 right-4 text-blue-600">
              <CheckCircle className="w-5 h-5 fill-blue-600 text-white" />
            </div>
          )}
          <div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Registered Vendor</h3>
            <p className="text-xs text-emerald-700 font-medium uppercase tracking-wider mb-3">Aggregator & Partner</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Bring customers, merchants, and transactions onto the platform and earn structured referral/aggregation commissions.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-2">
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2 font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Earn ongoing transaction commissions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Options for Individual & Corporate Vendors
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                Dedicated vendor analytics dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
