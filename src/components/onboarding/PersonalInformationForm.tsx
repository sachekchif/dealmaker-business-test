import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface PersonalInformationFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    ninOrBvn: string;
  };
  isBusinessVendor: boolean;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    ninOrBvn: string;
  }) => void;
}

export const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  initialData,
  isBusinessVendor,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email address is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid phone number is required';
    if (!formData.address.trim()) errs.address = 'Residential or primary address is required';
    if (!formData.ninOrBvn.trim() || formData.ninOrBvn.length < 11) {
      errs.ninOrBvn = 'Valid 11-digit NIN or BVN number is required for verification';
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
        <h2 className="text-xl font-bold text-slate-900">
          {isBusinessVendor ? 'Representative Identity Details' : 'Personal Identity & Contact Information'}
        </h2>
        <p className="text-sm text-slate-600">
          {isBusinessVendor 
            ? 'Provide details for the authorized representative registering this business account.' 
            : 'Enter your personal details to begin identity verification.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="fintech-label">First Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="e.g. Samuel"
              className={`fintech-input pl-9 ${errors.firstName ? 'border-rose-500' : ''}`}
            />
          </div>
          {errors.firstName && <p className="text-xs text-rose-600 mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="fintech-label">Last Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="e.g. Okonkwo"
              className={`fintech-input pl-9 ${errors.lastName ? 'border-rose-500' : ''}`}
            />
          </div>
          {errors.lastName && <p className="text-xs text-rose-600 mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="fintech-label">Email Address *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="samuel@example.ng"
              className={`fintech-input pl-9 ${errors.email ? 'border-rose-500' : ''}`}
            />
          </div>
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="fintech-label">Phone Number *</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 803 000 0000"
              className={`fintech-input pl-9 ${errors.phone ? 'border-rose-500' : ''}`}
            />
          </div>
          {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="fintech-label">Residential Address *</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="House/Street Address, City, State"
            className={`fintech-input pl-9 ${errors.address ? 'border-rose-500' : ''}`}
          />
        </div>
        {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Identity Verification (NIN / BVN)</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Required for Central Bank of Nigeria (CBN) compliance & identity matching. We verify your identity securely via encrypted government database match.
        </p>

        <div>
          <label className="fintech-label">NIN or BVN Number (11 Digits) *</label>
          <input
            type="text"
            maxLength={11}
            value={formData.ninOrBvn}
            onChange={(e) => setFormData({ ...formData, ninOrBvn: e.target.value.replace(/\D/g, '') })}
            placeholder="22334455667"
            className={`fintech-input tracking-widest font-mono text-sm ${errors.ninOrBvn ? 'border-rose-500' : ''}`}
          />
          {errors.ninOrBvn && <p className="text-xs text-rose-600 mt-1">{errors.ninOrBvn}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <span>Continue to Next Step</span>
        </button>
      </div>
    </form>
  );
};
