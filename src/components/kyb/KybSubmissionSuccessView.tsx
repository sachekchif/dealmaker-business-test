import React from 'react';
import { CheckCircle2, Clock, FileCheck, ArrowRight, LayoutDashboard } from 'lucide-react';

interface KybSubmissionSuccessViewProps {
  referenceNumber: string;
  businessName: string;
  onGoToDashboard: () => void;
  onViewStatus: () => void;
}

export const KybSubmissionSuccessView: React.FC<KybSubmissionSuccessViewProps> = ({
  referenceNumber,
  businessName,
  onGoToDashboard,
  onViewStatus,
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center py-8">
      {/* Icon & Title */}
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Business verification submitted</h1>
        <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
          Your business verification request for <strong>{businessName}</strong> has been submitted successfully. We will review the information and documents provided.
        </p>
      </div>

      {/* Reference Card */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs max-w-md mx-auto space-y-3">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Verification Reference Number</span>
        <p className="text-xl font-extrabold text-[#00a3d9] font-mono tracking-wide">{referenceNumber}</p>

        <div className="pt-2 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            Under Review
          </span>
        </div>
      </div>

      {/* What Happens Next Timeline */}
      <div className="fintech-card p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-3">
          <FileCheck className="w-4 h-4 text-[#00a3d9]" />
          <span>What Happens Next (Verification Timeline)</span>
        </h3>

        <div className="space-y-4 text-xs font-medium">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#00a3d9] text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
            <div>
              <p className="font-bold text-slate-900">Documents are reviewed</p>
              <p className="text-[11px] text-slate-500">Compliance officers inspect uploaded CAC certificate, status report, and proof of address for legibility and authenticity.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#00a3d9] text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
            <div>
              <p className="font-bold text-slate-900">Business information is validated</p>
              <p className="text-[11px] text-slate-500">CAC RC/BN number and Tax Identification Number (TIN) are checked against official government API registries.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#00a3d9] text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
            <div>
              <p className="font-bold text-slate-900">Ownership and representative details are checked</p>
              <p className="text-[11px] text-slate-500">Director NIN/Passport identity documents and board resolution authority letters are verified.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">4</div>
            <div>
              <p className="font-bold text-slate-900">Verification result is provided</p>
              <p className="text-[11px] text-slate-500">Upon successful review, your verified business badge is issued and corporate transaction limits are unlocked.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onGoToDashboard}
          className="btn-primary text-xs py-2.5 px-6 flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <LayoutDashboard className="w-4 h-4 text-white" />
          <span>Go to Business Dashboard</span>
        </button>

        <button
          onClick={onViewStatus}
          className="btn-secondary text-xs py-2.5 px-6 flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span>View Verification Status</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
