import React, { useState } from 'react';
import { Shield, Info } from 'lucide-react';

interface RepresentativeFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    ninOrBvn: string;
    positionTitle: string;
  };
  businessName: string;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    ninOrBvn: string;
    positionTitle: string;
  }) => void;
}

export const RepresentativeForm: React.FC<RepresentativeFormProps> = ({
  initialData,
  businessName,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.positionTitle.trim()) errs.positionTitle = 'Position/Title in business is required';
    if (!formData.ninOrBvn.trim() || formData.ninOrBvn.length < 11) {
      errs.ninOrBvn = 'Valid 11-digit NIN/BVN is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900">Representative Authorization & Verification</h2>
        </div>
        <p className="text-sm text-slate-600">
          The person registering is the official representative acting on behalf of <strong className="text-slate-900">{businessName || 'this business'}</strong>.
        </p>
      </div>

      <div className="bg-indigo-50/60 border border-indigo-100 rounded-lg p-4 flex gap-3 text-xs text-indigo-900">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-0.5">Corporate Representative Authority</p>
          <p>
            You must be a director, proprietor, legal officer, or delegated executive with authority to bind the business to platform terms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="fintech-label">Representative First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`fintech-input ${errors.firstName ? 'border-rose-500' : ''}`}
          />
          {errors.firstName && <p className="text-xs text-rose-600 mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="fintech-label">Representative Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`fintech-input ${errors.lastName ? 'border-rose-500' : ''}`}
          />
          {errors.lastName && <p className="text-xs text-rose-600 mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="fintech-label">Official Work Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`fintech-input ${errors.email ? 'border-rose-500' : ''}`}
          />
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="fintech-label">Position / Role Title *</label>
          <input
            type="text"
            value={formData.positionTitle}
            onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
            placeholder="e.g. Managing Director, Principal Proprietor, Head of Business"
            className={`fintech-input ${errors.positionTitle ? 'border-rose-500' : ''}`}
          />
          {errors.positionTitle && <p className="text-xs text-rose-600 mt-1">{errors.positionTitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="fintech-label">Representative Phone *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`fintech-input ${errors.phone ? 'border-rose-500' : ''}`}
          />
          {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="fintech-label">Representative NIN / BVN *</label>
          <input
            type="text"
            maxLength={11}
            value={formData.ninOrBvn}
            onChange={(e) => setFormData({ ...formData, ninOrBvn: e.target.value.replace(/\D/g, '') })}
            className={`fintech-input tracking-wider font-mono ${errors.ninOrBvn ? 'border-rose-500' : ''}`}
          />
          {errors.ninOrBvn && <p className="text-xs text-rose-600 mt-1">{errors.ninOrBvn}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <span>Proceed to Document Upload</span>
        </button>
      </div>
    </form>
  );
};
