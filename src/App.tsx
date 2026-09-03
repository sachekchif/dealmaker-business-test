import { useState, useEffect } from 'react';
import type { 
  MainView, 
  UserRole, 
  VendorCategory, 
  BusinessStructure, 
  OnboardingDraft, 
  VendorProfile, 
  VerificationDocument,
} from './types';
import { AppStoreService } from './services/store';

// Dashboard Layout & Actor Switcher
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ACTOR_ACCOUNTS, type ActorAccount } from './components/auth/ActorLoginSwitcher';

// Onboarding Components
import { OnboardingStepper, type StepItem } from './components/onboarding/OnboardingStepper';
import { ProfileTypeSelector } from './components/onboarding/ProfileTypeSelector';
import { VendorCategorySelector } from './components/onboarding/VendorCategorySelector';
import { BusinessTypeSelector } from './components/onboarding/BusinessTypeSelector';
import { PersonalInformationForm } from './components/onboarding/PersonalInformationForm';
import { BusinessInformationForm } from './components/onboarding/BusinessInformationForm';
import { RepresentativeForm } from './components/onboarding/RepresentativeForm';
import { DocumentUploadForm } from './components/onboarding/DocumentUploadForm';
import { VerificationChecklist } from './components/onboarding/VerificationChecklist';
import { DuplicateBusinessModal } from './components/onboarding/DuplicateBusinessModal';
import { RetailBusinessVerificationFlow } from './components/onboarding/RetailBusinessVerificationFlow';

// Portal & Admin Components
import { VendorDashboard } from './components/portal/VendorDashboard';
import { RetailUserDashboard } from './components/portal/RetailUserDashboard';
import { AdminVendorList } from './components/admin/AdminVendorList';
import { AdminVendorDetail } from './components/admin/AdminVendorDetail';
import { RoleTransitionModal } from './components/admin/RoleTransitionModal';
import { SuspendVendorModal } from './components/admin/SuspendVendorModal';
import { RequestInfoModal } from './components/admin/RequestInfoModal';
import { WorkflowsExplorer } from './components/documentation/WorkflowsExplorer';

export default function App() {
  const [currentView, setCurrentView] = useState<MainView>('portal');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Active Actor State (Default: Retail User Amina Bello - Normal / Unverified Business)
  const [currentActor, setCurrentActor] = useState<ActorAccount>(ACTOR_ACCOUNTS[0]); 
  const [showBusinessVerifyFlow, setShowBusinessVerifyFlow] = useState(false);

  // Onboarding Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory | null>(null);
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessStructure | null>(null);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    ninOrBvn: '',
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    registrationNumber: '',
    tinNumber: '',
    registeredAddress: '',
    state: 'Lagos',
    city: '',
    industry: 'E-Commerce Services',
  });

  const [representativeInfo, setRepresentativeInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ninOrBvn: '',
    positionTitle: '',
  });

  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; businessName: string; existingVendor: string }>({
    open: false,
    businessName: '',
    existingVendor: '',
  });

  const [submittedVendor, setSubmittedVendor] = useState<VendorProfile | null>(null);

  // Admin state
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [selectedVendorForDetail, setSelectedVendorForDetail] = useState<VendorProfile | null>(null);
  const [selectedVendorForTransition, setSelectedVendorForTransition] = useState<VendorProfile | null>(null);
  const [selectedVendorForSuspend, setSelectedVendorForSuspend] = useState<VendorProfile | null>(null);
  const [selectedVendorForReqInfo, setSelectedVendorForReqInfo] = useState<VendorProfile | null>(null);

  useEffect(() => {
    // Load vendors for admin
    setVendors(AppStoreService.getVendors());

    // Restore draft if available
    const draft = AppStoreService.loadDraft();
    if (draft) {
      setCurrentStep(draft.currentStep);
      setSelectedRole(draft.role);
      setSelectedCategory(draft.vendorCategory || null);
      setSelectedBusinessType(draft.businessType || null);
      if (draft.personalInfo) setPersonalInfo(draft.personalInfo);
      if (draft.businessInfo) setBusinessInfo(draft.businessInfo);
      if (draft.representativeInfo) setRepresentativeInfo(draft.representativeInfo);
      if (draft.documents) setDocuments(draft.documents);
    }
  }, []);

  const refreshAdminData = () => {
    setVendors([...AppStoreService.getVendors()]);
    if (selectedVendorForDetail) {
      const updated = AppStoreService.getVendorById(selectedVendorForDetail.id);
      setSelectedVendorForDetail(updated || null);
    }
  };

  const handleSelectActor = (actor: ActorAccount) => {
    setCurrentActor(actor);
    setShowBusinessVerifyFlow(false);
    if (actor.category === 'ADMIN') {
      setCurrentView('admin');
    } else {
      setCurrentView('portal');
    }
  };

  const handleSaveDraft = () => {
    if (!selectedRole) return;
    const draft: OnboardingDraft = {
      currentStep,
      role: selectedRole,
      vendorCategory: selectedCategory || undefined,
      businessType: selectedBusinessType || undefined,
      personalInfo,
      businessInfo,
      representativeInfo,
      documents,
      verificationChecklist: [],
      overallVerificationStatus: 'IN_PROGRESS',
    };
    AppStoreService.saveDraft(draft);
    setSaveMessage('Application draft saved cleanly');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Generate dynamic onboarding steps
  const getDynamicSteps = (): StepItem[] => {
    const list: StepItem[] = [
      { id: 1, label: 'Profile Entry', shortLabel: 'Role', isComplete: currentStep > 1, isCurrent: currentStep === 1 },
    ];

    let stepId = 2;
    if (selectedRole?.includes('VENDOR')) {
      list.push({
        id: stepId,
        label: 'Vendor Category',
        shortLabel: 'Category',
        isComplete: currentStep > stepId,
        isCurrent: currentStep === stepId,
      });
      stepId++;
    }

    list.push({
      id: stepId,
      label: 'Personal Identity',
      shortLabel: 'Identity',
      isComplete: currentStep > stepId,
      isCurrent: currentStep === stepId,
    });
    stepId++;

    const isBusiness =
      selectedRole === 'BUSINESS_USER' ||
      selectedRole === 'CORPORATE_VENDOR' ||
      selectedRole === 'RETAIL_VENDOR_BUSINESS' ||
      selectedCategory === 'RETAIL_BUSINESS' ||
      selectedCategory === 'CORPORATE_VENDOR';

    if (isBusiness) {
      list.push({
        id: stepId,
        label: 'Business Structure',
        shortLabel: 'Business Type',
        isComplete: currentStep > stepId,
        isCurrent: currentStep === stepId,
      });
      stepId++;

      list.push({
        id: stepId,
        label: 'Business Information',
        shortLabel: 'CAC Info',
        isComplete: currentStep > stepId,
        isCurrent: currentStep === stepId,
      });
      stepId++;

      list.push({
        id: stepId,
        label: 'Representative',
        shortLabel: 'Authority',
        isComplete: currentStep > stepId,
        isCurrent: currentStep === stepId,
      });
      stepId++;
    }

    list.push({
      id: stepId,
      label: 'Documents Upload',
      shortLabel: 'Documents',
      isComplete: currentStep > stepId,
      isCurrent: currentStep === stepId,
    });
    stepId++;

    list.push({
      id: stepId,
      label: 'Verification & Status',
      shortLabel: 'Verification',
      isComplete: currentStep > stepId,
      isCurrent: currentStep === stepId,
    });

    return list;
  };

  const steps = getDynamicSteps();

  const handleStepSubmit = () => {
    const next = currentStep + 1;
    setCurrentStep(next);

    if (next === steps.length) {
      const created = AppStoreService.createVendorFromOnboarding({
        currentStep: next,
        role: selectedRole || 'RETAIL_USER',
        vendorCategory: selectedCategory || undefined,
        businessType: selectedBusinessType || undefined,
        personalInfo,
        businessInfo,
        representativeInfo,
        documents,
        verificationChecklist: [],
        overallVerificationStatus: 'PENDING_REVIEW',
      });
      setSubmittedVendor(created);
      refreshAdminData();
    }
  };

  // Get profile matching current selected actor
  const currentVendorForPortal =
    submittedVendor ||
    vendors.find((v) => v.id === currentActor.vendorProfileId) ||
    vendors[1];

  const isRetailUser = currentActor.category === 'RETAIL_USER';

  return (
    <DashboardLayout
      currentView={currentView}
      onViewChange={(v) => {
        setShowBusinessVerifyFlow(false);
        setCurrentView(v);
      }}
      currentActor={currentActor}
      onSelectActor={handleSelectActor}
    >
      {/* Retail Business Verification Flow Page */}
      {showBusinessVerifyFlow ? (
        <RetailBusinessVerificationFlow
          userEmail={currentActor.email}
          userName={currentActor.name}
          onComplete={() => setShowBusinessVerifyFlow(false)}
        />
      ) : (
        <>
          {/* VIEW 1: ONBOARDING WIZARD */}
          {currentView === 'onboarding' && (
            <div className="pb-16 space-y-8">
              <OnboardingStepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={(id) => setCurrentStep(id)}
                onSaveDraft={handleSaveDraft}
                onBack={() => setCurrentStep(Math.max(1, currentStep - 1))}
                saveMessage={saveMessage}
              />

              <div className="max-w-5xl mx-auto">
                {/* Step 1: Entry Point Selection */}
                {currentStep === 1 && (
                  <ProfileTypeSelector
                    selectedRole={selectedRole}
                    onSelectRole={(role) => {
                      setSelectedRole(role);
                      handleStepSubmit();
                    }}
                  />
                )}

                {/* Step 2: Vendor Category (if Vendor selected) */}
                {currentStep === 2 && selectedRole?.includes('VENDOR') && (
                  <VendorCategorySelector
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat, role) => {
                      setSelectedCategory(cat);
                      setSelectedRole(role);
                      handleStepSubmit();
                    }}
                  />
                )}

                {/* Step: Personal Information */}
                {((currentStep === 2 && !selectedRole?.includes('VENDOR')) ||
                  (currentStep === 3 && selectedRole?.includes('VENDOR'))) && (
                  <PersonalInformationForm
                    initialData={personalInfo}
                    isBusinessVendor={selectedCategory === 'CORPORATE_VENDOR' || selectedCategory === 'RETAIL_BUSINESS'}
                    onSubmit={(data) => {
                      setPersonalInfo(data);
                      handleStepSubmit();
                    }}
                  />
                )}

                {/* Step: Business Type Selection */}
                {((currentStep === 3 && !selectedRole?.includes('VENDOR')) ||
                  (currentStep === 4 && selectedRole?.includes('VENDOR'))) &&
                  (selectedCategory === 'RETAIL_BUSINESS' || selectedCategory === 'CORPORATE_VENDOR' || selectedRole === 'BUSINESS_USER') && (
                  <BusinessTypeSelector
                    selectedType={selectedBusinessType}
                    onSelectType={(type) => {
                      setSelectedBusinessType(type);
                      handleStepSubmit();
                    }}
                  />
                )}

                {/* Step: Business Information */}
                {((currentStep === 4 && !selectedRole?.includes('VENDOR')) ||
                  (currentStep === 5 && selectedRole?.includes('VENDOR'))) &&
                  (selectedCategory === 'RETAIL_BUSINESS' || selectedCategory === 'CORPORATE_VENDOR' || selectedRole === 'BUSINESS_USER') && (
                  <BusinessInformationForm
                    initialData={businessInfo}
                    businessType={selectedBusinessType || 'REGISTERED_BUSINESS_NAME'}
                    onSubmit={(data) => {
                      setBusinessInfo(data);
                      handleStepSubmit();
                    }}
                    onDuplicateDetected={(bizName, vendorName) => {
                      setDuplicateModal({ open: true, businessName: bizName, existingVendor: vendorName });
                    }}
                  />
                )}

                {/* Step: Representative Details */}
                {((currentStep === 5 && !selectedRole?.includes('VENDOR')) ||
                  (currentStep === 6 && selectedRole?.includes('VENDOR'))) &&
                  (selectedCategory === 'RETAIL_BUSINESS' || selectedCategory === 'CORPORATE_VENDOR' || selectedRole === 'BUSINESS_USER') && (
                  <RepresentativeForm
                    initialData={representativeInfo}
                    businessName={businessInfo.businessName}
                    onSubmit={(data) => {
                      setRepresentativeInfo(data);
                      handleStepSubmit();
                    }}
                  />
                )}

                {/* Step: Document Uploads */}
                {currentStep === steps.length - 1 && (
                  <DocumentUploadForm
                    documents={documents}
                    businessType={selectedBusinessType || undefined}
                    vendorCategory={selectedCategory || undefined}
                    onUpdateDocuments={(docs) => setDocuments(docs)}
                    onSubmit={handleStepSubmit}
                  />
                )}

                {/* Step: Final Verification Hub & Checklist */}
                {currentStep === steps.length && (
                  <VerificationChecklist
                    status={submittedVendor?.verificationStatus || 'PENDING_REVIEW'}
                    checklistItems={[
                      {
                        id: 'chk-1',
                        title: 'Personal Identity & NIN/BVN Match',
                        description: 'Encrypted government identity database check.',
                        status: 'VERIFIED',
                      },
                      {
                        id: 'chk-2',
                        title: 'CAC Business Registration Number',
                        description: 'Verified RC/BN status with Corporate Affairs Commission.',
                        status: submittedVendor?.verificationStatus === 'VERIFIED' ? 'VERIFIED' : 'PENDING',
                      },
                      {
                        id: 'chk-3',
                        title: 'Uploaded Document Legibility & Stamp',
                        description: 'Compliance verification of CAC certificate & proof of address.',
                        status: submittedVendor?.verificationStatus === 'VERIFIED' ? 'VERIFIED' : 'PENDING',
                      },
                      {
                        id: 'chk-4',
                        title: 'Representative Board Authorization',
                        description: 'Authority check binding representative to business operations.',
                        status: 'VERIFIED',
                      },
                    ]}
                    onFinishOnboarding={() => setCurrentView('portal')}
                  />
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: PORTAL */}
          {currentView === 'portal' && (
            isRetailUser ? (
              <RetailUserDashboard
                userName={currentActor.name}
                userEmail={currentActor.email}
                isBusinessVerified={currentActor.isBusinessVerified}
                onVerifyBusinessClick={() => setShowBusinessVerifyFlow(true)}
              />
            ) : (
              <VendorDashboard
                vendor={currentVendorForPortal}
                linkedUsers={AppStoreService.getLinkedUsers()}
                commissions={AppStoreService.getCommissions()}
                signatories={currentActor.signatories}
                admins={currentActor.admins}
              />
            )
          )}

          {/* VIEW 3: ADMIN MANAGEMENT CONSOLE */}
          {currentView === 'admin' && (
            <AdminVendorList
              vendors={vendors}
              onSelectVendor={(v) => setSelectedVendorForDetail(v)}
              onOpenRoleTransition={(v) => setSelectedVendorForTransition(v)}
              onOpenSuspendModal={(v) => setSelectedVendorForSuspend(v)}
            />
          )}

          {/* VIEW 4: FLOWCHARTS & USER STORIES EXPLORER */}
          {currentView === 'workflows' && <WorkflowsExplorer />}
        </>
      )}

      {/* Admin Modals */}
      {selectedVendorForDetail && (
        <AdminVendorDetail
          vendor={selectedVendorForDetail}
          onClose={() => setSelectedVendorForDetail(null)}
          onRefresh={refreshAdminData}
          onOpenRoleTransition={(v) => setSelectedVendorForTransition(v)}
          onOpenSuspendModal={(v) => setSelectedVendorForSuspend(v)}
          onRequestInfo={(v) => setSelectedVendorForReqInfo(v)}
        />
      )}

      {selectedVendorForTransition && (
        <RoleTransitionModal
          vendor={selectedVendorForTransition}
          onClose={() => setSelectedVendorForTransition(null)}
          onSuccess={() => {
            setSelectedVendorForTransition(null);
            refreshAdminData();
          }}
        />
      )}

      {selectedVendorForSuspend && (
        <SuspendVendorModal
          vendor={selectedVendorForSuspend}
          onClose={() => setSelectedVendorForSuspend(null)}
          onSuccess={() => {
            setSelectedVendorForSuspend(null);
            refreshAdminData();
          }}
        />
      )}

      {selectedVendorForReqInfo && (
        <RequestInfoModal
          vendor={selectedVendorForReqInfo}
          onClose={() => setSelectedVendorForReqInfo(null)}
          onSuccess={() => {
            setSelectedVendorForReqInfo(null);
            refreshAdminData();
          }}
        />
      )}

      {/* Duplicate Business Modal */}
      {duplicateModal.open && (
        <DuplicateBusinessModal
          businessName={duplicateModal.businessName}
          existingVendorName={duplicateModal.existingVendor}
          onClose={() => setDuplicateModal({ ...duplicateModal, open: false })}
          onRequestAccess={() => {
            alert('Access request dispatched to existing business administrator.');
            setDuplicateModal({ ...duplicateModal, open: false });
          }}
          onClaimRepresentative={() => {
            alert('Corporate representative claim queued. Upload Board Resolution document.');
            setDuplicateModal({ ...duplicateModal, open: false });
          }}
        />
      )}
    </DashboardLayout>
  );
}
