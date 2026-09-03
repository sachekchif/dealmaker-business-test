import React from 'react';
import { Users, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface KybOwnershipSummaryProps {
  totalPercentage: number;
  personCount: number;
}

export const KybOwnershipSummary: React.FC<KybOwnershipSummaryProps> = ({
  totalPercentage,
  personCount,
}) => {
  const isValid = totalPercentage === 100;

  return (
    <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-xl space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d0e7f7] pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#00a3d9]" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">Shareholder Ownership Summary</h4>
            <p className="text-[11px] text-slate-600">{personCount} Listed Individuals (Directors & Shareholders)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Total Ownership:</span>
          <span
            className={`text-sm font-extrabold px-3 py-1 rounded-lg font-mono ${
              isValid ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            {totalPercentage}%
          </span>
          {isValid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          )}
        </div>
      </div>

      {/* Explanatory Callout */}
      <div className="flex items-start gap-2 text-xs text-slate-700">
        <Info className="w-4 h-4 text-[#00a3d9] shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Beneficial Ownership Rule:</strong> Beneficial owners are individuals who ultimately own or control 5% or more of the business shares or voting rights under Nigerian Anti-Money Laundering (AML/CFT) regulations. Total ownership percentages must equal exactly 100%.
        </p>
      </div>
    </div>
  );
};
