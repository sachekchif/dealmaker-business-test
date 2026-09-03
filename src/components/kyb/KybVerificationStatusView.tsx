import React from 'react';
import type { KybVerificationData } from '../../types/kyb';
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  FileCheck, 
  ArrowRight, 
  RefreshCw,
  Building2,
  LayoutDashboard
} from 'lucide-react';

interface KybVerificationStatusViewProps {
  data: KybVerificationData;
  onStartVerification: () => void;
  onFixDocument: () => void;
  onResubmit: () => void;
  onGoToDashboard: () => void;
}

export const KybVerificationStatusView: React.FC<KybVerificationStatusViewProps> = ({
  data,
  onStartVerification,
  onFixDocument,
  onResubmit,
  onGoToDashboard,
}) => {
  const status = data.overallStatus;
  const rejectedDocs = data.documents.filter((d) => d.status === 'REJECTED');

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* State 1: NOT_STARTED */}
      {status === 'NOT_STARTED' && (
        <div className="fintech-card p-8 bg-white border border-slate-200 text-center space-y-4 rounded-2xl shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto border border-slate-200">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Your business has not been submitted for verification</h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Submit your CAC registration details, company documents, director NIN/passports, and tax identification to activate verified business badges and higher settlement limits.
            </p>
          </div>
          <button
            onClick={onStartVerification}
            className="btn-primary text-xs py-3 px-6 inline-flex items-center gap-2"
          >
            <span>Start Business Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* State 2: IN_PROGRESS / UNDER_REVIEW */}
      {(status === 'IN_PROGRESS' || status === 'PENDING_REVIEW' || status === 'UNDER_REVIEW') && (
        <div className="fintech-card p-8 bg-white border border-slate-200 space-y-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your verification is currently being reviewed</h2>
                <p className="text-xs text-slate-500">Ref: <span className="font-mono font-bold text-[#00a3d9]">{data.referenceNumber}</span> • Submitted for {data.businessDetails.registeredName}</p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
              Under Review
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <p className="font-bold text-slate-900">Compliance Processing Time</p>
            <p className="text-slate-600">Verification reviews typically complete within 24 to 48 business hours. You will receive email notifications upon status changes.</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onGoToDashboard} className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5">
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span>Go to Business Dashboard</span>
            </button>
          </div>
        </div>
      )}

      {/* State 3: REQUIRES_ACTION */}
      {status === 'REQUIRES_ACTION' && (
        <div className="fintech-card p-8 bg-white border border-rose-200 space-y-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Some information requires your attention</h2>
                <p className="text-xs text-slate-500">Action items flagged by platform compliance officer</p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
              Action Required
            </span>
          </div>

          {/* Action Required Items List */}
          <div className="space-y-3">
            {rejectedDocs.map((doc) => (
              <div key={doc.id} className="p-4 bg-rose-50 rounded-xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-rose-900 block">{doc.name}</span>
                  <p className="text-[11px] text-rose-800 font-medium">Rejection Reason: {doc.rejectionReason || 'Illegible scan or document mismatch.'}</p>
                </div>

                <button
                  onClick={onFixDocument}
                  className="btn-primary text-xs py-1.5 px-3 bg-rose-600 hover:bg-rose-700 shrink-0 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Fix / Replace Document</span>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onFixDocument} className="btn-primary text-xs py-2 px-5">
              Update Information Now
            </button>
          </div>
        </div>
      )}

      {/* State 4: VERIFIED */}
      {status === 'VERIFIED' && (
        <div className="fintech-card p-8 bg-white border border-emerald-200 space-y-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your business has been successfully verified</h2>
                <p className="text-xs text-slate-500">Verified Entity: <strong className="text-slate-900">{data.businessDetails.registeredName}</strong> ({data.businessDetails.cacRegistrationNumber})</p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Business Verified
            </span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1 font-medium">
            <p className="font-bold flex items-center gap-1.5 text-emerald-950">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Verification Status Active
            </p>
            <p className="text-[11px] text-emerald-800">
              Verified Date: {data.verifiedAt ? new Date(data.verifiedAt).toLocaleDateString() : 'Active'} • Corporate Settlement Limits Unlocked
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onGoToDashboard} className="btn-primary text-xs py-2 px-5 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-white" />
              <span>Go to Business Dashboard</span>
            </button>
          </div>
        </div>
      )}

      {/* State 5: REJECTED */}
      {status === 'FAILED' && (
        <div className="fintech-card p-8 bg-white border border-rose-200 space-y-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <XCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your business verification could not be completed</h2>
                <p className="text-xs text-slate-500">Ref: <span className="font-mono">{data.referenceNumber}</span></p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
              Verification Failed
            </span>
          </div>

          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
            <p className="font-bold text-rose-950">Compliance Officer Rejection Reason:</p>
            <p className="text-rose-800">{data.rejectionReason || 'Submitted CAC documents or tax identification records could not be validated against government registries.'}</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onResubmit} className="btn-primary text-xs py-2 px-5 flex items-center gap-2 bg-rose-600 hover:bg-rose-700">
              <RefreshCw className="w-4 h-4" />
              <span>Update Information / Resubmit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
