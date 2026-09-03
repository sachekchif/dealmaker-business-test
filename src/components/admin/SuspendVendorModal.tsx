import React, { useState } from 'react';
import type { VendorProfile } from '../../types';
import { AppStoreService } from '../../services/store';
import { ShieldOff, X } from 'lucide-react';

interface SuspendVendorModalProps {
  vendor: VendorProfile;
  onClose: () => void;
  onSuccess: () => void;
}

export const SuspendVendorModal: React.FC<SuspendVendorModalProps> = ({
  vendor,
  onClose,
  onSuccess,
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSuspended = vendor.accountStatus === 'SUSPENDED';

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Mandatory audit justification required.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      AppStoreService.suspendVendor(
        vendor.id,
        reason,
        {
          disableCommission: !isSuspended,
          disableOnboarding: !isSuspended,
          disableTransactions: !isSuspended,
        },
        'Super Admin (Compliance)'
      );
      setIsSubmitting(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header - Light Theme Soft Rose */}
        <div className="bg-rose-50 border-b border-rose-200 text-rose-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base">
            <ShieldOff className="w-5 h-5 text-rose-600" />
            <span>{isSuspended ? 'Reactivate Vendor Account' : 'Suspend Vendor Account'}</span>
          </div>
          <button onClick={onClose} className="text-rose-700 hover:text-rose-900 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAction} className="p-6 space-y-4 text-xs">
          <p className="text-slate-700 leading-relaxed">
            Target Entity: <strong className="text-slate-900 font-bold">{vendor.vendorName}</strong> ({vendor.id})
          </p>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
            <p className="text-[11px] leading-relaxed">
              {isSuspended
                ? 'Reactivating will restore commission payout routing, referral link access, and client trading capabilities.'
                : 'Suspending will freeze all pending commission payouts, disable referral registration links, and trigger compliance holds.'}
            </p>
          </div>

          <div>
            <label className="fintech-label">Compliance Audit Justification *</label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isSuspended ? 'e.g. Cleared documentation review.' : 'e.g. Expired CAC tax clearance.'}
              className="fintech-input text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-xs font-bold px-4 py-2 rounded-lg text-white transition-all ${
                isSuspended ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {isSubmitting ? 'Processing...' : isSuspended ? 'Reactivate Account' : 'Confirm Suspension'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
