export interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface AuthCredentials {
  username: string;
  password: string;
}



export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

// src/features/auth/types/auth.types.ts
export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  name?: string;
  roles?: string[];
}

export interface LoginResponse {
  user: User;
  accessToken: string; // short-lived token
}
