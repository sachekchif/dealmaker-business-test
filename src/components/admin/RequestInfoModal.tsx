import React, { useState } from 'react';
import type { VendorProfile } from '../../types';
import { HelpCircle, X, Send } from 'lucide-react';

interface RequestInfoModalProps {
  vendor: VendorProfile;
  onClose: () => void;
  onSuccess: () => void;
}

export const RequestInfoModal: React.FC<RequestInfoModalProps> = ({
  vendor,
  onClose,
  onSuccess,
}) => {
  const [informationMessage, setInformationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!informationMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header - Light Theme Purple */}
        <div className="bg-purple-50 border-b border-purple-200 text-purple-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <span>Request Additional Information</span>
          </div>
          <button onClick={onClose} className="text-purple-700 hover:text-purple-900 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendRequest} className="p-6 space-y-4 text-xs">
          <p className="text-slate-700 leading-relaxed">
            Sending official clarification request to vendor <strong>{vendor.vendorName}</strong>.
          </p>

          <div>
            <label className="fintech-label">Requested Documents / Clarification Requirements *</label>
            <textarea
              required
              rows={4}
              value={informationMessage}
              onChange={(e) => setInformationMessage(e.target.value)}
              placeholder="e.g. Please re-upload your CAC Status Report showing updated directorship details."
              className="fintech-input text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary text-xs flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700">
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Dispatching Notice...' : 'Send Clarification Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
