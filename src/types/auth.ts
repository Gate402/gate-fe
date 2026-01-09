export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  evmAddress: string | null;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserResponse;
  tokens: AuthTokens;
}

export interface GoogleLoginRequest {
  token: string;
}

export interface MessageResponse {
  message: string;
}

export interface OtpRequestBody {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface NonceResponse {
  nonce: string;
}

export interface SiweNonceRequest {
  address: string;
}

export interface SiweVerifyRequest {
  message: string;
  signature: string;
}

export interface UpdateProfileRequest {
  email: string;
  name: string;
}
