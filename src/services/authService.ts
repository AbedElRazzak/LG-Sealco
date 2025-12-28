import { apiClient } from './apiClient';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

/**
 * Sends login credentials to the SimplCommerce API
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/account/login', credentials);

    if (response.data.success && response.data.token) {
      // 1. Save the token
      localStorage.setItem('userToken', response.data.token);

      // 2. Save the FullName (matching the key from your API JSON)
      if (response.data.fullName) {
        localStorage.setItem('userFullName', response.data.fullName);
      }

      if (response.data.id ) {
        localStorage.setItem('customerId', response.data.id.toString());
      }
    }

    return response.data;
  } catch (error: any) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.clear();
};

/**
 * Sends registration data to the SimplCommerce API
 */
export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/account/register', data);

    // If your API automatically logs the user in after registration:
    if (response.data.success && response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      
      if (response.data.fullName) {
        localStorage.setItem('userFullName', response.data.fullName);
      }
    }

    return response.data;
  } catch (error: any) {
    console.error("Registration API Error:", error.response?.data || error.message);
    throw error;
  }
};

// @/services/authService.ts
export const isAuthenticated = () => {
  // Check if token exists in cookies or localStorage
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("userToken"); 
  }
  return false;
};