import React from 'react';
import { AlertTriangle, UserCheck, ShieldAlert, ArrowRight, X } from 'lucide-react';

interface DuplicateBusinessModalProps {
  businessName: string;
  existingVendorName: string;
  onClose: () => void;
  onRequestAccess: () => void;
  onClaimRepresentative: () => void;
}

export const DuplicateBusinessModal: React.FC<DuplicateBusinessModalProps> = ({
  businessName,
  existingVendorName,
  onClose,
  onRequestAccess,
  onClaimRepresentative,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Business Profile Already Exists</span>
          </div>
          <button onClick={onClose} className="text-amber-800 hover:text-amber-950 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Our database matched <strong className="text-slate-900">{businessName}</strong> with an existing registered entity (<span className="font-semibold text-slate-800">{existingVendorName}</span>).
          </p>
          <p className="text-xs text-slate-500">
            To maintain regulatory compliance and security, duplicate business profiles cannot be created directly. Please select an authorized action below:
          </p>

          <div className="space-y-3 pt-2">
            <button
              onClick={onRequestAccess}
              className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all flex items-start gap-3 group"
            >
              <UserCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Request Access / Join Team</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Send an authorization request to the existing business administrator for team member access.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-1" />
            </button>

            <button
              onClick={onClaimRepresentative}
              className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all flex items-start gap-3 group"
            >
              <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">Become Authorized Representative</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Submit board authorization or CAC Form 1.1 proof to update or claim the official corporate representative role.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-1" />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs">
            <span>Cancel & Change Business Name</span>
          </button>
        </div>
      </div>
    </div>
  );
};
