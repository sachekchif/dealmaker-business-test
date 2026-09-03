import React, { useRef } from 'react';
import type { KybAuthorizedRepresentative, GovtIdType } from '../../types/kyb';
import { UserCheck, ShieldCheck, UploadCloud, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step4AuthorizedRepresentativeFormProps {
  data: KybAuthorizedRepresentative;
  onChange: (updated: KybAuthorizedRepresentative) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4AuthorizedRepresentativeForm: React.FC<Step4AuthorizedRepresentativeFormProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (file: File) => {
    onChange({
      ...data,
      authorizationLetterDocUrl: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.fullName || !data.email || !data.govtIdNumber) {
      alert('Please fill in mandatory representative contact and identity fields.');
      return;
    }
    if (!data.isAuthorized) {
      alert('You must confirm authorization to act on behalf of the business.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <UserCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Step 4 — Authorized Representative</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Provide details of the designated individual submitting this KYB application on behalf of the registered corporate entity.
          </p>
        </div>
      </div>

      {/* Representative Contact Details */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Representative Identity & Position
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="fintech-label">Full Legal Name *</label>
            <input
              type="text"
              required
              value={data.fullName}
              onChange={(e) => onChange({ ...data, fullName: e.target.value })}
              placeholder="e.g. Amina Bello"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">Corporate Position / Designation *</label>
            <input
              type="text"
              required
              value={data.positionTitle}
              onChange={(e) => onChange({ ...data, positionTitle: e.target.value })}
              placeholder="e.g. Managing Director / Authorized Officer"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">Work Email Address *</label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              placeholder="amina@dealmaker.ng"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">Mobile Phone Number *</label>
            <input
              type="text"
              required
              value={data.phoneNumber}
              onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
              placeholder="+234 800 000 0000"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">Government ID Type *</label>
            <select
              value={data.govtIdType}
              onChange={(e) => onChange({ ...data, govtIdType: e.target.value as GovtIdType })}
              className="fintech-input"
            >
              <option value="NIN">National Identity Number (NIN Slip)</option>
              <option value="PASSPORT">International Passport</option>
              <option value="DRIVERS_LICENSE">Driver's Licence</option>
              <option value="VOTERS_CARD">Permanent Voter's Card (PVC)</option>
              <option value="OTHER">Other Govt ID</option>
            </select>
          </div>

          <div>
            <label className="fintech-label">Government ID Number *</label>
            <input
              type="text"
              required
              value={data.govtIdNumber}
              onChange={(e) => onChange({ ...data, govtIdNumber: e.target.value })}
              placeholder="e.g. 10928374651"
              className="fintech-input font-mono"
            />
          </div>
        </div>
      </div>

      {/* Corporate Authorization Question & Board Resolution */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-4 h-4 text-[#00a3d9]" />
          <span>Corporate Authorization Evidence</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 block">
              Are you authorized to act on behalf of this business and bind the company to financial platform agreements? *
            </span>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-semibold">
                <input
                  type="radio"
                  name="isAuthorized"
                  checked={data.isAuthorized === true}
                  onChange={() => onChange({ ...data, isAuthorized: true })}
                  className="w-4 h-4 text-[#00a3d9]"
                />
                <span>Yes — I am officially authorized by the Board of Directors</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-500">
                <input
                  type="radio"
                  name="isAuthorized"
                  checked={data.isAuthorized === false}
                  onChange={() => onChange({ ...data, isAuthorized: false })}
                  className="w-4 h-4 text-slate-400"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Board Resolution / Authorization Letter Upload */}
          <div className="space-y-2">
            <label className="fintech-label">Board Resolution / Authorization Letter (Recommended for LLC/PLC)</label>
            <p className="text-[11px] text-slate-500">
              Upload official evidence (Board Resolution or Power of Attorney on letterhead) confirming authority to operate platform accounts.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />

            {data.authorizationLetterDocUrl ? (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Board_Resolution_Authorization.pdf</span>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary text-[11px] py-1 px-2.5"
                >
                  Replace
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4 text-[#00a3d9]" />
                <span>Upload Board Resolution Document</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 3</span>
        </button>

        <button
          type="submit"
          disabled={!data.isAuthorized}
          className={`btn-primary text-xs py-2.5 px-6 flex items-center gap-2 ${
            !data.isAuthorized ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span>Continue to Step 5: Compliance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
