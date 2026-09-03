import React from 'react';
import type { KybDocumentItem } from '../../types/kyb';
import { KybDocumentUploader } from './KybDocumentUploader';
import { FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step2BusinessDocumentsFormProps {
  documents: KybDocumentItem[];
  onChange: (updatedDocs: KybDocumentItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2BusinessDocumentsForm: React.FC<Step2BusinessDocumentsFormProps> = ({
  documents,
  onChange,
  onNext,
  onBack,
}) => {
  const handleSingleDocUpdate = (updatedDoc: KybDocumentItem) => {
    const nextDocs = documents.map((d) => (d.id === updatedDoc.id ? updatedDoc : d));
    onChange(nextDocs);
  };

  const requiredMissingCount = documents.filter(
    (d) => d.required && (d.status === 'NOT_UPLOADED' || d.status === 'REJECTED')
  ).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requiredMissingCount > 0) {
      alert(`Cannot proceed. Please upload all required compliance documents (${requiredMissingCount} missing).`);
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <FileText className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Step 2 — Official Business Documents</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Upload clear, high-resolution PDF or image scans of your company's official CAC incorporation certificate, status report, tax clearance, and address verification.
          </p>
        </div>
      </div>

      {/* Document Uploaders List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <KybDocumentUploader
            key={doc.id}
            document={doc}
            onUpdate={handleSingleDocUpdate}
          />
        ))}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 1</span>
        </button>

        <button
          type="submit"
          disabled={requiredMissingCount > 0}
          className={`btn-primary text-xs py-2.5 px-6 flex items-center gap-2 ${
            requiredMissingCount > 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span>Continue to Step 3: Ownership & Directors</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
