import { useState } from 'react';
import type { VendorProfile, LinkedUserItem, CommissionRecord } from '../../types';
import { LinkedUsersTable } from './LinkedUsersTable';
import { CommissionMappingDiagram } from './CommissionMappingDiagram';
import { BusinessProfileView } from './BusinessProfileView';
import { StatCard } from './StatCard';
import { DealMakerApiService } from '../../services/api';
import { 
  ShieldCheck, 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  Building, 
  Sparkles,
  ArrowRightLeft,
  UserCheck,
  Users,
  FileCheck
} from 'lucide-react';

interface VendorDashboardProps {
  vendor?: VendorProfile;
  linkedUsers: LinkedUserItem[];
  commissions: CommissionRecord[];
  signatories?: string[];
  admins?: string[];
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  vendor,
  linkedUsers,
  signatories,
  admins,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'mapping' | 'business' | 'signatories'>('users');
  const [copied, setCopied] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);

  const vendorName = vendor?.vendorName || 'Deal Maker Global Ltd';
  const vendorId = vendor?.id || 'vnd-003';
  const vendorCategory = vendor?.vendorCategory || 'CORPORATE_VENDOR';
  const isVerified = vendor?.verificationStatus === 'VERIFIED';
  const pendingCommission = vendor?.pendingCommission || 1200000;
  const paidCommission = vendor?.paidCommission || 16300000;
  const totalVolume = vendor?.totalTransactionsVolume || 350000000;
  const linkedUserCount = vendor?.linkedUserCount || linkedUsers.length;

  const isCorporate = vendorCategory === 'CORPORATE_VENDOR';

  const referralLink = `https://dealmaker.ng/ref/${vendorName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${vendorId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransferCommission = async () => {
    setIsTransferring(true);
    const res = await DealMakerApiService.transferCommissionToWallet(pendingCommission);
    setIsTransferring(false);

    if (res.success || res.message) {
      setTransferMessage(res.message);
      setTimeout(() => setTransferMessage(null), 3000);
    }
  };

  const activeSignatories = signatories || [
    'David Eze (Managing Director / Board Signatory)',
    'Folake Solanke (Legal Director / Signatory)',
  ];

  const activeAdmins = admins || [
    'David Eze (Super Admin)',
    'Chinedu Okeke (Finance Manager)',
    'Bisi Akande (Compliance Lead)',
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Profile Card - 100% Light Theme Soft Cyan Fill (#e8f4fb) */}
      <div className="fintech-card p-6 bg-[#e8f4fb] border border-[#d0e7f7] text-slate-900 rounded-2xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{vendorName}</h1>
              {isVerified ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified {isCorporate ? 'Corporate Vendor' : 'Business Vendor'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Verification Active
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-slate-700 border border-slate-300">
                {vendorCategory.replace(/_/g, ' ')}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                <UserCheck className="w-3 h-3 text-[#00a3d9]" />
                Active Session
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Representative: <strong className="text-slate-900">{vendor?.representative?.firstName || 'David'} {vendor?.representative?.lastName || 'Eze'}</strong> ({vendor?.representative?.positionTitle || 'Managing Director'}) • Contact: {vendor?.representative?.email || 'david.eze@dealmaker.ng'}
            </p>
          </div>

          {/* Referral Link & Actions */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 max-w-md w-full text-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-[#00a3d9]" />
                Vendor Referral Link
              </span>
              <span className="text-[#00a3d9] font-bold bg-[#e8f4fb] px-2 py-0.5 rounded text-[10px]">5.0% Fixed Commission</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-slate-50 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-200 flex-1 font-mono truncate"
              />
              <button
                onClick={copyLink}
                className="btn-primary text-xs py-1.5 px-3 shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Onboarded Users"
          value={linkedUserCount}
          subtitle="Total customer accounts linked"
          onRefresh={() => alert('Refreshing user metrics...')}
        />

        <StatCard
          title="Total Volume"
          value={totalVolume}
          isCurrency={true}
          subtitle="Qualifying transactions sum"
          onRefresh={() => alert('Refreshing volume metrics...')}
        />

        <StatCard
          title="Pending Commission"
          value={pendingCommission}
          isCurrency={true}
          subtitle="Awaiting settlement transfer"
          onRefresh={() => alert('Refreshing pending commission...')}
        />

        <StatCard
          title="Paid Commission"
          value={paidCommission}
          isCurrency={true}
          subtitle="Disbursed to vendor wallet"
          onRefresh={() => alert('Refreshing paid commissions...')}
        />
      </div>

      {/* Financial Settlement Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-900">Financial Commission Settlement</h4>
          <p className="text-xs text-slate-500">
            Transfer accumulated referral commissions directly to settlement wallet balance.
          </p>
        </div>

        <button
          onClick={handleTransferCommission}
          disabled={isTransferring || pendingCommission === 0}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>{isTransferring ? 'Transferring...' : 'Transfer Commission to Wallet'}</span>
        </button>
      </div>

      {transferMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3 rounded-lg flex items-center justify-between animate-fade-in">
          <span className="font-bold">{transferMessage}</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="border-b border-slate-200 flex gap-6 text-sm font-semibold flex-wrap">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-3 border-b-2 transition-all ${
            activeTab === 'users' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Linked Users ({linkedUsers.length})
        </button>

        <button
          onClick={() => setActiveTab('mapping')}
          className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'mapping' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Commission Relationship Mapping</span>
        </button>

        {isCorporate && (
          <button
            onClick={() => setActiveTab('signatories')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'signatories' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Corporate Signatories & Admins ({activeSignatories.length + activeAdmins.length})</span>
          </button>
        )}

        {vendor?.businessProfile && (
          <button
            onClick={() => setActiveTab('business')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'business' ? 'border-[#00a3d9] text-[#00a3d9]' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Business Profile & CAC Info</span>
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && <LinkedUsersTable users={linkedUsers} />}

      {activeTab === 'mapping' && vendor && (
        <CommissionMappingDiagram
          vendor={vendor}
          executionPartner={vendor.mappedExecutionPartner || 'Deal Maker Global Ltd'}
        />
      )}

      {/* Corporate Signatories & Admins View */}
      {activeTab === 'signatories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Board Signatories */}
          <div className="fintech-card p-5 space-y-4 bg-white border border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Authorized Board Signatories</h3>
                <p className="text-xs text-slate-500">Listed on Form 1.1 / Board Resolution</p>
              </div>
            </div>

            <div className="space-y-2">
              {activeSignatories.map((sig, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{sig}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified Signatory</span>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Team Admins */}
          <div className="fintech-card p-5 space-y-4 bg-white border border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Users className="w-5 h-5 text-[#00a3d9]" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Corporate Team Admins & Roles</h3>
                <p className="text-xs text-slate-500">Access & operational permissions</p>
              </div>
            </div>

            <div className="space-y-2">
              {activeAdmins.map((adm, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{adm}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Admin Role</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'business' && vendor?.businessProfile && (
        <BusinessProfileView businessProfile={vendor.businessProfile} />
      )}
    </div>
  );
};
