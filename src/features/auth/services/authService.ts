import axios from "axios";
import type { AuthCredentials, LoginResponse } from "../types";
import axiosInstance from "../../../api/axiosInstance";
import { setAuthToken, clearAuthToken } from "../../../utils/token";

const BASE_URL = "/api/auth";

export const loginApi = async (
  payload: AuthCredentials,
  callback: () => void
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>("/login", payload);
  callback();
  console.log("data.accessToken",data?.access_token);
  
  // ذخیره‌سازی توکن در کوکی
  if (data.access_token) {
    setAuthToken(data.access_token);
  }
  
  return data;
};
export const userApi = async (): Promise<{ access_token: string }> => {
  const { data } = await axiosInstance.get(
    "user?includes%5B0%5D=profile.company&includes%5B1%5D=positions&includes%5B2%5D=taInfo&includes%5B3%5D=roles",
    {}
  );

  return data;
};
export const refreshApi = async (): Promise<{ access_token: string }> => {
  const { data } = await axiosInstance.post("/auth/refresh", {});
  
  // بروز رسانی توکن در کوکی
  if (data.access_token) {
    setAuthToken(data.access_token);
  }
  
  return data;
};
export const logoutApi = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  
  // پاک کردن توکن از کوکی
  clearAuthToken();
};

// export async function getCurrentUser(): Promise<User | null> {
//   const response = await fetch(`${BASE_URL}/me`);
//   if (!response.ok) {
//     return null;
//   }
//   return response.json();
// }

export const meApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/me`);
  return data;
};
