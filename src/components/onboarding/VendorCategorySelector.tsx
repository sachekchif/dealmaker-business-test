import React from 'react';
import type { VendorCategory, UserRole } from '../../types';
import { UserCheck, Building, ShieldCheck, Info } from 'lucide-react';

interface VendorCategorySelectorProps {
  selectedCategory: VendorCategory | null;
  onSelectCategory: (category: VendorCategory, mappedRole: UserRole) => void;
}

export const VendorCategorySelector: React.FC<VendorCategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Select Vendor Category</h2>
        <p className="text-sm text-slate-600">
          Choose the vendor tier that matches your entity structure and operational capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Category 1: Retail Vendor - Non-Business */}
        <div
          onClick={() => onSelectCategory('RETAIL_NON_BUSINESS', 'RETAIL_VENDOR_NON_BUSINESS')}
          className={`fintech-card p-6 cursor-pointer flex flex-col justify-between transition-all ${
            selectedCategory === 'RETAIL_NON_BUSINESS'
              ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
              : 'hover:border-slate-300'
          }`}
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 mb-2">
              Individual Aggregator
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-1">Retail Vendor — Non-Business</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              For individuals (e.g. students or freelance aggregators) without a registered CAC business.
            </p>
          </div>
          <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1.5">
            <p>• Verified via BVN/NIN identity</p>
            <p>• Earn referral commissions</p>
            <p>• Transactions mapped to Deal Maker partner</p>
            <p className="text-slate-400">• No CAC documents required</p>
          </div>
        </div>

        {/* Category 2: Retail Vendor - Business */}
        <div
          onClick={() => onSelectCategory('RETAIL_BUSINESS', 'RETAIL_VENDOR_BUSINESS')}
          className={`fintech-card p-6 cursor-pointer flex flex-col justify-between transition-all ${
            selectedCategory === 'RETAIL_BUSINESS'
              ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
              : 'hover:border-slate-300'
          }`}
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 mb-2">
              Small Business Name
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-1">Retail Vendor — Business</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              For sole proprietors or registered business names (e.g. "Samuel & Co.").
            </p>
          </div>
          <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1.5">
            <p>• Verified individual & business info</p>
            <p>• CAC Business Name Certificate</p>
            <p>• Receives "Verified Business" badge</p>
            <p>• Earn commissions & manage clients</p>
          </div>
        </div>

        {/* Category 3: Corporate Vendor */}
        <div
          onClick={() => onSelectCategory('CORPORATE_VENDOR', 'CORPORATE_VENDOR')}
          className={`fintech-card p-6 cursor-pointer flex flex-col justify-between transition-all ${
            selectedCategory === 'CORPORATE_VENDOR'
              ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20'
              : 'hover:border-slate-300'
          }`}
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 text-indigo-800 mb-2">
              Corporate / Enterprise
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-1">Business / Corporate Vendor</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              For formal companies, Limited Liability (LLC), PLCs, and large marketplaces (e.g. Jiji, Deal Maker).
            </p>
          </div>
          <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1.5">
            <p>• Complete KYB corporate verification</p>
            <p>• Certificate of Incorporation + Form 1.1</p>
            <p>• Authorized representative proof</p>
            <p>• High-volume transactions & API tools</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-xs text-amber-800">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Commission & Mapping Note:</strong> Non-business retail vendors do not originate direct corporate settlement accounts. Their onboarded users will be automatically mapped to Deal Maker Global Ltd for settlement, while earned commissions will be tracked directly in the vendor's wallet.
        </p>
      </div>
    </div>
  );
};
