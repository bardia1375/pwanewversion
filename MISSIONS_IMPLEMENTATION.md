# استفاده از useMissions Hook

## ✅ پیاده‌سازی تکمیل شد

### فایل‌های ایجاد/تغییر یافته:

#### 1️⃣ **`src/features/MyMissions/services/missionService.ts`**
```typescript
✅ MissionData interface (فرمت API)
✅ MissionValues interface (مقادیر داخل object)
✅ getMissions() function
```

#### 2️⃣ **`src/features/MyMissions/hooks/useMissions.ts`**
```typescript
✅ useMissions() hook - React Query
✅ transformMissionData() - تبدیل API → Mission
```

#### 3️⃣ **`src/features/MyMissions/pages/MyMissionsPage.tsx`** (نو)
```typescript
✅ صفحه اصلی ماموریت‌ها
✅ Loading state
✅ Error handling
✅ نمایش لیست MissionCard
```

#### 4️⃣ **`src/features/MyMissions/pages/MissionCard.tsx`** (بهبود)
```typescript
✅ حذف React import غیرضروری
```

---

## استفاده در Component:

```tsx
import { useMissions, transformMissionData } from '../hooks/useMissions';
import MissionCard from './MissionCard';

export default function MyMissionsPage() {
  // دریافت داده‌های Mission از API
  const { data: missionsData, isLoading, error } = useMissions();

  // تبدیل MissionData → Mission
  const missions = useMemo(() => {
    if (!missionsData) return [];
    return missionsData.map(transformMissionData);
  }, [missionsData]);

  return (
    <>
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </>
  );
}
```

---

## فرمت داده‌های API → نمایش:

### API Response:
```json
{
  "id": 6020,
  "user_id": 109,
  "type_id": 154,
  "status": "accepted",
  "values": {
    "date_from": "2024-02-27",
    "date_to": "2024-02-27"
  },
  "description": "نمایشگاه",
  "created_at": "2024-04-02T12:48:20.153"
}
```

### تبدیل شده برای نمایش:
```typescript
{
  id: 6020,
  title: "ماموریت - تیپ 154",
  location: "نمایشگاه",
  startDate: "1403/12/07",  // تاریخ شمسی
  endDate: "1403/12/07",
  status: "approved",  // "accepted" → "approved"
  description: "نمایشگاه"
}
```

---

## Status Mapping:

```
API Status       → نمایش
─────────────────────────
"accepted"      → "approved" (تایید شده) ✅
"rejected"      → "rejected" (رد شده) ❌
(سایر)          → "pending" (در انتظار) ⏳
```

---

## Token Handling:

```
MyMissionsPage
    ↓
useMissions() Hook
    ↓
getMissions() Service
    ↓
axiosInstance
    ├─ ✅ توکن از کوکی دریافت
    ├─ ✅ Authorization Header اضافه
    ├─ ✅ درخواست ارسال
    │
    └─ اگر 401:
       ├─ ✅ تلاش برای refresh
       └─ اگر ناموفق → /auth redirect
```

---

## مثال استفاده کامل:

```tsx
// صفحه
import MyMissionsPage from './features/MyMissions/pages/MyMissionsPage';

// روتر
<Route path="/missions" element={<MyMissionsPage />} />

// فراخوانی
useNavigate('/missions');
```

---

## Checklist:

- ✅ useMissions hook استفاده می‌شود
- ✅ API data تبدیل می‌شود
- ✅ Token خودکار ارسال می‌شود
- ✅ 401 handling فعال است
- ✅ Loading/Error states
- ✅ تاریخ‌های شمسی نمایش می‌یابند
