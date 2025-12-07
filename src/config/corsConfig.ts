// src/config/corsConfig.ts

/**
 * تنظیمات CORS برای API
 * در صورتی که سرور CORS را درست پیاده‌سازی نکرده باشد،
 * می‌توانید از proxy یا تغییر API BASE_URL استفاده کنید
 */

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

/**
 * اگر سرور CORS را پشتیبانی نمی‌کند،
 * می‌توانید از یک proxy سرور استفاده کنید
 * 
 * مثال:
 * const API_BASE_URL = process.env.VITE_API_PROXY || "http://192.168.20.33:2222/v1";
 */

// راه‌های حل CORS:
// 1. سرور باید درست header های CORS بفرستد
// 2. از proxy سرور استفاده کنید
// 3. تنظیمات vite.config.ts را برای proxy تغییر دهید
