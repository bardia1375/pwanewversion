// src/utils/cookieHelper.ts

/**
 * Helper functions برای مدیریت کوکی‌ها
 */

/**
 * نمایش تمام کوکی‌های موجود (برای debugging)
 */
export const logAllCookies = () => {
  console.log("📦 All Cookies:", document.cookie);
  
  const cookies: Record<string, string> = {};
  document.cookie.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    if (key) {
      cookies[key] = decodeURIComponent(value || "");
    }
  });
  
  console.table(cookies);
};

/**
 * دریافت یک کوکی خاص
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  return null;
};

/**
 * تعیین کوکی
 */
export const setCookie = (
  name: string,
  value: string,
  days: number = 365,
  options: { path?: string; sameSite?: string } = {}
) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  let cookieString = `${name}=${encodeURIComponent(value)}; `;
  cookieString += `expires=${expires.toUTCString()}; `;
  cookieString += `path=${options.path || "/"}; `;
  cookieString += `max-age=${days * 24 * 60 * 60}`;
  
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

/**
 * حذف کوکی
 */
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; max-age=0`;
};

/**
 * بررسی وجود کوکی
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};
