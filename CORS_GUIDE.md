# حل مشکلات CORS

## مشکل CORS چیست؟

خطای CORS زمانی رخ می‌دهد که:
- درخواست از **domain/port متفاوت** ارسال شود
- سرور header های CORS درست نفرستد

## راه‌حل‌های پیاده‌سازی شده:

### 1️⃣ **Proxy در Vite** ✅
```bash
# vite.config.ts تنظیم شده است
server: {
  proxy: {
    '/v1': {
      target: 'http://192.168.20.33:2222',
      changeOrigin: true,
    }
  }
}
```

### 2️⃣ **متغیرهای محیطی** ✅
```bash
# .env.local
VITE_API_BASE_URL=/v1
```

### 3️⃣ **Headers CORS** ✅
```javascript
// axiosInstance.ts
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

### 4️⃣ **Error Handling** ✅
```javascript
// corsHelper.ts
isCORSError() - بررسی خطاهای CORS
getCORSErrorMessage() - پیام کمکی
```

## مراحل استفاده:

### **در Development:**
```bash
# سرور Vite خودکار proxy می‌کند
npm run dev
```

درخواست‌های شما:
```
http://localhost:5173/v1/login
        ↓ (proxy)
http://192.168.20.33:2222/v1/login
```

### **در Production:**
سرور باید CORS headers را بفرستد:
```
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## بررسی Checklist:

- [ ] آیا سرور در `http://192.168.20.33:2222` در دسترس است؟
- [ ] آیا `vite.config.ts` proxy را داشته است؟
- [ ] آیا `.env.local` وجود دارد؟
- [ ] آیا `axiosInstance.ts` CORS headers را دارد؟
- [ ] آیا کنسول مرورگر خطاهای بیشتری نشان می‌دهد؟

## بیشتر اطلاعات:

- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Vite Proxy](https://vitejs.dev/config/server-options.html#server-proxy)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

---

اگر مشکل برطرف نشد، لطفاً مشکلات زیر را بررسی کنید:
1. کنسول مرورگر (F12 → Console)
2. Network tab (F12 → Network)
3. Server logs
