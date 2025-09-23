import { create } from 'zustand';
import type { AuthState } from '../types';
import { login as loginApi, logout as logoutApi, getCurrentUser } from '../services/authService';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const user = await loginApi({ email, password });
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Login failed') });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await logoutApi();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Logout failed') });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await getCurrentUser();
      set({ user, isAuthenticated: !!user });
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Auth check failed') });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
