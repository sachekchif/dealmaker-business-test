import type { BusinessStructure, VerificationStatus } from './index';

export type KybDocumentType = 
  | 'CAC_CERTIFICATE'
  | 'CAC_STATUS_REPORT'
  | 'MEMART'
  | 'TIN_DOCUMENT'
  | 'PROOF_OF_ADDRESS'
  | 'BOARD_RESOLUTION'
  | 'SCUML_CERTIFICATE'
  | 'REGULATORY_LICENSE'
  | 'IDENTITY_DOCUMENT';

export type KybDocumentStatus = 
  | 'NOT_UPLOADED'
  | 'UPLOADING'
  | 'UPLOADED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED';

export interface KybDocumentItem {
  id: string;
  type: KybDocumentType;
  name: string;
  description: string;
  required: boolean;
  acceptedTypes: string;
  maxSizeMb: number;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  uploadProgress?: number;
  status: KybDocumentStatus;
  rejectionReason?: string;
  uploadedAt?: string;
}

export type DirectorRole = 
  | 'DIRECTOR'
  | 'SHAREHOLDER'
  | 'BENEFICIAL_OWNER'
  | 'DIRECTOR_SHAREHOLDER'
  | 'OTHER';

export type GovtIdType = 
  | 'NIN'
  | 'PASSPORT'
  | 'DRIVERS_LICENSE'
  | 'VOTERS_CARD'
  | 'OTHER';

export interface KybPerson {
  id: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  residentialAddress: string;
  phoneNumber: string;
  email: string;
  role: DirectorRole;
  ownershipPercentage?: number;
  govtIdType: GovtIdType;
  govtIdNumber: string;
  identityDocName?: string;
  identityDocUrl?: string;
  identityVerificationStatus: 'PENDING' | 'IN_PROGRESS' | 'VERIFIED' | 'FAILED';
}

export interface KybAddress {
  country: string;
  state: string;
  lga: string;
  city: string;
  streetAddress: string;
  postalCode?: string;
}

export interface KybBusinessDetails {
  registeredName: string;
  tradingName?: string;
  cacRegistrationNumber: string; // RC or BN number
  businessType: BusinessStructure;
  tinNumber: string;
  tinVerificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
  natureOfBusiness: string;
  industry: string;
  businessDescription: string;
  yearOfIncorporation: string;
  registeredAddress: KybAddress;
  hasDifferentOperatingAddress: boolean;
  operatingAddress?: KybAddress;
}

export interface KybAuthorizedRepresentative {
  fullName: string;
  positionTitle: string;
  email: string;
  phoneNumber: string;
  govtIdType: GovtIdType;
  govtIdNumber: string;
  isAuthorized: boolean;
  authorizationLetterDocUrl?: string;
}

export interface KybComplianceData {
  requiresScuml: 'YES' | 'NO' | 'NOT_SURE';
  scumlCertificateDoc?: KybDocumentItem;
  hasRegulatoryLicense: 'YES' | 'NO';
  regulatoryBody?: string;
  licenseNumber?: string;
  licenseExpiryDate?: string;
  regulatoryLicenseDoc?: KybDocumentItem;
}

export interface KybVerificationData {
  referenceNumber: string;
  currentStep: number;
  businessDetails: KybBusinessDetails;
  documents: KybDocumentItem[];
  persons: KybPerson[];
  authorizedRepresentative: KybAuthorizedRepresentative;
  compliance: KybComplianceData;
  declarationAccepted: boolean;
  overallStatus: VerificationStatus;
  rejectionReason?: string;
  submittedAt?: string;
  verifiedAt?: string;
}

export interface KybValidationItem {
  stepId: number;
  fieldKey: string;
  label: string;
  message: string;
  isMissing: boolean;
}
