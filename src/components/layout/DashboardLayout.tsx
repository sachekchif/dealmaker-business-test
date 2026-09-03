import React, { useState } from 'react';
import type { MainView } from '../../types';
import { ActorLoginSwitcher, type ActorAccount } from '../auth/ActorLoginSwitcher';
import { KybVerificationWizard } from '../kyb/KybVerificationWizard';
import { 
  LayoutDashboard, 
  Wallet, 
  Briefcase, 
  ShieldAlert, 
  Users, 
  Building, 
  Settings, 
  Layers, 
  Search, 
  Bell, 
  ChevronRight,
  UserCheck,
  Building2,
  User,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface DashboardLayoutProps {
  currentView: MainView;
  onViewChange: (view: MainView) => void;
  currentActor: ActorAccount;
  onSelectActor: (actor: ActorAccount) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  onViewChange,
  currentActor,
  onSelectActor,
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showBusinessVerifyFlow, setShowBusinessVerifyFlow] = useState(false);

  const isRetailUser = currentActor.category === 'RETAIL_USER';

  // Navigation Items according to active actor role
  const getNavItems = () => {
    if (isRetailUser) {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'portal' as MainView },
        { id: 'wallet', label: 'Wallet', icon: Wallet, view: 'portal' as MainView },
        { id: 'deals', label: 'Deals', icon: Briefcase, view: 'portal' as MainView },
        { id: 'kyb', label: 'Business Verification (KYB)', icon: ShieldCheck, view: 'portal' as MainView },
        { id: 'profile', label: 'Profile', icon: User, view: 'portal' as MainView },
      ];
    }

    // Default for vendors, business users, & admin
    return [
      { id: 'onboarding', label: 'Client Onboarding', icon: UserCheck, view: 'onboarding' as MainView },
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'portal' as MainView },
      { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet, view: 'portal' as MainView },
      { id: 'deals', label: 'Deals & Orders', icon: Briefcase, view: 'portal' as MainView },
      { id: 'disputes', label: 'Disputes & Escrow', icon: ShieldAlert, view: 'portal' as MainView },
      { id: 'kyb', label: 'KYB Verification Hub', icon: ShieldCheck, view: 'portal' as MainView },
      { id: 'users', label: 'Linked Users', icon: Users, view: 'portal' as MainView },
      { id: 'business', label: 'Business Profile', icon: Building, view: 'portal' as MainView },
      { id: 'admin', label: 'Admin Console', icon: Settings, view: 'admin' as MainView },
      { id: 'workflows', label: 'Flowcharts & Stories', icon: Layers, view: 'workflows' as MainView },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f8fb] text-slate-900 font-sans">
      {/* Top Profile Selection Bar - Pinned to Top of Entire Site */}
      <div className="sticky top-0 z-50">
        <ActorLoginSwitcher
          currentActor={currentActor}
          onSelectActor={(actor: ActorAccount) => {
            setShowBusinessVerifyFlow(false);
            onSelectActor(actor);
          }}
        />
      </div>

      {/* Main Body Shell */}
      <div className="flex-1 flex min-w-0">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#eaf4f9] border-r border-slate-200/80 flex flex-col shrink-0 sticky top-20 h-[calc(100vh-80px)] z-40">
          {/* Top Header inside Sidebar */}
          <div className="p-4 border-b border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00a3d9] flex items-center justify-center font-bold text-white shadow-xs">
                DM
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 tracking-tight block">Trusted DEAL MAKER</span>
                <span className="text-[10px] text-slate-500 font-medium">Enterprise Platform</span>
              </div>
            </div>
          </div>

          {/* User Account Snippet */}
          <div className="p-3 mx-3 my-3 bg-white/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-full bg-[#00a3d9] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentActor.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="font-bold text-slate-900 truncate">{currentActor.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{currentActor.subTypeLabel}</p>
              </div>
            </div>
          </div>

          {/* Navigation List */}
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !showBusinessVerifyFlow && activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'kyb') {
                      setShowBusinessVerifyFlow(true);
                    } else {
                      setShowBusinessVerifyFlow(false);
                      setActiveTab(item.id);
                      onViewChange(item.view);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all relative ${
                    isActive
                      ? 'bg-white shadow-xs text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00a3d9] rounded-r-full" />
                  )}
                  <div className="flex items-center gap-2.5 pl-1">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00a3d9]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* SMALL BOX SECTION AT THE BOTTOM OF THE SIDEBAR (RETAIL USER BUSINESS VERIFICATION CTA) */}
          {isRetailUser && (
            <div className="p-3.5 m-3 bg-gradient-to-br from-white via-cyan-50/50 to-[#e8f4fb] rounded-2xl border border-[#00a3d9]/30 shadow-xs space-y-2">
              <div className="flex items-center gap-1.5 text-[#00a3d9]">
                <Building2 className="w-4 h-4" />
                <span className="font-bold text-xs text-slate-900">Business account</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Register your CAC business identity to unlock verified badges & higher limits.
              </p>
              <button
                onClick={() => setShowBusinessVerifyFlow(true)}
                className="w-full btn-primary text-xs py-1.5 px-3 flex items-center justify-center gap-1 text-white shadow-2xs"
              >
                <span>Verify Business</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </aside>

        {/* Main View Container */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <header className="bg-white border-b border-slate-200/80 px-6 py-3 sticky top-20 z-30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="capitalize">{currentActor.subTypeLabel}</span>
              {showBusinessVerifyFlow && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-[#00a3d9]">Business Verification (KYB)</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search docs or references..."
                  className="pl-8 pr-8 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-900 w-56 focus:outline-none focus:border-[#00a3d9]"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-200 px-1 rounded">
                  ⌘K
                </span>
              </div>

              <button className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-6 space-y-6">
            {showBusinessVerifyFlow ? (
              <KybVerificationWizard
                initialViewMode="wizard"
                onComplete={() => setShowBusinessVerifyFlow(false)}
                onGoToDashboard={() => setShowBusinessVerifyFlow(false)}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
