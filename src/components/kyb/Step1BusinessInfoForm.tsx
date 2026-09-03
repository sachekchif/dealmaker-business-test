import React from 'react';
import type { KybBusinessDetails } from '../../types/kyb';
import type { BusinessStructure } from '../../types';
import { Building2, CheckCircle2, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

interface Step1BusinessInfoFormProps {
  data: KybBusinessDetails;
  onChange: (updated: KybBusinessDetails) => void;
  onNext: () => void;
}

export const Step1BusinessInfoForm: React.FC<Step1BusinessInfoFormProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const handleRegisteredAddressChange = (field: string, val: string) => {
    onChange({
      ...data,
      registeredAddress: {
        ...data.registeredAddress,
        [field]: val,
      },
    });
  };

  const handleOperatingAddressChange = (field: string, val: string) => {
    onChange({
      ...data,
      operatingAddress: {
        country: data.operatingAddress?.country || 'Nigeria',
        state: data.operatingAddress?.state || 'Lagos',
        lga: data.operatingAddress?.lga || '',
        city: data.operatingAddress?.city || '',
        streetAddress: data.operatingAddress?.streetAddress || '',
        postalCode: data.operatingAddress?.postalCode || '',
        [field]: val,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.registeredName || !data.cacRegistrationNumber || !data.tinNumber) {
      alert('Please fill in all required company registration details.');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="fintech-card p-5 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#00a3d9] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Step 1 — Company Registration Details</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Provide your official Corporate Affairs Commission (CAC) business details, Tax Identification Number (TIN), and registered office address to begin KYB verification.
          </p>
        </div>
      </div>

      {/* SECTION A: Company Details */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building2 className="w-4 h-4 text-[#00a3d9]" />
          <span>Company & Legal Entity Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="fintech-label">Registered Business Name (CAC Official) *</label>
            <input
              type="text"
              required
              value={data.registeredName}
              onChange={(e) => onChange({ ...data, registeredName: e.target.value })}
              placeholder="e.g. Amina Bello Enterprises Ltd"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">Trading / Brand Name (Optional)</label>
            <input
              type="text"
              value={data.tradingName || ''}
              onChange={(e) => onChange({ ...data, tradingName: e.target.value })}
              placeholder="e.g. Amina Express Logistics"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">CAC Registration Number (RC / BN Number) *</label>
            <input
              type="text"
              required
              value={data.cacRegistrationNumber}
              onChange={(e) => onChange({ ...data, cacRegistrationNumber: e.target.value })}
              placeholder="e.g. RC-1049281 or BN-9876543"
              className="fintech-input font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Format: RC-123456 or BN-123456</span>
          </div>

          <div>
            <label className="fintech-label">Business Structure Type *</label>
            <select
              value={data.businessType}
              onChange={(e) => onChange({ ...data, businessType: e.target.value as BusinessStructure })}
              className="fintech-input"
            >
              <option value="LIMITED_LIABILITY">Limited Liability Company (LLC)</option>
              <option value="PLC_CORPORATE">Public Limited Company (PLC)</option>
              <option value="REGISTERED_BUSINESS_NAME">Registered Business Name (BN)</option>
              <option value="PARTNERSHIP">Partnership</option>
              <option value="SOLE_PROPRIETORSHIP">Sole Proprietorship</option>
              <option value="OTHER">Other Enterprise Entity</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION B: Tax Identification (TIN) */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00a3d9]" />
            <span>Tax Identification Details</span>
          </h3>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            TIN Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="fintech-label">Tax Identification Number (TIN) *</label>
            <input
              type="text"
              required
              value={data.tinNumber}
              onChange={(e) => onChange({ ...data, tinNumber: e.target.value })}
              placeholder="e.g. 29384910-0001"
              className="fintech-input font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">FIRS or Joint Tax Board verified TIN</span>
          </div>

          <div>
            <label className="fintech-label">Year of Incorporation / Registration *</label>
            <input
              type="text"
              required
              value={data.yearOfIncorporation}
              onChange={(e) => onChange({ ...data, yearOfIncorporation: e.target.value })}
              placeholder="e.g. 2021"
              className="fintech-input font-mono"
            />
          </div>
        </div>
      </div>

      {/* SECTION C: Nature of Business & Industry */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Industry & Business Operations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="fintech-label">Primary Industry *</label>
            <select
              value={data.industry}
              onChange={(e) => onChange({ ...data, industry: e.target.value })}
              className="fintech-input"
            >
              <option value="Financial Technology & Services">Financial Technology & Services</option>
              <option value="E-Commerce & Retail Trade">E-Commerce & Retail Trade</option>
              <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
              <option value="Agriculture & Food Processing">Agriculture & Food Processing</option>
              <option value="Real Estate & Construction">Real Estate & Construction</option>
              <option value="Professional Services & Consulting">Professional Services & Consulting</option>
              <option value="General Commerce">General Commerce</option>
            </select>
          </div>

          <div>
            <label className="fintech-label">Nature of Business Operations *</label>
            <input
              type="text"
              required
              value={data.natureOfBusiness}
              onChange={(e) => onChange({ ...data, natureOfBusiness: e.target.value })}
              placeholder="e.g. E-Commerce & Merchant Settlement Services"
              className="fintech-input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="fintech-label">Brief Business Description *</label>
            <textarea
              required
              rows={3}
              value={data.businessDescription}
              onChange={(e) => onChange({ ...data, businessDescription: e.target.value })}
              placeholder="Provide a concise summary of primary business activities and customer target audience..."
              className="fintech-input text-xs"
            />
          </div>
        </div>
      </div>

      {/* SECTION D: Registered Office Address */}
      <div className="fintech-card p-6 bg-white border border-slate-200 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="w-4 h-4 text-[#00a3d9]" />
          <span>Registered Office Address (CAC Records)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-3">
            <label className="fintech-label">Street Address *</label>
            <input
              type="text"
              required
              value={data.registeredAddress.streetAddress}
              onChange={(e) => handleRegisteredAddressChange('streetAddress', e.target.value)}
              placeholder="e.g. 12 Adeola Odeku Street, Victoria Island"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">City *</label>
            <input
              type="text"
              required
              value={data.registeredAddress.city}
              onChange={(e) => handleRegisteredAddressChange('city', e.target.value)}
              placeholder="e.g. Victoria Island"
              className="fintech-input"
            />
          </div>

          <div>
            <label className="fintech-label">State *</label>
            <select
              value={data.registeredAddress.state}
              onChange={(e) => handleRegisteredAddressChange('state', e.target.value)}
              className="fintech-input"
            >
              <option value="Lagos">Lagos</option>
              <option value="Abuja (FCT)">Abuja (FCT)</option>
              <option value="Rivers">Rivers</option>
              <option value="Oyo">Oyo</option>
              <option value="Kano">Kano</option>
              <option value="Ogun">Ogun</option>
              <option value="Enugu">Enugu</option>
              <option value="Delta">Delta</option>
            </select>
          </div>

          <div>
            <label className="fintech-label">Local Government Area (LGA) *</label>
            <input
              type="text"
              required
              value={data.registeredAddress.lga}
              onChange={(e) => handleRegisteredAddressChange('lga', e.target.value)}
              placeholder="e.g. Eti-Osa"
              className="fintech-input"
            />
          </div>
        </div>

        {/* Operating Address Toggle */}
        <div className="pt-4 border-t border-slate-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.hasDifferentOperatingAddress}
              onChange={(e) => onChange({ ...data, hasDifferentOperatingAddress: e.target.checked })}
              className="w-4 h-4 text-[#00a3d9] rounded border-slate-300 focus:ring-[#00a3d9]"
            />
            <span className="text-xs font-semibold text-slate-800">
              Business operating address is different from CAC registered address
            </span>
          </label>
        </div>

        {/* Operating Address Additional Section */}
        {data.hasDifferentOperatingAddress && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs animate-fade-in">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Physical Operating Address</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label className="fintech-label">Operating Street Address *</label>
                <input
                  type="text"
                  value={data.operatingAddress?.streetAddress || ''}
                  onChange={(e) => handleOperatingAddressChange('streetAddress', e.target.value)}
                  placeholder="e.g. Plot 45 Commercial Avenue, Ikeja"
                  className="fintech-input"
                />
              </div>

              <div>
                <label className="fintech-label">City *</label>
                <input
                  type="text"
                  value={data.operatingAddress?.city || ''}
                  onChange={(e) => handleOperatingAddressChange('city', e.target.value)}
                  placeholder="e.g. Ikeja"
                  className="fintech-input"
                />
              </div>

              <div>
                <label className="fintech-label">State *</label>
                <input
                  type="text"
                  value={data.operatingAddress?.state || 'Lagos'}
                  onChange={(e) => handleOperatingAddressChange('state', e.target.value)}
                  placeholder="e.g. Lagos"
                  className="fintech-input"
                />
              </div>

              <div>
                <label className="fintech-label">LGA</label>
                <input
                  type="text"
                  value={data.operatingAddress?.lga || ''}
                  onChange={(e) => handleOperatingAddressChange('lga', e.target.value)}
                  placeholder="e.g. Ikeja LGA"
                  className="fintech-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button type="submit" className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2">
          <span>Continue to Step 2: Documents</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
