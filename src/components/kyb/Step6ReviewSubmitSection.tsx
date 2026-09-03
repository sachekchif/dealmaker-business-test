import React, { useState } from 'react';
import type { KybVerificationData } from '../../types/kyb';
import { KybService } from '../../services/kybService';
import { 
  Building2, 
  FileText, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  Send, 
  Save, 
  ArrowLeft,
  Check
} from 'lucide-react';

interface Step6ReviewSubmitSectionProps {
  data: KybVerificationData;
  onChange: (updated: KybVerificationData) => void;
  onGoToStep: (stepId: number) => void;
  onSubmit: () => void;
  onSaveAndExit: () => void;
  onBack: () => void;
}

export const Step6ReviewSubmitSection: React.FC<Step6ReviewSubmitSectionProps> = ({
  data,
  onChange,
  onGoToStep,
  onSubmit,
  onSaveAndExit,
  onBack,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationItems = KybService.validateApplication(data);
  const missingItems = validationItems.filter((item) => item.isMissing);

  const totalOwnership = KybService.calculateTotalOwnership(data.persons);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.declarationAccepted) {
      alert('You must accept the legal submission declaration checkbox to proceed.');
      return;
    }
    if (missingItems.length > 0) {
      alert(`Cannot submit. There are still ${missingItems.length} required items needing your attention.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 800);
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Step 6 — Final Review & Verification Submission</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Review all entered corporate details, uploaded compliance documents, shareholder ownership structures, and declarations before submitting your KYB verification request.
          </p>
        </div>
      </div>

      {/* Validation Checklist Summary Callout */}
      {missingItems.length > 0 ? (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2 text-amber-900 text-xs animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{missingItems.length} items still need your attention before submission</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-900 pl-1 font-medium">
            {missingItems.map((item, idx) => (
              <li key={idx} className="cursor-pointer hover:underline" onClick={() => onGoToStep(item.stepId)}>
                <strong>Step {item.stepId} ({item.label}):</strong> {item.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-emerald-900 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>All 6 verification checklist sections are complete and valid. Ready for submission.</span>
          </div>
        </div>
      )}

      {/* REVIEW CARD 1: Business Information */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#00a3d9]" />
            <h3 className="text-sm font-bold text-slate-900">1. Business Information</h3>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(1)}
            className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3 text-[#00a3d9]" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Registered Name</span>
            <p className="font-bold text-slate-900">{data.businessDetails.registeredName}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">CAC RC/BN Number</span>
            <p className="font-mono font-bold text-slate-900">{data.businessDetails.cacRegistrationNumber}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Business Structure</span>
            <p className="font-bold text-slate-900">{data.businessDetails.businessType.replace(/_/g, ' ')}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">TIN Number</span>
            <p className="font-mono font-bold text-slate-900">{data.businessDetails.tinNumber}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Industry</span>
            <p className="font-bold text-slate-900">{data.businessDetails.industry}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Registered Address</span>
            <p className="text-slate-800">
              {data.businessDetails.registeredAddress.streetAddress}, {data.businessDetails.registeredAddress.city}, {data.businessDetails.registeredAddress.state} State
            </p>
          </div>
        </div>
      </div>

      {/* REVIEW CARD 2: Business Documents */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00a3d9]" />
            <h3 className="text-sm font-bold text-slate-900">2. Business Documents ({data.documents.filter(d => d.fileUrl).length} Uploaded)</h3>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3 text-[#00a3d9]" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {data.documents.map((doc) => (
            <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="truncate">
                <span className="font-semibold text-slate-900 block truncate">{doc.name}</span>
                <span className="text-[10px] text-slate-500">{doc.fileName || 'Not uploaded'}</span>
              </div>
              {doc.fileUrl ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Uploaded
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 shrink-0">
                  Missing
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW CARD 3: Ownership & Directors */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#00a3d9]" />
            <h3 className="text-sm font-bold text-slate-900">3. Directors & Shareholders ({data.persons.length} Listed — Total {totalOwnership}%)</h3>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(3)}
            className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3 text-[#00a3d9]" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {data.persons.map((p) => (
            <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">{p.fullName}</span>
                <span className="text-[10px] text-slate-500">{p.role.replace(/_/g, ' ')} • {p.email}</span>
              </div>
              <span className="font-mono font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200 text-xs">
                {p.ownershipPercentage}% Ownership
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW CARD 4: Authorized Representative */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#00a3d9]" />
            <h3 className="text-sm font-bold text-slate-900">4. Authorized Representative</h3>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(4)}
            className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3 text-[#00a3d9]" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Representative Name</span>
            <p className="font-bold text-slate-900">{data.authorizedRepresentative.fullName}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Position</span>
            <p className="font-bold text-slate-900">{data.authorizedRepresentative.positionTitle}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Email</span>
            <p className="text-slate-800">{data.authorizedRepresentative.email}</p>
          </div>
        </div>
      </div>

      {/* REVIEW CARD 5: Compliance */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00a3d9]" />
            <h3 className="text-sm font-bold text-slate-900">5. Regulatory Compliance</h3>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(5)}
            className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3 text-[#00a3d9]" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">SCUML Registration</span>
            <p className="font-bold text-slate-900">{data.compliance.requiresScuml === 'YES' ? 'Yes (Certificate Uploaded)' : 'No / Not Required'}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Sector Regulatory Licence</span>
            <p className="font-bold text-slate-900">{data.compliance.hasRegulatoryLicense === 'YES' ? `Yes (${data.compliance.regulatoryBody || 'Licensed'})` : 'No Sector Licence Required'}</p>
          </div>
        </div>
      </div>

      {/* Legal Declaration Checkbox */}
      <div className="fintech-card p-6 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl space-y-4">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Mandatory Submission Declaration</h4>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.declarationAccepted}
            onChange={(e) => onChange({ ...data, declarationAccepted: e.target.checked })}
            className="w-5 h-5 text-[#00a3d9] rounded border-slate-300 focus:ring-[#00a3d9] shrink-0 mt-0.5"
          />
          <span className="text-xs text-slate-800 leading-relaxed">
            I confirm that the information provided is accurate and complete, and that I am officially authorized to submit this business verification request on behalf of the company under applicable Nigerian statutory laws.
          </span>
        </label>
      </div>

      {/* Submission CTA Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-1.5 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 5</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSaveAndExit}
            className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5 flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save & Exit</span>
          </button>

          <button
            type="submit"
            disabled={!data.declarationAccepted || missingItems.length > 0 || isSubmitting}
            className={`btn-primary text-xs py-2.5 px-6 flex items-center gap-2 flex-1 sm:flex-none ${
              !data.declarationAccepted || missingItems.length > 0 || isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <Send className="w-4 h-4 text-white" />
            <span>{isSubmitting ? 'Submitting Verification...' : 'Submit for Verification'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
