import React, { useState } from 'react';
import type { VerificationDocument, BusinessStructure, VendorCategory } from '../../types';
import { DealMakerApiService } from '../../services/api';
import { Upload, CheckCircle2, AlertCircle, RefreshCw, File } from 'lucide-react';

interface DocumentUploadFormProps {
  documents: VerificationDocument[];
  businessType?: BusinessStructure;
  vendorCategory?: VendorCategory;
  onUpdateDocuments: (docs: VerificationDocument[]) => void;
  onSubmit: () => void;
}

export const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  documents,
  businessType,
  vendorCategory,
  onUpdateDocuments,
  onSubmit,
}) => {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Helper to get required document list dynamically
  const getRequiredDocSpecs = (): { type: VerificationDocument['type']; name: string; required: boolean }[] => {
    if (vendorCategory === 'RETAIL_NON_BUSINESS') {
      return [
        { type: 'INDIVIDUAL_IDENTITY_PROOF', name: 'Government ID (NIN Slip, Voter Card, Driver License)', required: true },
        { type: 'UTILITY_BILL', name: 'Proof of Address (Utility Bill / Bank Statement)', required: true },
      ];
    }

    if (businessType === 'REGISTERED_BUSINESS_NAME') {
      return [
        { type: 'CAC_CERTIFICATE', name: 'CAC Business Name Certificate (BN Form)', required: true },
        { type: 'INDIVIDUAL_IDENTITY_PROOF', name: 'Proprietor Identity Document', required: true },
        { type: 'UTILITY_BILL', name: 'Proof of Business Address', required: true },
      ];
    }

    if (businessType === 'LIMITED_LIABILITY' || businessType === 'PLC_CORPORATE') {
      return [
        { type: 'CAC_CERTIFICATE', name: 'Certificate of Incorporation (CAC RC Cert)', required: true },
        { type: 'STATUS_REPORT_FORM', name: 'CAC Status Report / Form 1.1 / CAC 2 & 7', required: true },
        { type: 'REPRESENTATIVE_AUTHORIZATION', name: 'Board Resolution / Authorization Letter', required: true },
        { type: 'DIRECTOR_ID', name: 'Director / Representative Valid ID', required: true },
        { type: 'TAX_IDENTIFICATION', name: 'Tax Identification Number (TIN) Certificate', required: false },
      ];
    }

    if (businessType === 'PARTNERSHIP') {
      return [
        { type: 'PARTNERSHIP_DEED', name: 'Partnership Agreement / Deed', required: true },
        { type: 'CAC_CERTIFICATE', name: 'CAC Partnership Certificate', required: true },
        { type: 'INDIVIDUAL_IDENTITY_PROOF', name: 'Managing Partner Valid ID', required: true },
      ];
    }

    // Default
    return [
      { type: 'INDIVIDUAL_IDENTITY_PROOF', name: 'Identity Proof', required: true },
      { type: 'UTILITY_BILL', name: 'Address Proof', required: true },
    ];
  };

  const specs = getRequiredDocSpecs();

  // Merge specs with current documents
  const activeDocs = specs.map((spec) => {
    const existing = documents.find((d) => d.type === spec.type);
    if (existing) return existing;
    return {
      id: `doc-spec-${spec.type}`,
      type: spec.type,
      name: spec.name,
      fileName: '',
      fileSize: '',
      uploadDate: '',
      status: 'PENDING' as const,
      required: spec.required,
    };
  });

  const handleFileUpload = async (docType: VerificationDocument['type'], file: File) => {
    setUploadingId(docType);

    // Call live API upload endpoint POST /files/upload
    const apiRes = await DealMakerApiService.uploadFile(file, 'kyc');
    console.log('Live File Upload API Result:', apiRes);

    const updated = activeDocs.map((doc) => {
      if (doc.type === docType) {
        return {
          ...doc,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'PENDING' as const,
          rejectionReason: undefined,
          fileUrl: apiRes.data?.fileUrl || apiRes.data?.url,
        };
      }
      return doc;
    });

    onUpdateDocuments(updated);
    setUploadingId(null);
  };

  const allRequiredUploaded = activeDocs
    .filter((d) => d.required)
    .every((d) => d.fileName && d.fileName.length > 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">Upload Verification Documents</h2>
        <p className="text-sm text-slate-600">
          Upload clear, legible PDF or high-resolution image files (Max 5MB each). Documents are uploaded securely to Deal Maker CDN.
        </p>
      </div>

      <div className="space-y-4">
        {activeDocs.map((doc) => {
          const isUploaded = !!doc.fileName;
          const isUploading = uploadingId === doc.type;
          const isRejected = doc.status === 'REJECTED';

          return (
            <div
              key={doc.type}
              className={`fintech-card p-4 transition-all ${
                isRejected ? 'border-rose-300 bg-rose-50/20' : isUploaded ? 'border-emerald-200 bg-emerald-50/10' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{doc.name}</span>
                    {doc.required ? (
                      <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        Required
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Optional</span>
                    )}
                  </div>

                  {isUploaded && (
                    <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-mono text-slate-800">
                        <File className="w-3.5 h-3.5 text-blue-600" />
                        {doc.fileName}
                      </span>
                      <span>({doc.fileSize})</span>
                      <span className="text-slate-400">• Uploaded {doc.uploadDate}</span>
                    </div>
                  )}

                  {isRejected && doc.rejectionReason && (
                    <div className="bg-rose-100 text-rose-800 text-xs p-2 rounded mt-2 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p>
                        <strong>Rejected:</strong> {doc.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isUploading ? (
                    <div className="flex items-center gap-2 text-xs text-blue-600 font-medium px-3 py-2 bg-blue-50 rounded">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Uploading to API...</span>
                    </div>
                  ) : isUploaded ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Uploaded
                      </span>
                      <label className="btn-secondary text-xs py-1 px-2.5 cursor-pointer">
                        <span>Replace</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.type, file);
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="btn-primary text-xs py-2 px-3 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.type, file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          * All required documents must be uploaded before submitting for verification review.
        </p>

        <button
          onClick={onSubmit}
          disabled={!allRequiredUploaded}
          className="btn-primary"
        >
          <span>Submit for Verification</span>
        </button>
      </div>
    </div>
  );
};
