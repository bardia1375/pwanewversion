// src/utils/token.ts

// نام کلید localStorage برای ذخیره Access Token
const TOKEN_KEY = "accessToken";

/**
 * ذخیره‌سازی توکن در localStorage
 * @param token 
 */
export const setAuthToken = (token: string | null) => {
  if (!token) {
    clearAuthToken();
    return;
  }

  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("خطا در ذخیره توکن:", error);
  }
};

/**
 * دریافت توکن از localStorage
 */
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("خطا در دریافت توکن:", error);
    return null;
  }
};

/**
 * بررسی وجود توکن
 */
export const hasAuthToken = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * حذف توکن از localStorage
 */
export const clearAuthToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("خطا در حذف توکن:", error);
  }
};
