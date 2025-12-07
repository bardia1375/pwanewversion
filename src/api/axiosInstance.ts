// src/api/axiosInstance.ts
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from "axios";
import { getAuthToken, setAuthToken, clearAuthToken } from "../utils/token";
import { useAuthStore } from "../features/auth/store/authStore";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (err?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
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
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://192.168.20.33:2222/v1",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,      // <<<<<<<< مهم ــ الزامی برای refresh cookie
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
    const originalRequest = error.config!;
    if (!originalRequest) return Promise.reject(error);

    // --- Only handle 401 ---
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        })
          .then((cfg: any) => axiosInstance.request(cfg))
          .catch((err) => Promise.reject(err));
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
        } catch (_) {}

        processQueue(null, newToken);

        // retry original
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthToken();

        try {
          useAuthStore.getState().logout?.();
        } catch (_) {}

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
