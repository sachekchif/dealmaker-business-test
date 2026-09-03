import React, { useState } from 'react';
import type { VendorProfile, UserRole } from '../../types';
import { AppStoreService } from '../../services/store';
import { ArrowRightLeft, AlertTriangle, X } from 'lucide-react';

interface RoleTransitionModalProps {
  vendor: VendorProfile;
  onClose: () => void;
  onSuccess: () => void;
}

export const RoleTransitionModal: React.FC<RoleTransitionModalProps> = ({
  vendor,
  onClose,
  onSuccess,
}) => {
  const [targetRole, setTargetRole] = useState<UserRole>('BUSINESS_USER');
  const [auditNotes, setAuditNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExecuteTransition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditNotes.trim()) {
      alert('Mandatory audit notes required for role transition.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      AppStoreService.transitionVendorRole(vendor.id, targetRole, auditNotes, 'Super Admin (Compliance)');
      setIsSubmitting(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header - Light Theme */}
        <div className="bg-[#e8f4fb] border-b border-[#d0e7f7] text-slate-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base">
            <ArrowRightLeft className="w-5 h-5 text-[#00a3d9]" />
            <span>Admin Role Transition Tool</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleExecuteTransition} className="p-6 space-y-4 text-xs">
          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2.5 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-xs">High-Privilege Transition Warning</h4>
              <p className="text-[11px] leading-relaxed">
                Transitioning vendor <strong>{vendor.vendorName}</strong> will reconfigure platform permission flags, commission distribution schemas, and settlement controls.
              </p>
            </div>
          </div>

          {/* Current vs Target Comparison */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 font-semibold block text-[10px] uppercase">Current Active Category</span>
              <span className="font-bold text-slate-900 text-xs">{vendor.vendorCategory}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block text-[10px] uppercase">Target Proposed Role</span>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as UserRole)}
                className="fintech-input text-xs py-1 px-2 mt-0.5"
              >
                <option value="RETAIL_VENDOR_NON_BUSINESS">Retail Vendor (Non-Business)</option>
                <option value="RETAIL_VENDOR_BUSINESS">Retail Vendor (Business Name)</option>
                <option value="CORPORATE_VENDOR">Corporate Vendor (LLC/PLC)</option>
                <option value="BUSINESS_USER">Business User</option>
              </select>
            </div>
          </div>

          {/* Audit Trail Logging Notes */}
          <div>
            <label className="fintech-label">Mandatory Audit Rationale & Reason *</label>
            <textarea
              required
              rows={3}
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
              placeholder="e.g. CAC Certificate BN-3849201 verified on government portal. Approved for Retail Vendor Business Name tier."
              className="fintech-input text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary text-xs">
              {isSubmitting ? 'Updating Privilege Matrix...' : 'Confirm Role Transition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
