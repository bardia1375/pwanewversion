// src/api/axiosInstance.ts
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from "axios";
import { getAuthToken, setAuthToken, clearAuthToken } from "../utils/token";
import { isCORSError, getCORSErrorMessage } from "../utils/corsHelper";
import { useAuthStore } from "../features/auth/store/authStore";

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (err?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else {
      if (token && prom.config.headers)
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      prom.resolve(prom.config);
    }
  });
  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: false - localStorage استفاده می‌کنم، نه کوکی
});

// ------------------------------------------
// REQUEST
// ------------------------------------------
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  
  if (token && config.headers) {  
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ------------------------------------------
// RESPONSE
// ------------------------------------------
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError & { config?: AxiosRequestConfig }) => {
    const originalRequest = error.config as RetryConfig;
    if (!originalRequest) return Promise.reject(error);

    // --- Only handle 401 ---
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        })
          .then((cfg) => axiosInstance.request(cfg as AxiosRequestConfig))
          .catch((err: Error) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refresh endpoint WITH COOKIES automatically
        const resp = await axiosInstance.post("/auth/refresh");

        const newToken = resp.data?.accessToken;
        setAuthToken(newToken);

        try {
          useAuthStore.getState().setToken?.(newToken);
        } catch {
          // ignore
        }

        processQueue(null, newToken);

        // retry original
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError instanceof Error ? refreshError : new Error(String(refreshError)), null);
        clearAuthToken();

        try {
          useAuthStore.getState().logout?.();
        } catch {
          // ignore
        }

        // ریدایرکت به صفحه لاگین
        window.location.href = "/auth";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // اگر 401 خطا بخورد بدون refresh token
    if (error.response?.status === 401) {
      clearAuthToken();
      
      try {
        useAuthStore.getState().logout?.();
      } catch {
        // ignore
      }
      
      // ریدایرکت به صفحه لاگین
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

// ------------------------------------------
// ERROR HANDLING FOR CORS
// ------------------------------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError | Record<string, unknown>) => {
    const axiosError = error as AxiosError;
    
    if (!axiosError.response) {
      // Network error or CORS error
      console.error("CORS or Network Error:", axiosError.message);
      
      if (isCORSError(error as Record<string, unknown>)) {
        console.warn(getCORSErrorMessage());
      }
      
      // اگر خطای CORS است، پیام کاربردی نمایش دهید
      if (axiosError.message === "Network Error" || (error as Record<string, unknown>)?.code === "ERR_NETWORK") {
        return Promise.reject(
          new Error("مشکل اتصال با سرور. لطفاً اینترنت خود را بررسی کنید یا با پشتیبانی تماس بگیرید.")
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
