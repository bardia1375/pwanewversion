# استفاده از Mission Service

## راه‌حل پیاده‌سازی شده:

### 1️⃣ **Token خودکار ارسال می‌شود**
```typescript
// axiosInstance.ts
const token = getAuthToken();
config.headers["Authorization"] = `Bearer ${token}`;
```

### 2️⃣ **Retry خودکار برای 401**
```typescript
// اگر 401 خطا بخورد:
// 1. تلاش برای refresh token
// 2. اگر ناموفق → redirect به /auth
```

### 3️⃣ **نوع‌های صحیح برای Mission**
```typescript
export interface Mission {
  id: number;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  description?: string;
}
```

---

## استفاده در Component:

### **روش 1: با Hook (توصیه می‌شود)**
```tsx
import { useMissions } from "../hooks/useMissions";

export default function MyMissionsPage() {
  const { data, isLoading, error } = useMissions();
  
  if (isLoading) return <div>در حال بارگیری...</div>;
  if (error) return <div>خطا: {error.message}</div>;
  
  return (
    <div>
      {data?.data?.map((mission) => (
        <div key={mission.id}>
          <h3>{mission.title}</h3>
          <p>{mission.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### **روش 2: با تاریخ‌های Custom**
```tsx
const { data } = useMissions("1402-01-01", "1402-01-31");
// یا
const today = new Date().toISOString().split('T')[0];
const { data } = useMissions(today, today);
```

### **روش 3: مستقیم (بدون Hook)**
```tsx
import { getMissions } from "../services/missionService";

const data = await getMissions("1402-01-01", "1402-01-31");
```

---

## فلو کار:

```
1. Component درخواست ارسال می‌کند
        ↓
2. axiosInstance:
   - ✅ Token را از کوکی می‌خواند
   - ✅ Authorization Header اضافه می‌کند
   - ✅ درخواست ارسال می‌کند
        ↓
3. اگر 401:
   - ❌ Token منقضی
   - ✅ تلاش برای refresh
   - اگر ناموفق → /auth
        ↓
4. اگر 200:
   - ✅ داده‌های Mission برگشت می‌آیند
```

---

## بررسی Checklist:

- ✅ Token در کوکی ذخیره می‌شود
- ✅ axiosInstance توکن را ارسال می‌کند
- ✅ 401 retry logic فعال است
- ✅ Redirect به /auth در صورت ناموفق
- ✅ Mission types صحیح تعریف شدند
- ✅ Hook برای استفاده راحت ایجاد شد
