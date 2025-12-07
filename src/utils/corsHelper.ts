// src/utils/corsHelper.ts

/**
 * راهنمای حل مشکلات CORS
 * 
 * CORS (Cross-Origin Resource Sharing) خطایی است که زمانی رخ می‌دهد که:
 * 1. درخواست از domain/port متفاوتی ارسال شود
 * 2. سرور header های CORS درست نفرستد
 */

export const CORS_SOLUTIONS = {
  /**
   * راه‌حل 1: تنظیم proxy در vite.config.ts
   * در توسعه، درخواست‌ها به /v1 ارسال می‌شوند و Vite آن‌ها را به سرور proxy می‌کند
   */
  PROXY_SOLUTION: `
    // vite.config.ts
    server: {
      proxy: {
        '/v1': {
          target: 'http://192.168.20.33:2222',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\\/v1/, '/v1'),
        }
      }
    }
  `,

  /**
   * راه‌حل 2: سرور باید این header‌ها را بفرستد
   */
  SERVER_CORS_HEADERS: {
    "Access-Control-Allow-Origin": "http://localhost:5173", // یا "*" برای همه
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "3600",
  },

  /**
   * راه‌حل 3: برای Production
   * - سرور باید CORS را درست پیاده‌سازی کند
   * - یا Backend و Frontend روی دومین یکسان اجرا شوند
   */
  PRODUCTION_TIPS: `
    1. سرور CORS headers درست بفرستد
    2. Credentials باید true باشد اگر کوکی استفاده می‌شود
    3. Origin مجاز باید مشخص باشد (نه *)
  `,

  /**
   * راه‌حل 4: اگر سرور CORS را پشتیبانی نمی‌کند
   * - از JSONP استفاده کنید (اگر سرور پشتیبانی کند)
   * - یا یک Backend proxy ایجاد کنید
   * - یا درخواست‌ها را از Backend ارسال کنید
   */
};

/**
 * بررسی خطاهای CORS
 */
export const isCORSError = (error: Record<string, unknown>): boolean => {
  const errorMessage = (error?.message as string)?.toLowerCase() || "";
  const errorCode = error?.code as string || "";
  
  return (
    errorMessage.includes("cors") ||
    errorMessage.includes("network error") ||
    errorCode === "ERR_NETWORK" ||
    (error?.response === undefined && error?.request !== undefined)
  );
};

/**
 * پیام کمکی برای خطاهای CORS
 */
export const getCORSErrorMessage = (): string => {
  return `
    خطای CORS شناسایی شد!
    
    بررسی موارد زیر:
    1. آیا سرور CORS headers را می‌فرستد؟
    2. آیا API Base URL درست است؟
    3. آیا درخواست از proxy درست استفاده می‌کند؟
    
    برای مزید اطلاعات به کنسول مرورگر نگاه کنید.
  `;
};
