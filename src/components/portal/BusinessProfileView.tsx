import React from 'react';
import type { BusinessProfile } from '../../types';
import { Building2, ShieldCheck, FileText, MapPin, Hash, UserCheck } from 'lucide-react';

interface BusinessProfileViewProps {
  businessProfile: BusinessProfile;
}

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({ businessProfile }) => {
  return (
    <div className="space-y-6">
      {/* Business Details Card */}
      <div className="fintech-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{businessProfile.businessName}</h2>
                {businessProfile.verificationBadge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Badge
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono">
                RC/BN: {businessProfile.registrationNumber || 'Not Registered'} • Structure: {businessProfile.businessType.replace(/_/g, ' ')}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              {businessProfile.verificationStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium block">Registered Address</span>
            <div className="flex items-start gap-1.5 font-semibold text-slate-900">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{businessProfile.registeredAddress}, {businessProfile.city}, {businessProfile.state}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium block">Tax ID Number (TIN)</span>
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 font-mono">
              <Hash className="w-4 h-4 text-slate-400" />
              <span>{businessProfile.tinNumber || 'Not Provided'}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium block">Industry Sector</span>
            <div className="font-semibold text-slate-900">
              {businessProfile.industry}
            </div>
          </div>
        </div>
      </div>

      {/* Representative & Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Representative Info */}
        <div className="fintech-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Authorized Representative</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Representative Name:</span>
              <span className="font-bold text-slate-900">
                {businessProfile.representative.firstName} {businessProfile.representative.lastName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Position / Title:</span>
              <span className="font-medium text-slate-800">{businessProfile.representative.positionTitle}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Official Contact Email:</span>
              <span className="font-mono text-slate-800">{businessProfile.representative.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">NIN / BVN Verification:</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Match ({businessProfile.representative.ninOrBvn})
              </span>
            </div>
          </div>
        </div>

        {/* Verification Documents List */}
        <div className="fintech-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Uploaded KYB Documents</h3>
            </div>
            <span className="text-xs text-slate-500">{businessProfile.documents.length} File(s)</span>
          </div>

          <div className="space-y-2 text-xs">
            {businessProfile.documents.map((doc) => (
              <div key={doc.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{doc.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{doc.fileName} ({doc.fileSize})</div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
