export interface ApiAuthResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp?: string;
}

export class DealMakerApiService {
  // Pure local mock implementation - No external network calls

  static async registerVendor(data: {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    businessName: string;
  }): Promise<ApiAuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Vendor '${data.businessName}' registered successfully (Local Mock State)`,
          data: {
            id: `vnd-${Date.now()}`,
            email: data.email,
            businessName: data.businessName,
          },
        });
      }, 300);
    });
  }

  static async login(email: string): Promise<ApiAuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Logged in successfully as ${email} (Local Mock Session)`,
          data: {
            token: 'mock_jwt_token_dealmaker_local',
            user: { email, name: email.split('@')[0] },
          },
        });
      }, 300);
    });
  }

  static async transferCommissionToWallet(amount?: number): Promise<ApiAuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `₦${(amount || 0).toLocaleString()} transferred to settlement wallet balance.`,
        });
      }, 300);
    });
  }

  static async uploadFile(file: File, context: string = 'kyc'): Promise<ApiAuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `File '${file.name}' uploaded successfully (${context}).`,
          data: {
            fileUrl: `https://cdn.dealmaker.ng/uploads/${file.name}`,
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          },
        });
      }, 400);
    });
  }
}
