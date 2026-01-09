import api from './api';
import {
  type AuthResponse,
  type GoogleLoginRequest,
  type MessageResponse,
  type OtpRequestBody,
  type OtpVerifyRequest,
  type RefreshTokenRequest,
  type NonceResponse,
  type SiweNonceRequest,
  type SiweVerifyRequest,
  type UpdateProfileRequest
} from '../types/auth';

export const authApi = {
  googleLogin: async (data: GoogleLoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/google', data);
    return response.data;
  },

  requestOtp: async (data: OtpRequestBody) => {
    const response = await api.post<MessageResponse>('/auth/otp/request', data);
    return response.data;
  },

  verifyOtp: async (data: OtpVerifyRequest) => {
    const response = await api.post<AuthResponse>('/auth/otp/verify', data);
    return response.data;
  },

  refreshToken: async (data: RefreshTokenRequest) => {
    const response = await api.post<{ accessToken: string, refreshToken: string }>('/auth/refresh', data);
    return response.data;
  },

  getSiweNonce: async (data: SiweNonceRequest) => {
    const response = await api.post<NonceResponse>('/auth/siwe/nonce', data);
    return response.data;
  },

  verifySiwe: async (data: SiweVerifyRequest) => {
    const response = await api.post<AuthResponse>('/auth/siwe/verify', data);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await api.post<AuthResponse>('/auth/siwe/complete-profile', data);
    return response.data;
  }
};
