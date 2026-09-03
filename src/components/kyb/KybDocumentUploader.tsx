import React, { useRef, useState } from 'react';
import type { KybDocumentItem } from '../../types/kyb';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Trash2, 
  File, 
  Clock
} from 'lucide-react';

interface KybDocumentUploaderProps {
  document: KybDocumentItem;
  onUpdate: (updatedDoc: KybDocumentItem) => void;
}

export const KybDocumentUploader: React.FC<KybDocumentUploaderProps> = ({
  document: doc,
  onUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelected = (file: File) => {
    if (file.size > doc.maxSizeMb * 1024 * 1024) {
      alert(`Upload failed. File exceeds the ${doc.maxSizeMb}MB size limit. Please choose a smaller file.`);
      return;
    }

    onUpdate({
      ...doc,
      status: 'UPLOADING',
      uploadProgress: 20,
    });

    let progress = 20;
    const interval = setInterval(() => {
      progress += 30;
      if (progress >= 100) {
        clearInterval(interval);
        onUpdate({
          ...doc,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          fileUrl: URL.createObjectURL(file),
          uploadProgress: 100,
          status: 'UPLOADED',
          uploadedAt: new Date().toISOString(),
          rejectionReason: undefined,
        });
      } else {
        onUpdate({
          ...doc,
          status: 'UPLOADING',
          uploadProgress: progress,
        });
      }
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onUpdate({
      ...doc,
      fileName: undefined,
      fileSize: undefined,
      fileUrl: undefined,
      uploadProgress: undefined,
      status: 'NOT_UPLOADED',
      rejectionReason: undefined,
    });
  };

  return (
    <div className="fintech-card p-5 bg-white border border-slate-200 rounded-xl space-y-4">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
            {doc.required ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                Required
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                Optional
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">{doc.description}</p>
        </div>

        {/* Status Tag */}
        <div className="shrink-0">
          {doc.status === 'VERIFIED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified
            </span>
          )}
          {doc.status === 'UPLOADED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00a3d9]" />
              Uploaded
            </span>
          )}
          {doc.status === 'UNDER_REVIEW' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              Under Review
            </span>
          )}
          {doc.status === 'REJECTED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Rejected
            </span>
          )}
          {doc.status === 'NOT_UPLOADED' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
              Not Uploaded
            </span>
          )}
        </div>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
        className="hidden"
      />

      {/* Rejection Alert Box */}
      {doc.status === 'REJECTED' && (
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg flex items-start gap-2.5 text-rose-900 text-xs animate-fade-in">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <p className="font-bold">Document Rejected by Compliance Officer</p>
            <p className="text-[11px] text-rose-800">{doc.rejectionReason || 'Illegible scan or document name mismatch.'}</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-bold text-rose-700 underline hover:text-rose-900 pt-1 block"
            >
              Click here to upload replacement document
            </button>
          </div>
        </div>
      )}

      {/* Upload Progress State */}
      {doc.status === 'UPLOADING' && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#00a3d9] animate-spin" />
              <span>Uploading document...</span>
            </span>
            <span>{doc.uploadProgress || 0}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#00a3d9] h-full transition-all duration-200"
              style={{ width: `${doc.uploadProgress || 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Uploaded / Verified State Display */}
      {(doc.status === 'UPLOADED' || doc.status === 'VERIFIED' || doc.status === 'UNDER_REVIEW') && doc.fileName && (
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-lg bg-cyan-100 text-[#00a3d9] flex items-center justify-center shrink-0">
              <File className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="font-bold text-slate-900 truncate">{doc.fileName}</p>
              <p className="text-[10px] text-slate-500">{doc.fileSize} • Uploaded {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Just now'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3 text-slate-500" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-all"
              title="Remove document"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Drag & Drop Upload Zone (Shown when NOT_UPLOADED) */}
      {doc.status === 'NOT_UPLOADED' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
            isDragging
              ? 'border-[#00a3d9] bg-cyan-50/50'
              : 'border-slate-300 hover:border-[#00a3d9] hover:bg-slate-50'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#e8f4fb] text-[#00a3d9] flex items-center justify-center">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">
              Click to select or drag and drop document here
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Supported Formats: {doc.acceptedTypes} (Max File Size: {doc.maxSizeMb}MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
