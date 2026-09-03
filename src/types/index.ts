export type MainView = 'onboarding' | 'portal' | 'admin' | 'workflows';

export type UserRole = 
  | 'RETAIL_USER' 
  | 'BUSINESS_USER' 
  | 'RETAIL_VENDOR_NON_BUSINESS' 
  | 'RETAIL_VENDOR_BUSINESS' 
  | 'CORPORATE_VENDOR';

export type BusinessStructure = 
  | 'SOLE_PROPRIETORSHIP'
  | 'REGISTERED_BUSINESS_NAME'
  | 'PARTNERSHIP'
  | 'LIMITED_LIABILITY'
  | 'PLC_CORPORATE'
  | 'NON_REGISTERED_INDIVIDUAL'
  | 'OTHER';

export type VendorCategory = 
  | 'RETAIL_NON_BUSINESS'
  | 'RETAIL_BUSINESS'
  | 'CORPORATE_VENDOR';

export type AccountStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'RESTRICTED';

export type VerificationStatus = 
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'UNDER_REVIEW'
  | 'PENDING_REVIEW'
  | 'VERIFIED'
  | 'FAILED'
  | 'REQUIRES_ACTION'
  | 'SUSPENDED';

export type DocumentType = 
  | 'CAC_CERTIFICATE'
  | 'STATUS_REPORT_FORM'
  | 'DIRECTOR_ID'
  | 'REPRESENTATIVE_AUTHORIZATION'
  | 'UTILITY_BILL'
  | 'TAX_IDENTIFICATION'
  | 'PARTNERSHIP_DEED'
  | 'INDIVIDUAL_IDENTITY_PROOF';

export interface VerificationDocument {
  id: string;
  type: DocumentType;
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  rejectionReason?: string;
  fileUrl?: string;
  required: boolean;
}

export interface VerificationCheckItem {
  id: string;
  title: string;
  description: string;
  status: 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'FAILED' | 'REQUIRES_ACTION';
  verifiedAt?: string;
  failureReason?: string;
}

export interface Representative {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ninOrBvn: string;
  positionTitle: string;
  isAuthorized: boolean;
  authorizationDocUrl?: string;
  verificationStatus: VerificationStatus;
}

export interface BusinessProfile {
  id: string;
  businessName: string;
  registrationNumber?: string; // CAC RC number
  businessType: BusinessStructure;
  tinNumber?: string; // Tax ID
  registeredAddress: string;
  state: string;
  city: string;
  industry: string;
  dateEstablished?: string;
  verificationStatus: VerificationStatus;
  verificationBadge: boolean;
  representative: Representative;
  documents: VerificationDocument[];
  createdAt: string;
}

export interface VendorProfile {
  id: string;
  vendorName: string;
  vendorCategory: VendorCategory;
  businessProfile?: BusinessProfile;
  representative: Representative;
  verificationStatus: VerificationStatus;
  accountStatus: AccountStatus;
  linkedUserCount: number;
  totalTransactionsVolume: number;
  totalCommissionEarned: number;
  pendingCommission: number;
  paidCommission: number;
  commissionRatePercent: number;
  mappedExecutionPartner?: string; // e.g. "Deal Maker"
  permissions: {
    canEarnCommission: boolean;
    canOnboardUsers: boolean;
    canOriginateTransactions: boolean;
    requireReVerification: boolean;
  };
  createdAt: string;
}

export interface UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  ninOrBvn: string;
  primaryRole: UserRole;
  accountStatus: AccountStatus;
  vendorProfileId?: string;
  businessProfileId?: string;
  referredByVendorId?: string;
  referredByVendorName?: string;
  totalTransactionsAmount: number;
  createdAt: string;
}

export interface LinkedUserItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  onboardedDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  totalTransactionsAmount: number;
  commissionGenerated: number;
}

export interface CommissionRecord {
  id: string;
  vendorId: string;
  vendorName: string;
  onboardedUserId: string;
  onboardedUserName: string;
  transactionId: string;
  transactionAmount: number;
  commissionAmount: number;
  commissionRate: number;
  mappedExecutionPartner: string; // e.g. "Deal Maker"
  status: 'PENDING' | 'PAID' | 'REJECTED';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  targetEntityId: string;
  targetEntityName: string;
  details: string;
  previousState?: string;
  newState?: string;
}

export interface OnboardingDraft {
  currentStep: number;
  role: UserRole;
  vendorCategory?: VendorCategory;
  businessType?: BusinessStructure;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    ninOrBvn: string;
  };
  isRegisteringAsBusiness?: boolean;
  businessInfo?: {
    businessName: string;
    registrationNumber: string;
    tinNumber: string;
    registeredAddress: string;
    state: string;
    city: string;
    industry: string;
  };
  representativeInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    ninOrBvn: string;
    positionTitle: string;
  };
  documents: VerificationDocument[];
  verificationChecklist: VerificationCheckItem[];
  overallVerificationStatus: VerificationStatus;
}
