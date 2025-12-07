# استفاده localStorage برای Token

## ✅ تغییرات انجام شده:

### 1️⃣ **`src/utils/token.ts`** - از localStorage
```typescript
✅ setAuthToken() - localStorage.setItem()
✅ getAuthToken() - localStorage.getItem()
✅ clearAuthToken() - localStorage.removeItem()
✅ hasAuthToken() - بررسی وجود token
```

### 2️⃣ **`src/api/axiosInstance.ts`** - بروز شد
```typescript
✅ withCredentials: false (localStorage استفاده می‌شود)
✅ Token خودکار از localStorage خوانده می‌شود
✅ Authorization header اضافه می‌شود
✅ 401 handling → /auth redirect
```

### 3️⃣ **`src/features/auth/types/index.ts`** - ثابت شد
```typescript
✅ access_token → accessToken (consistency)
```

### 4️⃣ **`src/features/auth/services/authService.ts`** - بروز شد
```typescript
✅ data.accessToken استفاده می‌شود
✅ توکن در localStorage ذخیره می‌شود
```

---

## فلو کار:

```
Login Page
  ↓
loginApi(username, password)
  ↓
Server Response: { user, accessToken }
  ↓
setAuthToken(accessToken)
  └─ localStorage.setItem("accessToken", token) ✅
  
Page Refresh/Navigate
  ↓
getAuthToken()
  └─ localStorage.getItem("accessToken") ✅
  
API Call
  ↓
axiosInstance.request
  ├─ token = getAuthToken()
  ├─ Authorization: Bearer {token}
  └─ API response
```

---

## localStorage vs Cookie:

### localStorage:
✅ تا تا زمانی که حذف نشود ماند  
✅ XSS vulnerabilities  
✅ بزرگتر (5-10MB)  
✅ دسترسی آسان (JSON)  

### Cookie:
✅ Secure flag  
✅ HttpOnly (JS نمی‌تواند دسترسی پیدا کند)  
✅ CSRF protection  
❌ محدودتر (4KB)  

---

## Test کردن:

### **1. DevTools → Application → Local Storage**
```
Key: accessToken
Value: eyJ0eXAiOiJKV1QiL...
```

### **2. Console:**
```javascript
// دریافت token
import { getAuthToken } from './utils/token';
getAuthToken();
// نتیجه: "eyJ0eXAi..."

// بررسی localStorage
localStorage.getItem('accessToken');
```

### **3. Network Tab:**
```
Request Headers:
Authorization: Bearer eyJ0eXAi...
```

---

## مختصر:

- ✅ Token در localStorage ذخیره می‌شود
- ✅ Page refresh بعد از logout: token محو می‌شود
- ✅ Page refresh بعد از login: token باقی می‌ماند
- ✅ API calls: token خودکار ارسال می‌شود
- ✅ 401 error: redirect به /auth

**آماده! 🚀**
