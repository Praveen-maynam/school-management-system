import axios from 'axios';

export interface OnboardUserPayload {
  name: string;
  email: string;
  role: string;
}

export interface OnboardUserResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export async function onboardUser(payload: OnboardUserPayload): Promise<OnboardUserResponse> {
  try {
    const response = await axios.post<OnboardUserResponse>('/api/onboarding', payload);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Onboarding failed',
    };
  }
}
