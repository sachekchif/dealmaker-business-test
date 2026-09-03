import React, { useState } from 'react';
import type { VendorProfile, AuditLog } from '../../types';
import { AppStoreService } from '../../services/store';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Building, 
  FileText, 
  User, 
  X,
  RefreshCw,
  ArrowRightLeft,
  ShieldOff,
  HelpCircle,
  Clock
} from 'lucide-react';

interface AdminVendorDetailProps {
  vendor: VendorProfile;
  onClose: () => void;
  onRefresh: () => void;
  onOpenRoleTransition: (vendor: VendorProfile) => void;
  onOpenSuspendModal: (vendor: VendorProfile) => void;
  onRequestInfo: (vendor: VendorProfile) => void;
}

export const AdminVendorDetail: React.FC<AdminVendorDetailProps> = ({
  vendor,
  onClose,
  onRefresh,
  onOpenRoleTransition,
  onOpenSuspendModal,
  onRequestInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'representative' | 'audit'>('profile');
  const [isProcessing, setIsProcessing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  const auditLogs: AuditLog[] = AppStoreService.getAuditLogs().filter(
    (log) => log.targetEntityId === vendor.id
  );

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      AppStoreService.approveVendor(vendor.id, 'Compliance Super Admin');
      setIsProcessing(false);
      onRefresh();
    }, 600);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionReason.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      AppStoreService.rejectVendor(vendor.id, rejectionReason, 'Compliance Super Admin');
      setIsProcessing(false);
      setShowRejectBox(false);
      onRefresh();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header - Light Theme Soft Cyan (#e8f4fb) */}
        <div className="bg-[#e8f4fb] text-slate-900 p-6 flex items-center justify-between border-b border-[#d0e7f7] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold text-base shadow-xs">
              {vendor.vendorName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{vendor.vendorName}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-300">
                  {vendor.id}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Category: <strong>{vendor.vendorCategory}</strong> • Representative: {vendor.representative.firstName} {vendor.representative.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                vendor.verificationStatus === 'VERIFIED'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : vendor.verificationStatus === 'SUSPENDED'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              {vendor.verificationStatus}
            </span>
            <button onClick={onClose} className="p-1 rounded-md text-slate-500 hover:text-slate-900">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenRoleTransition(vendor)}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#00a3d9]" />
              <span>Role Transition</span>
            </button>

            <button
              onClick={() => onOpenSuspendModal(vendor)}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-rose-700 hover:bg-rose-50"
            >
              <ShieldOff className="w-3.5 h-3.5 text-rose-600" />
              <span>{vendor.accountStatus === 'SUSPENDED' ? 'Reactivate' : 'Suspend Vendor'}</span>
            </button>

            <button
              onClick={() => onRequestInfo(vendor)}
              className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Request Info</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {vendor.verificationStatus !== 'VERIFIED' && (
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="btn-primary text-xs py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5"
              >
                {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                <span>Approve & Verify</span>
              </button>
            )}

            {vendor.verificationStatus !== 'FAILED' && (
              <button
                onClick={() => setShowRejectBox(!showRejectBox)}
                className="btn-secondary text-xs py-1.5 px-3 text-rose-700 hover:bg-rose-50"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Reject Application</span>
              </button>
            )}
          </div>
        </div>

        {/* Reject Reason Box */}
        {showRejectBox && (
          <form onSubmit={handleRejectSubmit} className="bg-rose-50 p-4 border-b border-rose-200 space-y-3 shrink-0">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Specify Compliance Rejection Rationale</span>
            </div>
            <textarea
              required
              rows={2}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Uploaded CAC certificate is illegible or name mismatch on government portal."
              className="fintech-input text-xs"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowRejectBox(false)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" disabled={isProcessing} className="btn-primary text-xs bg-rose-600 hover:bg-rose-700">
                Submit Rejection Notice
              </button>
            </div>
          </form>
        )}

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-6 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Business Profile & CAC</span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'documents' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Uploaded Documents ({vendor.businessProfile?.documents.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('representative')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'representative' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Representative & Identity</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'audit' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Compliance Audit Trail ({auditLogs.length})</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Registration Number</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">{vendor.businessProfile?.registrationNumber || 'N/A'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Tax Identification Number (TIN)</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">{vendor.businessProfile?.tinNumber || 'N/A'}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Business Legal Structure</span>
                  <p className="font-bold text-slate-900 text-sm">{vendor.businessProfile?.businessType?.replace(/_/g, ' ') || 'Sole Proprietorship'}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Registered Office Address</h4>
                <p className="text-slate-700">{vendor.businessProfile?.registeredAddress || 'N/A'}, {vendor.businessProfile?.city}, {vendor.businessProfile?.state} State</p>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              {vendor.businessProfile?.documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#00a3d9]" />
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-[11px] text-slate-500">{doc.fileName} • {doc.fileSize}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'representative' && (
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900">Authorized Representative Details</h4>
              <p className="text-slate-700">Name: {vendor.representative.firstName} {vendor.representative.lastName}</p>
              <p className="text-slate-700">Position: {vendor.representative.positionTitle}</p>
              <p className="text-slate-700">Email: {vendor.representative.email}</p>
              <p className="text-slate-700">NIN/BVN: {vendor.representative.ninOrBvn}</p>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-3">
              {auditLogs.map((log: AuditLog) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#00a3d9]">{log.action}</span>
                    <span className="text-slate-400 font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-700">{log.details}</p>
                  <span className="text-[10px] text-slate-500">By: {log.performedBy}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
