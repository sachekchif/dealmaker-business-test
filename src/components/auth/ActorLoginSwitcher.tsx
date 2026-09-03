import React, { useState } from 'react';
import type { VendorProfile, UserRole } from '../../types';
import { DealMakerApiService } from '../../services/api';
import { LogIn, Check, AlertCircle, RefreshCw, UserCheck } from 'lucide-react';

export type MainCategory = 'RETAIL_USER' | 'VENDOR_RETAIL' | 'VENDOR' | 'ADMIN';

export interface ActorAccount {
  id: string;
  name: string;
  email: string;
  category: MainCategory;
  categoryLabel: 'Retail Users' | 'Vendor Retail' | 'Vendor (Corporate)' | 'Super Admin';
  subTypeLabel: string;
  isBusinessVerified: boolean;
  roleType: UserRole | 'SUPER_ADMIN' | 'RETAIL_USER';
  vendorProfileId?: string;
  badgeColor: string;
  description: string;
  signatories?: string[];
  admins?: string[];
}

export const ACTOR_ACCOUNTS: ActorAccount[] = [
  // CATEGORY 1: RETAIL USERS
  {
    id: 'act-001',
    name: 'Amina Bello',
    email: 'user@dealmaker.ng',
    category: 'RETAIL_USER',
    categoryLabel: 'Retail Users',
    subTypeLabel: 'Normal User (No Verified Business)',
    isBusinessVerified: false,
    roleType: 'RETAIL_USER',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Normal retail customer. Operates without a verified CAC business identity.',
  },
  {
    id: 'act-002',
    name: 'Amina Bello Enterprises',
    email: 'user.verified@dealmaker.ng',
    category: 'RETAIL_USER',
    categoryLabel: 'Retail Users',
    subTypeLabel: 'Retail User (Verified Business)',
    isBusinessVerified: true,
    roleType: 'RETAIL_USER',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    description: 'Retail customer with an attached verified CAC business name (BN-9876543).',
  },

  // CATEGORY 2: VENDOR RETAIL (RETAIL VENDORS)
  {
    id: 'act-003',
    name: 'Samuel Adebayo',
    email: 'aggregator@dealmaker.ng',
    category: 'VENDOR_RETAIL',
    categoryLabel: 'Vendor Retail',
    subTypeLabel: 'Vendor Retail (No Verified Business)',
    isBusinessVerified: false,
    roleType: 'RETAIL_VENDOR_NON_BUSINESS',
    vendorProfileId: 'vnd-001',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
    description: 'Individual referral aggregator (NIN/BVN verified, no CAC filing). Earns 5% referral split.',
  },
  {
    id: 'act-004',
    name: 'Samuel & Co. Enterprise',
    email: 'vendor.biz@dealmaker.ng',
    category: 'VENDOR_RETAIL',
    categoryLabel: 'Vendor Retail',
    subTypeLabel: 'Vendor Retail (Verified Business Name)',
    isBusinessVerified: true,
    roleType: 'RETAIL_VENDOR_BUSINESS',
    vendorProfileId: 'vnd-002',
    badgeColor: 'bg-[#e8f4fb] text-[#00a3d9] border-[#00a3d9]',
    description: 'Registered Business Name (BN-3849201) with Verified Business Badge active.',
  },

  // CATEGORY 3: VENDOR (CORPORATE VENDORS WITH SIGNATORIES & ADMINS)
  {
    id: 'act-005',
    name: 'Deal Maker Global Ltd',
    email: 'corporate@dealmaker.ng',
    category: 'VENDOR',
    categoryLabel: 'Vendor (Corporate)',
    subTypeLabel: 'Corporate Vendor (Verified + Signatories & Admins)',
    isBusinessVerified: true,
    roleType: 'CORPORATE_VENDOR',
    vendorProfileId: 'vnd-003',
    badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-300',
    description: 'Formal LLC (RC-1049281) with board authorized signatories and multi-admin team permissions.',
    signatories: ['David Eze (Managing Director)', 'Folake Solanke (Legal Counsel / Director)'],
    admins: ['David Eze (Super Admin)', 'Chinedu Okeke (Finance Admin)', 'Bisi Akande (Ops Admin)'],
  },
  {
    id: 'act-006',
    name: 'Jiji Nigeria Marketplace Ltd',
    email: 'jiji.corporate@jiji.ng',
    category: 'VENDOR',
    categoryLabel: 'Vendor (Corporate)',
    subTypeLabel: 'Corporate Marketplace (Verified + Signatories)',
    isBusinessVerified: true,
    roleType: 'CORPORATE_VENDOR',
    vendorProfileId: 'vnd-004',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-300',
    description: 'Enterprise Marketplace (RC-8492019) with registered corporate signatories and team roles.',
    signatories: ['Grace Ibrahim (Head of Partnerships)', 'Anton Volkov (CEO)'],
    admins: ['Grace Ibrahim (Lead Admin)', 'Tariki Usman (Compliance Manager)'],
  },

  // PLATFORM ADMIN
  {
    id: 'act-007',
    name: 'Compliance Super Admin',
    email: 'admin@dealmaker.ng',
    category: 'ADMIN',
    categoryLabel: 'Super Admin',
    subTypeLabel: 'Platform Super Admin',
    isBusinessVerified: true,
    roleType: 'SUPER_ADMIN',
    badgeColor: 'bg-rose-50 text-rose-900 border-rose-300',
    description: 'Super Admin inspecting CAC documents, role transitions, and account suspensions.',
  },
];

interface ActorLoginSwitcherProps {
  currentActor: ActorAccount;
  onSelectActor: (actor: ActorAccount, vendorProfile?: VendorProfile) => void;
}

export const ActorLoginSwitcher: React.FC<ActorLoginSwitcherProps> = ({
  currentActor,
  onSelectActor,
}) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<MainCategory>(currentActor.category);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [firstnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  const [businessNameInput, setBusinessNameInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResult, setApiResult] = useState<{ success: boolean; message: string } | null>(null);

  const filteredActors = ACTOR_ACCOUNTS.filter((a) => a.category === selectedCategoryTab);

  const handleExecuteAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiResult(null);

    if (authMode === 'login') {
      const res = await DealMakerApiService.login(emailInput);
      setIsSubmitting(false);
      setApiResult({
        success: true,
        message: res.message,
      });
      onSelectActor({
        id: `act-custom-${Date.now()}`,
        name: emailInput.split('@')[0],
        email: emailInput,
        category: 'RETAIL_USER',
        categoryLabel: 'Retail Users',
        subTypeLabel: 'Custom Authenticated User',
        isBusinessVerified: false,
        roleType: 'RETAIL_USER',
        badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-300',
        description: 'Custom logged in session',
      });
    } else {
      const res = await DealMakerApiService.registerVendor({
        firstname: firstnameInput,
        lastname: lastnameInput,
        email: emailInput,
        phoneNumber: '+234 800 000 0000',
        businessName: businessNameInput,
      });
      setIsSubmitting(false);
      setApiResult({
        success: true,
        message: res.message,
      });
    }
  };

  return (
    <div className="bg-white text-slate-900 border-b border-slate-200/80 py-2.5 px-4 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col space-y-2 text-xs">
        {/* Top Major Category Switcher Bar - 100% Light Theme Colors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#00a3d9] text-base tracking-tight">Deal Maker</span>
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">• Profile Category:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setSelectedCategoryTab('RETAIL_USER');
                const defaultActor = ACTOR_ACCOUNTS.find((a) => a.category === 'RETAIL_USER');
                if (defaultActor) onSelectActor(defaultActor);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                selectedCategoryTab === 'RETAIL_USER'
                  ? 'bg-[#00a3d9] text-white border-[#00a3d9] shadow-xs'
                  : 'bg-[#f4f8fb] text-slate-700 border-slate-200 hover:border-[#00a3d9] hover:bg-[#e8f4fb]'
              }`}
            >
              1. Retail Users
            </button>

            <button
              onClick={() => {
                setSelectedCategoryTab('VENDOR_RETAIL');
                const defaultActor = ACTOR_ACCOUNTS.find((a) => a.category === 'VENDOR_RETAIL');
                if (defaultActor) onSelectActor(defaultActor);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                selectedCategoryTab === 'VENDOR_RETAIL'
                  ? 'bg-[#00a3d9] text-white border-[#00a3d9] shadow-xs'
                  : 'bg-[#f4f8fb] text-slate-700 border-slate-200 hover:border-[#00a3d9] hover:bg-[#e8f4fb]'
              }`}
            >
              2. Vendor Retail
            </button>

            <button
              onClick={() => {
                setSelectedCategoryTab('VENDOR');
                const defaultActor = ACTOR_ACCOUNTS.find((a) => a.category === 'VENDOR');
                if (defaultActor) onSelectActor(defaultActor);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                selectedCategoryTab === 'VENDOR'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-[#f4f8fb] text-slate-700 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              3. Vendor (Corporate + Signatories)
            </button>

            <button
              onClick={() => {
                setSelectedCategoryTab('ADMIN');
                const defaultActor = ACTOR_ACCOUNTS.find((a) => a.category === 'ADMIN');
                if (defaultActor) onSelectActor(defaultActor);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                selectedCategoryTab === 'ADMIN'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-[#f4f8fb] text-slate-700 border-slate-200 hover:border-rose-400 hover:bg-rose-50'
              }`}
            >
              Super Admin
            </button>
          </div>
        </div>

        {/* Sub-Account Selector Options for Selected Category - Light Colors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 font-semibold text-[11px]">Select Sub-Account:</span>
            {filteredActors.map((actor) => {
              const isSelected = currentActor.id === actor.id;
              return (
                <button
                  key={actor.id}
                  onClick={() => onSelectActor(actor)}
                  title={actor.description}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#00a3d9] text-white font-bold border-[#00a3d9] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-[#e8f4fb]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${actor.isBusinessVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{actor.subTypeLabel}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-[11px] py-1 px-2.5 bg-[#00a3d9] hover:bg-[#008ab8] flex items-center gap-1 shrink-0"
          >
            <UserCheck className="w-3 h-3 text-white" />
            <span>Custom Login / Signup</span>
          </button>
        </div>
      </div>

      {/* Login & Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-[#00a3d9] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-base">
                <UserCheck className="w-5 h-5" />
                <span>Account Authentication & Registration</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-cyan-800 p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex rounded-lg bg-slate-100 p-1 font-semibold">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-1.5 rounded text-center transition-all ${
                    authMode === 'login' ? 'bg-[#00a3d9] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-1.5 rounded text-center transition-all ${
                    authMode === 'signup' ? 'bg-[#00a3d9] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleExecuteAuth} className="space-y-3">
                {authMode === 'signup' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="fintech-label">First Name *</label>
                        <input
                          type="text"
                          required
                          value={firstnameInput}
                          onChange={(e) => setFirstnameInput(e.target.value)}
                          placeholder="e.g. Samuel"
                          className="fintech-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="fintech-label">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={lastnameInput}
                          onChange={(e) => setLastnameInput(e.target.value)}
                          placeholder="e.g. Okonkwo"
                          className="fintech-input text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="fintech-label">Business Name *</label>
                      <input
                        type="text"
                        required
                        value={businessNameInput}
                        onChange={(e) => setBusinessNameInput(e.target.value)}
                        placeholder="e.g. Samuel & Co. Enterprise"
                        className="fintech-input text-xs"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="fintech-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@dealmaker.ng"
                    className="fintech-input text-xs"
                  />
                </div>

                <div>
                  <label className="fintech-label">Password *</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="fintech-input text-xs"
                  />
                </div>

                {apiResult && (
                  <div
                    className={`p-3 rounded border text-xs flex items-start gap-2 ${
                      apiResult.success ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-rose-50 text-rose-900 border-rose-200'
                    }`}
                  >
                    {apiResult.success ? <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-bold">{apiResult.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs">
                    Close
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary text-xs flex items-center gap-1.5">
                    {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <LogIn className="w-3.5 h-3.5" />}
                    <span>{isSubmitting ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Create Vendor Profile'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
