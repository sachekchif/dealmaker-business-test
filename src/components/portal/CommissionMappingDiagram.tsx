import React from 'react';
import type { VendorProfile } from '../../types';
import { ArrowRight, DollarSign, Layers } from 'lucide-react';

interface CommissionMappingDiagramProps {
  vendor: VendorProfile;
  executionPartner: string;
}

export const CommissionMappingDiagram: React.FC<CommissionMappingDiagramProps> = ({
  vendor,
  executionPartner,
}) => {
  const isNonBusiness = vendor.vendorCategory === 'RETAIL_NON_BUSINESS';

  return (
    <div className="fintech-card p-6 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">
            Non-Business & Retail Vendor Commission Mapping Flow
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Visual architecture demonstrating how user transaction volume is routed through compliance settlement partners while attributing commissions to the referring vendor identity.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative z-10">
          {/* Step 1: Onboarded User */}
          <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-2xs space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-xs font-bold">
              1
            </div>
            <h4 className="text-xs font-bold text-slate-900">Onboarded User</h4>
            <p className="text-[11px] text-slate-500">Retail trader / consumer registered via vendor link.</p>
            <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold">
              Originates Transaction
            </span>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-400">
            <ArrowRight className="w-6 h-6 stroke-[1.5]" />
          </div>

          {/* Step 2: Referring Vendor */}
          <div className="bg-white border-2 border-emerald-500 p-4 rounded-lg shadow-xs space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xs font-bold">
              2
            </div>
            <h4 className="text-xs font-bold text-slate-900">{vendor.vendorName}</h4>
            <p className="text-[11px] text-slate-500">
              {isNonBusiness ? 'Informal Aggregator (NIN Verified)' : 'Verified Retail Business'}
            </p>
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Attributes Referral Link
            </span>
          </div>

          <div className="hidden md:flex items-center justify-center text-slate-400">
            <ArrowRight className="w-6 h-6 stroke-[1.5]" />
          </div>

          {/* Step 3: Execution Settlement Partner */}
          <div className="bg-slate-900 text-white p-4 rounded-lg shadow-md space-y-2 text-center">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center mx-auto text-xs font-bold border border-slate-700">
              3
            </div>
            <h4 className="text-xs font-bold text-amber-300">{executionPartner}</h4>
            <p className="text-[11px] text-slate-300">Registered Corporate Partner for Regulatory KYB</p>
            <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
              Settles Transactions
            </span>
          </div>
        </div>

        {/* Step 4: Commission Distribution Box */}
        <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Commission Split Logic (5.0% Fixed Rate)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When User A trades ₦1,000,000, transaction settlement is processed under {executionPartner}'s CAC license. The platform automatically calculates ₦50,000 commission and credits <strong className="text-slate-900">{vendor.vendorName}</strong>'s wallet.
            </p>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded p-3 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">Compliance Guarantee</span>
            <p className="text-[11px] text-emerald-800">
              Non-business vendors do not require CAC corporate papers because settlement risk is handled by the licensed partner, guaranteeing instant legally compliant payout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
