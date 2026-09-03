import type { 
  VendorProfile, 
  BusinessProfile, 
  LinkedUserItem, 
  CommissionRecord, 
  AuditLog, 
  OnboardingDraft, 
  VendorCategory,
  UserRole
} from '../types';
import { DealMakerApiService } from './api';

const DRAFT_KEY = 'dealmaker_onboarding_draft_v1';

// Pre-populated initial mock database
const initialVendors: VendorProfile[] = [
  {
    id: 'vnd-001',
    vendorName: 'Samuel Aggregators (Retail)',
    vendorCategory: 'RETAIL_NON_BUSINESS',
    verificationStatus: 'VERIFIED',
    accountStatus: 'ACTIVE',
    linkedUserCount: 14,
    totalTransactionsVolume: 12450000,
    totalCommissionEarned: 622500,
    pendingCommission: 45000,
    paidCommission: 577500,
    commissionRatePercent: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    representative: {
      id: 'rep-001',
      firstName: 'Samuel',
      lastName: 'Adebayo',
      email: 'samuel.adebayo@gmail.com',
      phone: '+234 803 123 4567',
      ninOrBvn: '22334455667',
      positionTitle: 'Individual Referral Agent',
      isAuthorized: true,
      verificationStatus: 'VERIFIED',
    },
    permissions: {
      canEarnCommission: true,
      canOnboardUsers: true,
      canOriginateTransactions: false,
      requireReVerification: false,
    },
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'vnd-002',
    vendorName: 'Samuel & Co. Enterprise',
    vendorCategory: 'RETAIL_BUSINESS',
    verificationStatus: 'VERIFIED',
    accountStatus: 'ACTIVE',
    linkedUserCount: 42,
    totalTransactionsVolume: 45800000,
    totalCommissionEarned: 2290000,
    pendingCommission: 180000,
    paidCommission: 2110000,
    commissionRatePercent: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    businessProfile: {
      id: 'biz-002',
      businessName: 'Samuel & Co. Enterprise',
      registrationNumber: 'BN-3849201',
      businessType: 'REGISTERED_BUSINESS_NAME',
      tinNumber: '29384910-0001',
      registeredAddress: '14 Commercial Avenue, Yaba, Lagos',
      state: 'Lagos',
      city: 'Yaba',
      industry: 'E-Commerce Services',
      verificationStatus: 'VERIFIED',
      verificationBadge: true,
      createdAt: '2026-02-01T09:30:00Z',
      representative: {
        id: 'rep-002',
        firstName: 'Samuel',
        lastName: 'Okonkwo',
        email: 'samuel@samuelco.ng',
        phone: '+234 812 987 6543',
        ninOrBvn: '11223344556',
        positionTitle: 'Principal Proprietor',
        isAuthorized: true,
        verificationStatus: 'VERIFIED',
      },
      documents: [
        {
          id: 'doc-101',
          type: 'CAC_CERTIFICATE',
          name: 'CAC Business Name Certificate',
          fileName: 'BN-3849201_CAC_Cert.pdf',
          fileSize: '1.4 MB',
          uploadDate: '2026-02-01',
          status: 'VERIFIED',
          required: true,
        },
        {
          id: 'doc-102',
          type: 'UTILITY_BILL',
          name: 'Recent Utility Bill (NEPA/Water)',
          fileName: 'Lagos_Electric_Jan2026.pdf',
          fileSize: '820 KB',
          uploadDate: '2026-02-01',
          status: 'VERIFIED',
          required: true,
        }
      ],
    },
    representative: {
      id: 'rep-002',
      firstName: 'Samuel',
      lastName: 'Okonkwo',
      email: 'samuel@samuelco.ng',
      phone: '+234 812 987 6543',
      ninOrBvn: '11223344556',
      positionTitle: 'Principal Proprietor',
      isAuthorized: true,
      verificationStatus: 'VERIFIED',
    },
    permissions: {
      canEarnCommission: true,
      canOnboardUsers: true,
      canOriginateTransactions: true,
      requireReVerification: false,
    },
    createdAt: '2026-02-01T09:30:00Z',
  },
  {
    id: 'vnd-003',
    vendorName: 'Deal Maker Global Ltd',
    vendorCategory: 'CORPORATE_VENDOR',
    verificationStatus: 'VERIFIED',
    accountStatus: 'ACTIVE',
    linkedUserCount: 380,
    totalTransactionsVolume: 350000000,
    totalCommissionEarned: 17500000,
    pendingCommission: 1200000,
    paidCommission: 16300000,
    commissionRatePercent: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    businessProfile: {
      id: 'biz-003',
      businessName: 'Deal Maker Global Ltd',
      registrationNumber: 'RC-1049281',
      businessType: 'LIMITED_LIABILITY',
      tinNumber: '10928374-0001',
      registeredAddress: 'Level 10, Victoria Towers, Victoria Island, Lagos',
      state: 'Lagos',
      city: 'Victoria Island',
      industry: 'Financial Technology & Marketplace Aggregation',
      verificationStatus: 'VERIFIED',
      verificationBadge: true,
      createdAt: '2025-11-10T08:00:00Z',
      representative: {
        id: 'rep-003',
        firstName: 'David',
        lastName: 'Eze',
        email: 'david.eze@dealmaker.ng',
        phone: '+234 802 000 1122',
        ninOrBvn: '55667788990',
        positionTitle: 'Managing Director / Corporate Rep',
        isAuthorized: true,
        verificationStatus: 'VERIFIED',
      },
      documents: [
        {
          id: 'doc-201',
          type: 'CAC_CERTIFICATE',
          name: 'Certificate of Incorporation (RC-1049281)',
          fileName: 'RC-1049281_Inc_Cert.pdf',
          fileSize: '3.2 MB',
          uploadDate: '2025-11-10',
          status: 'VERIFIED',
          required: true,
        },
        {
          id: 'doc-202',
          type: 'STATUS_REPORT_FORM',
          name: 'CAC Form 1.1 / Status Report',
          fileName: 'CAC_Status_Report_2025.pdf',
          fileSize: '2.1 MB',
          uploadDate: '2025-11-10',
          status: 'VERIFIED',
          required: true,
        },
        {
          id: 'doc-203',
          type: 'REPRESENTATIVE_AUTHORIZATION',
          name: 'Board Resolution / Power of Attorney',
          fileName: 'Board_Resolution_DavidEze.pdf',
          fileSize: '1.1 MB',
          uploadDate: '2025-11-10',
          status: 'VERIFIED',
          required: true,
        }
      ],
    },
    representative: {
      id: 'rep-003',
      firstName: 'David',
      lastName: 'Eze',
      email: 'david.eze@dealmaker.ng',
      phone: '+234 802 000 1122',
      ninOrBvn: '55667788990',
      positionTitle: 'Managing Director / Corporate Rep',
      isAuthorized: true,
      verificationStatus: 'VERIFIED',
    },
    permissions: {
      canEarnCommission: true,
      canOnboardUsers: true,
      canOriginateTransactions: true,
      requireReVerification: false,
    },
    createdAt: '2025-11-10T08:00:00Z',
  },
  {
    id: 'vnd-004',
    vendorName: 'Jiji Nigeria Marketplace Ltd',
    vendorCategory: 'CORPORATE_VENDOR',
    verificationStatus: 'PENDING_REVIEW',
    accountStatus: 'PENDING',
    linkedUserCount: 120,
    totalTransactionsVolume: 98000000,
    totalCommissionEarned: 4900000,
    pendingCommission: 4900000,
    paidCommission: 0,
    commissionRatePercent: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    businessProfile: {
      id: 'biz-004',
      businessName: 'Jiji Nigeria Marketplace Ltd',
      registrationNumber: 'RC-8492019',
      businessType: 'LIMITED_LIABILITY',
      tinNumber: '88392019-0001',
      registeredAddress: '42 Commercial Plaza, Ikeja, Lagos',
      state: 'Lagos',
      city: 'Ikeja',
      industry: 'Digital Marketplace',
      verificationStatus: 'PENDING_REVIEW',
      verificationBadge: false,
      createdAt: '2026-03-01T14:20:00Z',
      representative: {
        id: 'rep-004',
        firstName: 'Grace',
        lastName: 'Ibrahim',
        email: 'grace.ibrahim@jiji.ng',
        phone: '+234 813 555 7788',
        ninOrBvn: '99887766554',
        positionTitle: 'Head of Partnerships',
        isAuthorized: true,
        verificationStatus: 'PENDING_REVIEW',
      },
      documents: [
        {
          id: 'doc-301',
          type: 'CAC_CERTIFICATE',
          name: 'Certificate of Incorporation',
          fileName: 'Jiji_CAC_Certificate.pdf',
          fileSize: '2.8 MB',
          uploadDate: '2026-03-01',
          status: 'PENDING',
          required: true,
        },
        {
          id: 'doc-302',
          type: 'REPRESENTATIVE_AUTHORIZATION',
          name: 'Authorization Letter',
          fileName: 'Grace_Ibrahim_Auth_Letter.pdf',
          fileSize: '950 KB',
          uploadDate: '2026-03-01',
          status: 'PENDING',
          required: true,
        }
      ],
    },
    representative: {
      id: 'rep-004',
      firstName: 'Grace',
      lastName: 'Ibrahim',
      email: 'grace.ibrahim@jiji.ng',
      phone: '+234 813 555 7788',
      ninOrBvn: '99887766554',
      positionTitle: 'Head of Partnerships',
      isAuthorized: true,
      verificationStatus: 'PENDING_REVIEW',
    },
    permissions: {
      canEarnCommission: true,
      canOnboardUsers: true,
      canOriginateTransactions: true,
      requireReVerification: false,
    },
    createdAt: '2026-03-01T14:20:00Z',
  },
  {
    id: 'vnd-005',
    vendorName: 'Chidi Logistics & Express',
    vendorCategory: 'RETAIL_BUSINESS',
    verificationStatus: 'FAILED',
    accountStatus: 'RESTRICTED',
    linkedUserCount: 5,
    totalTransactionsVolume: 1200000,
    totalCommissionEarned: 60000,
    pendingCommission: 0,
    paidCommission: 60000,
    commissionRatePercent: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    businessProfile: {
      id: 'biz-005',
      businessName: 'Chidi Logistics & Express',
      registrationNumber: 'BN-9920192',
      businessType: 'REGISTERED_BUSINESS_NAME',
      tinNumber: '7729102-0001',
      registeredAddress: '5 Ogui Road, Enugu',
      state: 'Enugu',
      city: 'Enugu',
      industry: 'Logistics',
      verificationStatus: 'FAILED',
      verificationBadge: false,
      createdAt: '2026-02-18T11:15:00Z',
      representative: {
        id: 'rep-005',
        firstName: 'Chidi',
        lastName: 'Nwosu',
        email: 'chidi@chidilogistics.ng',
        phone: '+234 806 444 3322',
        ninOrBvn: '33445566778',
        positionTitle: 'Proprietor',
        isAuthorized: false,
        verificationStatus: 'FAILED',
      },
      documents: [
        {
          id: 'doc-401',
          type: 'CAC_CERTIFICATE',
          name: 'CAC Registration Document',
          fileName: 'Chidi_BN_Scan.png',
          fileSize: '450 KB',
          uploadDate: '2026-02-18',
          status: 'REJECTED',
          rejectionReason: 'Document image blurry and registration number BN-9920192 failed CAC portal match.',
          required: true,
        }
      ],
    },
    representative: {
      id: 'rep-005',
      firstName: 'Chidi',
      lastName: 'Nwosu',
      email: 'chidi@chidilogistics.ng',
      phone: '+234 806 444 3322',
      ninOrBvn: '33445566778',
      positionTitle: 'Proprietor',
      isAuthorized: false,
      verificationStatus: 'FAILED',
    },
    permissions: {
      canEarnCommission: false,
      canOnboardUsers: false,
      canOriginateTransactions: false,
      requireReVerification: true,
    },
    createdAt: '2026-02-18T11:15:00Z',
  }
];

const initialUsers: LinkedUserItem[] = [
  {
    id: 'lnk-001',
    userId: 'usr-101',
    name: 'Amina Bello',
    email: 'amina.bello@gmail.com',
    phone: '+234 805 111 2233',
    onboardedDate: '2026-01-18',
    status: 'ACTIVE',
    totalTransactionsAmount: 1850000,
    commissionGenerated: 92500,
  },
  {
    id: 'lnk-002',
    userId: 'usr-102',
    name: 'Tunde Bakare',
    email: 'tunde.bakare@yahoo.com',
    phone: '+234 802 333 4455',
    onboardedDate: '2026-01-20',
    status: 'ACTIVE',
    totalTransactionsAmount: 3200000,
    commissionGenerated: 160000,
  },
  {
    id: 'lnk-003',
    userId: 'usr-103',
    name: 'Nkechi Williams',
    email: 'nkechi.w@outlook.com',
    phone: '+234 818 777 8899',
    onboardedDate: '2026-02-05',
    status: 'ACTIVE',
    totalTransactionsAmount: 950000,
    commissionGenerated: 47500,
  },
  {
    id: 'lnk-004',
    userId: 'usr-104',
    name: 'Emeka John',
    email: 'emeka.j@gmail.com',
    phone: '+234 803 999 0011',
    onboardedDate: '2026-02-12',
    status: 'INACTIVE',
    totalTransactionsAmount: 400000,
    commissionGenerated: 20000,
  }
];

const initialCommissions: CommissionRecord[] = [
  {
    id: 'comm-1001',
    vendorId: 'vnd-001',
    vendorName: 'Samuel Aggregators (Retail)',
    onboardedUserId: 'usr-101',
    onboardedUserName: 'Amina Bello',
    transactionId: 'TX-984920',
    transactionAmount: 500000,
    commissionAmount: 25000,
    commissionRate: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    status: 'PAID',
    createdAt: '2026-02-15T14:30:00Z',
  },
  {
    id: 'comm-1002',
    vendorId: 'vnd-001',
    vendorName: 'Samuel Aggregators (Retail)',
    onboardedUserId: 'usr-102',
    onboardedUserName: 'Tunde Bakare',
    transactionId: 'TX-984925',
    transactionAmount: 900000,
    commissionAmount: 45000,
    commissionRate: 5.0,
    mappedExecutionPartner: 'Deal Maker Global Ltd',
    status: 'PENDING',
    createdAt: '2026-03-02T10:15:00Z',
  }
];

const initialLogs: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-02-01T09:30:00Z',
    action: 'VENDOR_VERIFIED',
    performedBy: 'System Auto-Verification',
    targetEntityId: 'vnd-002',
    targetEntityName: 'Samuel & Co. Enterprise',
    details: 'CAC registration number BN-3849201 verified against official CAC API portal.',
  },
  {
    id: 'log-002',
    timestamp: '2026-02-18T11:15:00Z',
    action: 'DOCUMENT_REJECTED',
    performedBy: 'Admin (System Operator)',
    targetEntityId: 'vnd-005',
    targetEntityName: 'Chidi Logistics & Express',
    details: 'Rejected CAC certificate due to illegible scan and RC mismatch.',
  }
];

export class AppStoreService {
  private static vendors: VendorProfile[] = [...initialVendors];
  private static users: LinkedUserItem[] = [...initialUsers];
  private static commissions: CommissionRecord[] = [...initialCommissions];
  private static auditLogs: AuditLog[] = [...initialLogs];

  static getVendors(): VendorProfile[] {
    return this.vendors;
  }

  static getVendorById(id: string): VendorProfile | undefined {
    return this.vendors.find(v => v.id === id);
  }

  static getLinkedUsers(): LinkedUserItem[] {
    return this.users;
  }

  static getCommissions(): CommissionRecord[] {
    return this.commissions;
  }

  static getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  // Check if business already exists
  static checkBusinessExists(businessName: string, regNumber?: string): { exists: boolean; existingVendor?: VendorProfile } {
    const existing = this.vendors.find(v => {
      const matchName = v.vendorName.toLowerCase() === businessName.toLowerCase();
      const matchReg = regNumber && v.businessProfile?.registrationNumber?.toLowerCase() === regNumber.toLowerCase();
      return matchName || matchReg;
    });

    return {
      exists: !!existing,
      existingVendor: existing
    };
  }

  // Save onboarding draft to localStorage
  static saveDraft(draft: OnboardingDraft): void {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }

  // Load onboarding draft
  static loadDraft(): OnboardingDraft | null {
    const data = localStorage.getItem(DRAFT_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as OnboardingDraft;
    } catch {
      return null;
    }
  }

  // Clear draft
  static clearDraft(): void {
    localStorage.removeItem(DRAFT_KEY);
  }

  // Submit new application with Live API integration & fallback
  static createVendorFromOnboarding(draft: OnboardingDraft): VendorProfile {
    const newId = `vnd-${Date.now().toString().slice(-4)}`;
    
    let category: VendorCategory = 'RETAIL_NON_BUSINESS';
    if (draft.role === 'CORPORATE_VENDOR') category = 'CORPORATE_VENDOR';
    else if (draft.role === 'RETAIL_VENDOR_BUSINESS' || draft.isRegisteringAsBusiness) category = 'RETAIL_BUSINESS';

    let bizProfile: BusinessProfile | undefined;
    if (draft.businessInfo) {
      bizProfile = {
        id: `biz-${Date.now().toString().slice(-4)}`,
        businessName: draft.businessInfo.businessName || `${draft.personalInfo.firstName} ${draft.personalInfo.lastName} Services`,
        registrationNumber: draft.businessInfo.registrationNumber,
        businessType: draft.businessType || 'REGISTERED_BUSINESS_NAME',
        tinNumber: draft.businessInfo.tinNumber,
        registeredAddress: draft.businessInfo.registeredAddress || draft.personalInfo.address,
        state: draft.businessInfo.state || 'Lagos',
        city: draft.businessInfo.city || 'Ikeja',
        industry: draft.businessInfo.industry || 'General Commerce',
        verificationStatus: 'PENDING_REVIEW',
        verificationBadge: false,
        createdAt: new Date().toISOString(),
        representative: {
          id: `rep-${Date.now().toString().slice(-4)}`,
          firstName: draft.representativeInfo?.firstName || draft.personalInfo.firstName,
          lastName: draft.representativeInfo?.lastName || draft.personalInfo.lastName,
          email: draft.representativeInfo?.email || draft.personalInfo.email,
          phone: draft.representativeInfo?.phone || draft.personalInfo.phone,
          ninOrBvn: draft.representativeInfo?.ninOrBvn || draft.personalInfo.ninOrBvn,
          positionTitle: draft.representativeInfo?.positionTitle || 'Representative',
          isAuthorized: true,
          verificationStatus: 'PENDING_REVIEW',
        },
        documents: draft.documents,
      };
    }

    const newVendor: VendorProfile = {
      id: newId,
      vendorName: bizProfile ? bizProfile.businessName : `${draft.personalInfo.firstName} ${draft.personalInfo.lastName} (Aggregator)`,
      vendorCategory: category,
      verificationStatus: 'PENDING_REVIEW',
      accountStatus: 'PENDING',
      linkedUserCount: 0,
      totalTransactionsVolume: 0,
      totalCommissionEarned: 0,
      pendingCommission: 0,
      paidCommission: 0,
      commissionRatePercent: 5.0,
      mappedExecutionPartner: 'Deal Maker Global Ltd',
      businessProfile: bizProfile,
      representative: {
        id: `rep-${Date.now().toString().slice(-4)}`,
        firstName: draft.personalInfo.firstName,
        lastName: draft.personalInfo.lastName,
        email: draft.personalInfo.email,
        phone: draft.personalInfo.phone,
        ninOrBvn: draft.personalInfo.ninOrBvn,
        positionTitle: category === 'RETAIL_NON_BUSINESS' ? 'Retail Aggregator' : 'Authorized Representative',
        isAuthorized: true,
        verificationStatus: 'PENDING_REVIEW',
      },
      permissions: {
        canEarnCommission: true,
        canOnboardUsers: true,
        canOriginateTransactions: category !== 'RETAIL_NON_BUSINESS',
        requireReVerification: false,
      },
      createdAt: new Date().toISOString(),
    };

    this.vendors.unshift(newVendor);

    // Call live Deal Maker API asynchronously
    DealMakerApiService.registerVendor({
      firstname: draft.personalInfo.firstName,
      lastname: draft.personalInfo.lastName,
      email: draft.personalInfo.email,
      phoneNumber: draft.personalInfo.phone,
      businessName: bizProfile ? bizProfile.businessName : `${draft.personalInfo.firstName} ${draft.personalInfo.lastName}`,
    }).then(res => {
      console.log('Live Deal Maker Vendor Registration API Response:', res);
    });

    // Audit log
    this.addAuditLog({
      action: 'ONBOARDING_SUBMITTED',
      performedBy: draft.personalInfo.email,
      targetEntityId: newVendor.id,
      targetEntityName: newVendor.vendorName,
      details: `New vendor application submitted for category ${category}. Live API endpoint POST /auth/vendor/register triggered.`,
    });

    this.clearDraft();
    return newVendor;
  }

  // Admin: Approve Vendor
  static approveVendor(vendorId: string, adminName: string = 'Super Admin'): VendorProfile | null {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) return null;

    vendor.verificationStatus = 'VERIFIED';
    vendor.accountStatus = 'ACTIVE';
    if (vendor.businessProfile) {
      vendor.businessProfile.verificationStatus = 'VERIFIED';
      vendor.businessProfile.verificationBadge = true;
      vendor.businessProfile.documents.forEach(doc => { doc.status = 'VERIFIED'; });
    }
    vendor.representative.verificationStatus = 'VERIFIED';

    this.addAuditLog({
      action: 'VENDOR_APPROVED',
      performedBy: adminName,
      targetEntityId: vendor.id,
      targetEntityName: vendor.vendorName,
      details: 'Vendor and associated business profile approved and verified successfully.',
      previousState: 'PENDING_REVIEW',
      newState: 'VERIFIED',
    });

    return vendor;
  }

  // Admin: Reject Vendor
  static rejectVendor(vendorId: string, reason: string, adminName: string = 'Super Admin'): VendorProfile | null {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) return null;

    vendor.verificationStatus = 'FAILED';
    vendor.accountStatus = 'RESTRICTED';
    if (vendor.businessProfile) {
      vendor.businessProfile.verificationStatus = 'FAILED';
    }

    this.addAuditLog({
      action: 'VENDOR_REJECTED',
      performedBy: adminName,
      targetEntityId: vendor.id,
      targetEntityName: vendor.vendorName,
      details: `Application rejected by admin. Reason: ${reason}`,
      previousState: vendor.verificationStatus,
      newState: 'FAILED',
    });

    return vendor;
  }

  // Admin: Suspend Vendor / Restrict permissions
  static suspendVendor(
    vendorId: string, 
    reason: string, 
    restrictions: { disableCommission: boolean; disableOnboarding: boolean; disableTransactions: boolean }, 
    adminName: string = 'Super Admin'
  ): VendorProfile | null {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) return null;

    const prevStatus = vendor.accountStatus;
    vendor.accountStatus = 'SUSPENDED';
    vendor.permissions.canEarnCommission = !restrictions.disableCommission;
    vendor.permissions.canOnboardUsers = !restrictions.disableOnboarding;
    vendor.permissions.canOriginateTransactions = !restrictions.disableTransactions;

    this.addAuditLog({
      action: 'VENDOR_SUSPENDED',
      performedBy: adminName,
      targetEntityId: vendor.id,
      targetEntityName: vendor.vendorName,
      details: `Account suspended. Reason: ${reason}. Restrictions: Commissions=${!restrictions.disableCommission}, Onboarding=${!restrictions.disableOnboarding}`,
      previousState: prevStatus,
      newState: 'SUSPENDED',
    });

    return vendor;
  }

  // Admin: Role Transition (e.g. Business Vendor -> Business User)
  static transitionVendorRole(
    vendorId: string, 
    newRole: UserRole, 
    auditReason: string, 
    adminName: string = 'Super Admin'
  ): VendorProfile | null {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) return null;

    const previousRole = vendor.vendorCategory;

    if (newRole === 'BUSINESS_USER') {
      vendor.vendorCategory = 'RETAIL_BUSINESS';
      vendor.permissions.canEarnCommission = false;
    } else if (newRole === 'CORPORATE_VENDOR') {
      vendor.vendorCategory = 'CORPORATE_VENDOR';
      vendor.permissions.canEarnCommission = true;
      vendor.permissions.canOriginateTransactions = true;
    }

    this.addAuditLog({
      action: 'ROLE_TRANSITION_EXECUTED',
      performedBy: adminName,
      targetEntityId: vendor.id,
      targetEntityName: vendor.vendorName,
      details: `Role transitioned from ${previousRole} to ${newRole}. Notes: ${auditReason}`,
      previousState: previousRole,
      newState: newRole,
    });

    return vendor;
  }

  // Admin: Request Information
  static requestInformation(vendorId: string, message: string, adminName: string = 'Super Admin'): VendorProfile | null {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) return null;

    vendor.verificationStatus = 'REQUIRES_ACTION';
    
    this.addAuditLog({
      action: 'INFORMATION_REQUESTED',
      performedBy: adminName,
      targetEntityId: vendor.id,
      targetEntityName: vendor.vendorName,
      details: `Requested updated information/documents from vendor. Message: ${message}`,
      previousState: vendor.verificationStatus,
      newState: 'REQUIRES_ACTION',
    });

    return vendor;
  }

  private static addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
  }
}
