export interface LoginRequest {
  email: string;
  password?: string; // Optional if you handle state carefully
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  error?: string; // Good to include for error handling
  fullName?: string;
  id?: number;
}

export interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  callbackUrl?: string; // Optional since it might not always be needed
}

// Reuse LoginResponse if the API returns the same structure (success, token, etc.)