import type { 
  KybVerificationData, 
  KybDocumentItem, 
  KybValidationItem 
} from '../types/kyb';

const KYB_DRAFT_KEY = 'dealmaker_kyb_application_draft_v1';

export const INITIAL_REQUIRED_DOCUMENTS: KybDocumentItem[] = [
  {
    id: 'doc-cac-cert',
    type: 'CAC_CERTIFICATE',
    name: 'CAC Certificate of Incorporation',
    description: "Upload your company's official CAC Certificate of Incorporation or Business Name Registration Certificate.",
    required: true,
    acceptedTypes: 'PDF, PNG, JPG',
    maxSizeMb: 10,
    status: 'NOT_UPLOADED',
  },
  {
    id: 'doc-cac-status',
    type: 'CAC_STATUS_REPORT',
    name: 'CAC Status Report / CAC Company Report',
    description: 'Upload the latest CAC company status report (Form 1.1 / Status Report) showing current directors & shareholders.',
    required: true,
    acceptedTypes: 'PDF',
    maxSizeMb: 10,
    status: 'NOT_UPLOADED',
  },
  {
    id: 'doc-memart',
    type: 'MEMART',
    name: 'Memorandum & Articles of Association (MEMART)',
    description: "Upload your company's Memorandum and Articles of Association (applicable to LLC and PLC entities).",
    required: false,
    acceptedTypes: 'PDF',
    maxSizeMb: 10,
    status: 'NOT_UPLOADED',
  },
  {
    id: 'doc-tin',
    type: 'TIN_DOCUMENT',
    name: 'Tax Identification Number (TIN) Documentation',
    description: 'Upload official FIRS/JTB Tax Identification Number slip or Tax Clearance Certificate.',
    required: true,
    acceptedTypes: 'PDF, PNG, JPG',
    maxSizeMb: 10,
    status: 'NOT_UPLOADED',
  },
  {
    id: 'doc-proof-address',
    type: 'PROOF_OF_ADDRESS',
    name: 'Proof of Business Address',
    description: 'Recent utility bill (electricity, water), tenancy agreement, or commercial lease agreement dated within last 3 months.',
    required: true,
    acceptedTypes: 'PDF, PNG, JPG',
    maxSizeMb: 10,
    status: 'NOT_UPLOADED',
  },
];

export const INITIAL_KYB_STATE: KybVerificationData = {
  referenceNumber: `KYB-2026-${Math.floor(100000 + Math.random() * 900000)}`,
  currentStep: 1,
  businessDetails: {
    registeredName: 'Amina Bello Enterprises',
    tradingName: 'Amina Bello Logistics',
    cacRegistrationNumber: 'BN-9876543',
    businessType: 'REGISTERED_BUSINESS_NAME',
    tinNumber: '29384910-0001',
    tinVerificationStatus: 'VERIFIED',
    natureOfBusiness: 'E-Commerce & Supply Chain Logistics',
    industry: 'Financial Technology & Services',
    businessDescription: 'Providing nationwide escrow-protected merchant settlement and delivery aggregation services across Nigeria.',
    yearOfIncorporation: '2021',
    registeredAddress: {
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Eti-Osa',
      city: 'Victoria Island',
      streetAddress: '12 Adeola Odeku Street, Victoria Island',
      postalCode: '101241',
    },
    hasDifferentOperatingAddress: false,
  },
  documents: INITIAL_REQUIRED_DOCUMENTS,
  persons: [
    {
      id: 'person-01',
      fullName: 'Amina Bello',
      dateOfBirth: '1988-04-12',
      nationality: 'Nigerian',
      residentialAddress: '8 Lekki Phase 1, Lagos State',
      phoneNumber: '+234 803 111 2233',
      email: 'user@dealmaker.ng',
      role: 'DIRECTOR_SHAREHOLDER',
      ownershipPercentage: 60,
      govtIdType: 'NIN',
      govtIdNumber: '10928374651',
      identityDocName: 'Amina_Bello_NIN_Slip.pdf',
      identityDocUrl: 'https://dealmaker.ng/docs/nin_slip.pdf',
      identityVerificationStatus: 'VERIFIED',
    },
    {
      id: 'person-02',
      fullName: 'Bisi Bello',
      dateOfBirth: '1990-09-24',
      nationality: 'Nigerian',
      residentialAddress: '15 Ikeja GRA, Lagos State',
      phoneNumber: '+234 802 444 5566',
      email: 'bisi.bello@dealmaker.ng',
      role: 'SHAREHOLDER',
      ownershipPercentage: 40,
      govtIdType: 'PASSPORT',
      govtIdNumber: 'A09876543',
      identityDocName: 'Bisi_Bello_Passport.jpg',
      identityDocUrl: 'https://dealmaker.ng/docs/passport.jpg',
      identityVerificationStatus: 'VERIFIED',
    },
  ],
  authorizedRepresentative: {
    fullName: 'Amina Bello',
    positionTitle: 'Managing Director / Principal Proprietor',
    email: 'user@dealmaker.ng',
    phoneNumber: '+234 803 111 2233',
    govtIdType: 'NIN',
    govtIdNumber: '10928374651',
    isAuthorized: true,
  },
  compliance: {
    requiresScuml: 'NO',
    hasRegulatoryLicense: 'NO',
  },
  declarationAccepted: false,
  overallStatus: 'NOT_STARTED',
};

export class KybService {
  static loadDraft(): KybVerificationData {
    const raw = localStorage.getItem(KYB_DRAFT_KEY);
    if (!raw) return INITIAL_KYB_STATE;
    try {
      return JSON.parse(raw) as KybVerificationData;
    } catch {
      return INITIAL_KYB_STATE;
    }
  }

  static saveDraft(data: KybVerificationData): void {
    localStorage.setItem(KYB_DRAFT_KEY, JSON.stringify(data));
  }

  static clearDraft(): void {
    localStorage.removeItem(KYB_DRAFT_KEY);
  }

  // Ownership Calculation & Validation
  static calculateTotalOwnership(persons: KybVerificationData['persons']): number {
    return persons.reduce((sum, p) => sum + (p.ownershipPercentage || 0), 0);
  }

  // Full System Validation Engine
  static validateApplication(data: KybVerificationData): KybValidationItem[] {
    const items: KybValidationItem[] = [];

    // Step 1 Check: Business Details
    if (!data.businessDetails.registeredName.trim()) {
      items.push({
        stepId: 1,
        fieldKey: 'registeredName',
        label: 'Registered Business Name',
        message: 'Registered Business Name is required.',
        isMissing: true,
      });
    }

    if (!data.businessDetails.cacRegistrationNumber.trim()) {
      items.push({
        stepId: 1,
        fieldKey: 'cacRegistrationNumber',
        label: 'CAC RC/BN Number',
        message: 'CAC Registration Number is required.',
        isMissing: true,
      });
    }

    if (!data.businessDetails.tinNumber.trim()) {
      items.push({
        stepId: 1,
        fieldKey: 'tinNumber',
        label: 'Tax Identification Number (TIN)',
        message: 'TIN Number is required.',
        isMissing: true,
      });
    }

    if (!data.businessDetails.registeredAddress.streetAddress.trim()) {
      items.push({
        stepId: 1,
        fieldKey: 'streetAddress',
        label: 'Registered Street Address',
        message: 'Registered street address is required.',
        isMissing: true,
      });
    }

    // Step 2 Check: Required Documents Uploaded
    data.documents.forEach((doc) => {
      if (doc.required && doc.status !== 'UPLOADED' && doc.status !== 'VERIFIED') {
        items.push({
          stepId: 2,
          fieldKey: doc.id,
          label: doc.name,
          message: `${doc.name} must be uploaded.`,
          isMissing: true,
        });
      }
    });

    // Step 3 Check: Directors & Ownership Percentage
    if (data.persons.length === 0) {
      items.push({
        stepId: 3,
        fieldKey: 'persons',
        label: 'Directors & Beneficial Owners',
        message: 'At least 1 Director or Beneficial Owner must be added.',
        isMissing: true,
      });
    }

    const totalOwnership = this.calculateTotalOwnership(data.persons);
    if (totalOwnership !== 100) {
      items.push({
        stepId: 3,
        fieldKey: 'ownershipPercentage',
        label: 'Shareholder Ownership Total',
        message: `Total shareholder ownership is ${totalOwnership}%. Must equal exactly 100%.`,
        isMissing: true,
      });
    }

    // Step 4 Check: Authorized Representative
    if (!data.authorizedRepresentative.fullName.trim()) {
      items.push({
        stepId: 4,
        fieldKey: 'repFullName',
        label: 'Authorized Representative Name',
        message: 'Representative name is required.',
        isMissing: true,
      });
    }

    if (!data.authorizedRepresentative.isAuthorized) {
      items.push({
        stepId: 4,
        fieldKey: 'isAuthorized',
        label: 'Board Authorization Check',
        message: 'You must confirm authorization to act on behalf of the business.',
        isMissing: true,
      });
    }

    // Step 5 Check: SCUML & License docs if Yes selected
    if (data.compliance.requiresScuml === 'YES' && !data.compliance.scumlCertificateDoc?.fileUrl) {
      items.push({
        stepId: 5,
        fieldKey: 'scumlCertificateDoc',
        label: 'SCUML Certificate',
        message: 'SCUML Certificate upload is required when SCUML applies.',
        isMissing: true,
      });
    }

    if (data.compliance.hasRegulatoryLicense === 'YES' && !data.compliance.regulatoryLicenseDoc?.fileUrl) {
      items.push({
        stepId: 5,
        fieldKey: 'regulatoryLicenseDoc',
        label: 'Regulatory Licence Document',
        message: 'Regulatory licence document upload is required when licensed.',
        isMissing: true,
      });
    }

    // Step 6 Check: Declaration Checked
    if (!data.declarationAccepted) {
      items.push({
        stepId: 6,
        fieldKey: 'declarationAccepted',
        label: 'Legal Declaration Checkbox',
        message: 'You must accept the legal submission declaration.',
        isMissing: true,
      });
    }

    return items;
  }
}
