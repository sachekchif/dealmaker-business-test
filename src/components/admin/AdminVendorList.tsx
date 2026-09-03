import React, { useState } from 'react';
import type { VendorProfile, VerificationStatus } from '../../types';
import { Search, Filter, ShieldCheck, Eye, ArrowRightLeft, ShieldOff } from 'lucide-react';

interface AdminVendorListProps {
  vendors: VendorProfile[];
  onSelectVendor: (vendor: VendorProfile) => void;
  onOpenRoleTransition: (vendor: VendorProfile) => void;
  onOpenSuspendModal: (vendor: VendorProfile) => void;
}

export const AdminVendorList: React.FC<AdminVendorListProps> = ({
  vendors,
  onSelectVendor,
  onOpenRoleTransition,
  onOpenSuspendModal,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredVendors = vendors.filter((v) => {
    const matchSearch =
      v.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      v.representative.email.toLowerCase().includes(search.toLowerCase()) ||
      (v.businessProfile?.registrationNumber && v.businessProfile.registrationNumber.toLowerCase().includes(search.toLowerCase()));

    const matchCategory = categoryFilter === 'ALL' || v.vendorCategory === categoryFilter;
    const matchStatus = statusFilter === 'ALL' || v.verificationStatus === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Verified</span>;
      case 'PENDING_REVIEW':
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Pending Review</span>;
      case 'FAILED':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">Failed</span>;
      case 'REQUIRES_ACTION':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">Requires Action</span>;
      case 'SUSPENDED':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-800">Suspended</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="fintech-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Admin Vendor & Business Management</h2>
            <p className="text-xs text-slate-500">
              Review KYB documents, approve onboarding, transition account roles, and enforce compliance controls.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
              Total Entities: {vendors.length}
            </span>
          </div>
        </div>

        {/* Filters bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Vendor Name, RC #, Email..."
              className="fintech-input pl-9 py-1.5 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="fintech-input py-1.5 text-xs"
            >
              <option value="ALL">All Vendor Categories</option>
              <option value="RETAIL_NON_BUSINESS">Retail Vendor — Non-Business</option>
              <option value="RETAIL_BUSINESS">Retail Vendor — Business Name</option>
              <option value="CORPORATE_VENDOR">Corporate / Enterprise Vendor</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="fintech-input py-1.5 text-xs"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="VERIFIED">Verified</option>
              <option value="PENDING_REVIEW">Pending Review</option>
              <option value="REQUIRES_ACTION">Requires Action</option>
              <option value="FAILED">Failed / Rejected</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Vendor Management Table */}
      <div className="fintech-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="p-3">Vendor / Entity Name</th>
                <th className="p-3">Category & Type</th>
                <th className="p-3">Representative</th>
                <th className="p-3">Status Badge</th>
                <th className="p-3 text-right">Linked Users</th>
                <th className="p-3 text-right">Total Volume</th>
                <th className="p-3 text-center">Admin Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      {vendor.vendorName}
                      {vendor.businessProfile?.verificationBadge && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      ID: {vendor.id} {vendor.businessProfile?.registrationNumber ? `• RC: ${vendor.businessProfile.registrationNumber}` : ''}
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="font-semibold text-slate-800 block">
                      {vendor.vendorCategory === 'RETAIL_NON_BUSINESS' && 'Retail (Individual)'}
                      {vendor.vendorCategory === 'RETAIL_BUSINESS' && 'Retail Business'}
                      {vendor.vendorCategory === 'CORPORATE_VENDOR' && 'Corporate Vendor'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {vendor.businessProfile?.businessType ? vendor.businessProfile.businessType.replace(/_/g, ' ') : 'NIN Individual'}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="font-medium text-slate-900">
                      {vendor.representative.firstName} {vendor.representative.lastName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{vendor.representative.email}</div>
                  </td>

                  <td className="p-3">{getStatusBadge(vendor.verificationStatus)}</td>

                  <td className="p-3 text-right font-bold text-slate-900 font-mono">
                    {vendor.linkedUserCount}
                  </td>

                  <td className="p-3 text-right font-bold text-slate-900 font-mono">
                    ₦{(vendor.totalTransactionsVolume / 1000000).toFixed(1)}M
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onSelectVendor(vendor)}
                        className="btn-secondary py-1 px-2 text-[11px]"
                        title="View Full Profile & Verify Documents"
                      >
                        <Eye className="w-3 h-3 text-blue-600" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => onOpenRoleTransition(vendor)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-600"
                        title="Transition Role (Business Vendor <-> Business User)"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
                      </button>

                      <button
                        onClick={() => onOpenSuspendModal(vendor)}
                        className="p-1 rounded hover:bg-rose-50 text-rose-600"
                        title="Suspend Vendor / Restrict Permissions"
                      >
                        <ShieldOff className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
