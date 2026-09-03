import React, { useRef } from 'react';
import type { KybComplianceData, KybDocumentItem } from '../../types/kyb';
import { ShieldCheck, UploadCloud, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step5ComplianceSectionProps {
  data: KybComplianceData;
  onChange: (updated: KybComplianceData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step5ComplianceSection: React.FC<Step5ComplianceSectionProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const scumlInputRef = useRef<HTMLInputElement | null>(null);
  const licenseInputRef = useRef<HTMLInputElement | null>(null);

  const handleScumlUpload = (file: File) => {
    const doc: KybDocumentItem = {
      id: 'doc-scuml',
      type: 'SCUML_CERTIFICATE',
      name: 'SCUML Registration Certificate',
      description: 'Special Control Unit Against Money Laundering (SCUML) clearance certificate.',
      required: true,
      acceptedTypes: 'PDF, PNG, JPG',
      maxSizeMb: 10,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileUrl: URL.createObjectURL(file),
      status: 'UPLOADED',
    };
    onChange({ ...data, scumlCertificateDoc: doc });
  };

  const handleLicenseUpload = (file: File) => {
    const doc: KybDocumentItem = {
      id: 'doc-regulatory-license',
      type: 'REGULATORY_LICENSE',
      name: 'Sector Regulatory Licence Document',
      description: 'Official sector operating licence.',
      required: true,
      acceptedTypes: 'PDF, PNG, JPG',
      maxSizeMb: 10,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileUrl: URL.createObjectURL(file),
      status: 'UPLOADED',
    };
    onChange({ ...data, regulatoryLicenseDoc: doc });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.requiresScuml === 'YES' && !data.scumlCertificateDoc?.fileUrl) {
      alert('Please upload your SCUML registration certificate.');
      return;
    }
    if (data.hasRegulatoryLicense === 'YES' && !data.regulatoryLicenseDoc?.fileUrl) {
      alert('Please upload your sector regulatory licence document.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Step 5 — Sector Regulatory Compliance</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Determine applicable Nigerian statutory requirements such as SCUML anti-money laundering registration or sector operating licences.
          </p>
        </div>
      </div>

      {/* QUESTION A: SCUML Clearance */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. SCUML (Special Control Unit Against Money Laundering) Registration
        </h3>

        <div className="space-y-3 text-xs">
          <span className="font-semibold text-slate-800 block">
            Does your business operate in a Designated Non-Financial Business & Profession (DNFI) sector requiring SCUML registration? *
          </span>
          <p className="text-[11px] text-slate-500">
            Examples include real estate, car dealers, luxury goods dealers, jewellers, audit/accounting firms, and legal practitioners.
          </p>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="radio"
                name="requiresScuml"
                value="YES"
                checked={data.requiresScuml === 'YES'}
                onChange={() => onChange({ ...data, requiresScuml: 'YES' })}
                className="w-4 h-4 text-[#00a3d9]"
              />
              <span>Yes — SCUML Registration Applies</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="radio"
                name="requiresScuml"
                value="NO"
                checked={data.requiresScuml === 'NO'}
                onChange={() => onChange({ ...data, requiresScuml: 'NO' })}
                className="w-4 h-4 text-[#00a3d9]"
              />
              <span>No</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600">
              <input
                type="radio"
                name="requiresScuml"
                value="NOT_SURE"
                checked={data.requiresScuml === 'NOT_SURE'}
                onChange={() => onChange({ ...data, requiresScuml: 'NOT_SURE' })}
                className="w-4 h-4 text-slate-400"
              />
              <span>Not Sure</span>
            </label>
          </div>

          {/* SCUML Document Upload Field (If YES) */}
          {data.requiresScuml === 'YES' && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 pt-4 animate-fade-in">
              <label className="fintech-label">Upload Official SCUML Certificate *</label>
              <input
                ref={scumlInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => e.target.files?.[0] && handleScumlUpload(e.target.files[0])}
                className="hidden"
              />

              {data.scumlCertificateDoc?.fileUrl ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">{data.scumlCertificateDoc.fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scumlInputRef.current?.click()}
                    className="btn-secondary text-[11px] py-1 px-2.5"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => scumlInputRef.current?.click()}
                  className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 text-[#00a3d9]" />
                  <span>Choose SCUML Certificate File</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* QUESTION B: Sector Regulatory Licence */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Sector Regulatory Operating Licence
        </h3>

        <div className="space-y-3 text-xs">
          <span className="font-semibold text-slate-800 block">
            Does your business operate under a statutory sector-specific regulatory licence? *
          </span>
          <p className="text-[11px] text-slate-500">
            Examples: Central Bank of Nigeria (CBN), SEC, NAICOM, NCC, NAFDAC, or PCN approvals.
          </p>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="radio"
                name="hasRegulatoryLicense"
                value="YES"
                checked={data.hasRegulatoryLicense === 'YES'}
                onChange={() => onChange({ ...data, hasRegulatoryLicense: 'YES' })}
                className="w-4 h-4 text-[#00a3d9]"
              />
              <span>Yes — Sector Licence Active</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="radio"
                name="hasRegulatoryLicense"
                value="NO"
                checked={data.hasRegulatoryLicense === 'NO'}
                onChange={() => onChange({ ...data, hasRegulatoryLicense: 'NO' })}
                className="w-4 h-4 text-[#00a3d9]"
              />
              <span>No</span>
            </label>
          </div>

          {/* Regulatory License Details & Upload (If YES) */}
          {data.hasRegulatoryLicense === 'YES' && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 pt-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="fintech-label">Regulatory Body *</label>
                  <input
                    type="text"
                    value={data.regulatoryBody || ''}
                    onChange={(e) => onChange({ ...data, regulatoryBody: e.target.value })}
                    placeholder="e.g. Central Bank of Nigeria (CBN)"
                    className="fintech-input"
                  />
                </div>

                <div>
                  <label className="fintech-label">Licence Number *</label>
                  <input
                    type="text"
                    value={data.licenseNumber || ''}
                    onChange={(e) => onChange({ ...data, licenseNumber: e.target.value })}
                    placeholder="e.g. CBN/PSO/2024/098"
                    className="fintech-input font-mono"
                  />
                </div>

                <div>
                  <label className="fintech-label">Licence Expiry Date</label>
                  <input
                    type="date"
                    value={data.licenseExpiryDate || ''}
                    onChange={(e) => onChange({ ...data, licenseExpiryDate: e.target.value })}
                    className="fintech-input"
                  />
                </div>
              </div>

              <div>
                <label className="fintech-label">Upload Regulatory Licence Document *</label>
                <input
                  ref={licenseInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => e.target.files?.[0] && handleLicenseUpload(e.target.files[0])}
                  className="hidden"
                />

                {data.regulatoryLicenseDoc?.fileUrl ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold">{data.regulatoryLicenseDoc.fileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => licenseInputRef.current?.click()}
                      className="btn-secondary text-[11px] py-1 px-2.5"
                    >
                      Replace
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => licenseInputRef.current?.click()}
                    className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4 text-[#00a3d9]" />
                    <span>Choose Licence File</span>
                  </button>
                )}
              </div>
            </div>
          )}
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
          <span>Back to Step 4</span>
        </button>

        <button type="submit" className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2">
          <span>Continue to Step 6: Review & Submit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
