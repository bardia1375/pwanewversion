// src/features/auth/store/auth.store.ts
import { create } from "zustand";
import { setAuthToken, clearAuthToken } from "../../../utils/token";
import axiosInstance from "../../../api/axiosInstance";
import type { User } from "../types";
import { meApi ,loginApi, logoutApi, userApi} from "../services/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;

  setToken?: (token: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setToken: (token) => {
    set({ token: token ?? null, isAuthenticated: !!token });
    setAuthToken(token ?? null); // update module-level memory token
    if (token) {
      // set default header for axios so new requests automatically carry token
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  },

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });
      const data = await loginApi({ username, password },userApi);
   
    
      
      const { user, accessToken } = data;   
      // const userApiData =await userApi() 
      //  console.log("userApiData",userApiData);
      // set token in memory and store
      setAuthToken(accessToken);
      set({ user, token: accessToken, isAuthenticated: true });
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Login failed"),
        isAuthenticated: false,
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await logoutApi();
      // clear store and memory token
      clearAuthToken();
      set({ user: null, token: null, isAuthenticated: false });
      delete axiosInstance.defaults.headers.common["Authorization"];
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error("Logout failed") });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      // If we already have an access token in memory, try fetch me
      const token = get().token;
      if (!token) {
        // try to refresh via cookie by calling /auth/refresh (server will use refresh cookie)
        // But better to call /auth/me directly — server may accept cookie-based session
      }

      const data = await meApi();
      set({ user: data, isAuthenticated: true });
    } catch (err) {
      set({ user: null, token: null, isAuthenticated: false });
      clearAuthToken();
    } finally {
      set({ isLoading: false });
    }
  },
}));
