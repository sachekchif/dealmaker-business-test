import React, { useState } from 'react';
import type { BusinessStructure } from '../../types';
import { AppStoreService } from '../../services/store';
import { Building2, FileText, MapPin, Hash } from 'lucide-react';

interface BusinessInformationFormProps {
  initialData: {
    businessName: string;
    registrationNumber: string;
    tinNumber: string;
    registeredAddress: string;
    state: string;
    city: string;
    industry: string;
  };
  businessType: BusinessStructure;
  onSubmit: (data: {
    businessName: string;
    registrationNumber: string;
    tinNumber: string;
    registeredAddress: string;
    state: string;
    city: string;
    industry: string;
  }) => void;
  onDuplicateDetected: (businessName: string, existingVendorName: string) => void;
}

export const BusinessInformationForm: React.FC<BusinessInformationFormProps> = ({
  initialData,
  businessType,
  onSubmit,
  onDuplicateDetected,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiresCAC = businessType !== 'SOLE_PROPRIETORSHIP' && businessType !== 'NON_REGISTERED_INDIVIDUAL';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.businessName.trim()) errs.businessName = 'Business name is required';
    if (requiresCAC && !formData.registrationNumber.trim()) {
      errs.registrationNumber = 'CAC Registration / RC Number is required for this business structure';
    }
    if (!formData.registeredAddress.trim()) errs.registeredAddress = 'Registered business address is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    if (!formData.city.trim()) errs.city = 'City is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Check duplicate business scenario
    const check = AppStoreService.checkBusinessExists(formData.businessName, formData.registrationNumber);
    if (check.exists && check.existingVendor) {
      onDuplicateDetected(formData.businessName, check.existingVendor.vendorName);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">Business Registration Information</h2>
        <p className="text-sm text-slate-600">
          Enter official business details as registered with CAC (Corporate Affairs Commission) or tax authorities.
        </p>
      </div>

      <div>
        <label className="fintech-label">Registered Business / Corporate Name *</label>
        <div className="relative">
          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="e.g. Samuel & Co. Enterprise Ltd"
            className={`fintech-input pl-9 ${errors.businessName ? 'border-rose-500' : ''}`}
          />
        </div>
        {errors.businessName && <p className="text-xs text-rose-600 mt-1">{errors.businessName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="fintech-label">
            {requiresCAC ? 'CAC Registration Number (RC / BN) *' : 'CAC RC/BN (Optional)'}
          </label>
          <div className="relative">
            <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              placeholder={businessType === 'LIMITED_LIABILITY' ? 'RC-1049281' : 'BN-3849201'}
              className={`fintech-input pl-9 uppercase font-mono ${errors.registrationNumber ? 'border-rose-500' : ''}`}
            />
          </div>
          {errors.registrationNumber && <p className="text-xs text-rose-600 mt-1">{errors.registrationNumber}</p>}
        </div>

        <div>
          <label className="fintech-label">Tax Identification Number (TIN / JTB)</label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={formData.tinNumber}
              onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
              placeholder="e.g. 10928374-0001"
              className="fintech-input pl-9 font-mono"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="fintech-label">Registered Business Address *</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={formData.registeredAddress}
            onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
            placeholder="Official physical office or operating address"
            className={`fintech-input pl-9 ${errors.registeredAddress ? 'border-rose-500' : ''}`}
          />
        </div>
        {errors.registeredAddress && <p className="text-xs text-rose-600 mt-1">{errors.registeredAddress}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="fintech-label">State *</label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="fintech-input"
          >
            <option value="Lagos">Lagos</option>
            <option value="Abuja (FCT)">Abuja (FCT)</option>
            <option value="Rivers">Rivers</option>
            <option value="Kano">Kano</option>
            <option value="Oyo">Oyo</option>
            <option value="Enugu">Enugu</option>
            <option value="Delta">Delta</option>
            <option value="Ogun">Ogun</option>
            <option value="Kaduna">Kaduna</option>
          </select>
        </div>

        <div>
          <label className="fintech-label">City / LGA *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Ikeja, Yaba, Victoria Island"
            className={`fintech-input ${errors.city ? 'border-rose-500' : ''}`}
          />
          {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="fintech-label">Industry Sector</label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="fintech-input"
          >
            <option value="E-Commerce & Retail">E-Commerce & Retail</option>
            <option value="Financial Services & Fintech">Financial Services & Fintech</option>
            <option value="Logistics & Delivery">Logistics & Delivery</option>
            <option value="Real Estate & Property">Real Estate & Property</option>
            <option value="FMCG & Wholesale">FMCG & Wholesale</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Technology & Software">Technology & Software</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <span>Continue to Representative Step</span>
        </button>
      </div>
    </form>
  );
};
