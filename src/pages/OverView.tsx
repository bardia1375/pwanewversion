import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const GRADIENT_BACKGROUND =
  "linear-gradient(180deg, #1f6bd8 0%, #1d5dc2 55%, #14419a 100%)";

// Custom icon for location marker
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface FingerprintIconProps {
  className?: string;
}
function FingerprintIcon({ className = "" }: FingerprintIconProps) {
  return (
    <img
      onClick={() => console.log("salam")}
      className={"" + className}
      width={"70%"}
      draggable={false}
      alt="اثر انگشت"
      src="https://dl.shut.ir/public/file/2023/10/22/%D8%B9%DA%A9%D8%B3-%D8%A7%D8%AB%D8%B1-%D8%A7%D9%86%DA%AF%D8%B4%D8%AA-png.png"
    />
  );
}

const ACTION_BUTTONS = [
  { label: "Office", variant: "primary" },
  { label: "Remote", variant: "secondary" },
];

const QUICK_NOTES = [
  {
    title: "آخرین ورود",
    detail: "امروز · ۰۸:۱۰ صبح",
  },
  {
    title: "شیفت بعدی",
    detail: "فردا · ۰۸:۰۰ صبح",
  },
  {
    title: "پشتیبانی",
    detail: "در صورت نیاز با سرپرست تماس بگیرید",
  },
];

function OverView() {
  const isDarkMode = false;
  const [showMapModal, setShowMapModal] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [activeNavItem, setActiveNavItem] = useState("fingerprint"); // Navigation state

  // Data for the overview cards
  const checkInTime = "08:15";
  const checkInStatus = "به موقع";
  const checkOutTime = "--:--";
  const checkOutStatus = "منتظر";
  const breakStartTime = "11:30";
  const breakStatus = "فعال";
  const overtimeHours = "2.5";
  const lastUpdateDate = "امروز";

  const handleFingerprintClick = () => {
    console.log("salam");

    setShowMapModal(true);
  };

  const handleCloseModal = () => {
    setShowMapModal(false);
    setLocationChecked(false);
    setUserLocation(null);
    setIsLoadingLocation(false);
  };

  const handleCheckLocation = () => {
    setIsLoadingLocation(true);

    // Simulate location checking with geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setUserLocation([
              position.coords.latitude,
              position.coords.longitude,
            ]);
            setIsLoadingLocation(false);
            setLocationChecked(true);
          }, 2000); // 2 second delay for loading animation
        },
        () => {
          // Fallback to a demo location near the office
          setTimeout(() => {
            setUserLocation([35.722, 51.3348]); // Close to office location
            setIsLoadingLocation(false);
            setLocationChecked(true);
          }, 2000);
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setTimeout(() => {
        setUserLocation([35.722, 51.3348]);
        setIsLoadingLocation(false);
        setLocationChecked(true);
      }, 2000);
    }
  };

  const handleTakeSelfie = () => {
    alert("دوربین برای گرفتن سلفی باز خواهد شد");
    // Here you would implement camera functionality
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: GRADIENT_BACKGROUND }}
      dir="rtl"
    >
      <header className="relative z-30 flex-shrink-0 pt-8 pb-28 px-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <button
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800 text-gray-100 hover:bg-slate-700"
                : "bg-white/15 text-white shadow-sm backdrop-blur hover:bg-white/25"
            }`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <button
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-800 text-gray-100 hover:bg-slate-700"
                  : "bg-white/15 text-white shadow-sm backdrop-blur hover:bg-white/25"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            </button>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center overflow-hidden border-2 border-white/70"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/women/44.jpg")',
              }}
            ></div>
          </div>
        </div>

        <div className="mb-12">
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-300" : "text-blue-50/80"
            }`}
          >
            وقت آن است که بهترین عملکرد خود را داشته باشید
          </p>
          <h1 className="text-lg font-bold text-white">چه خبر، بردیا!</h1>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col -mt-20">
        <div className="relative z-10 bg-white rounded-t-[24px] shadow-xl flex-1 px-4 sm:px-6 pt-16 pb-24 overflow-visible">
          {/* دکمه اثر انگشت */}
          <div
            className="absolute left-1/2 -top-24 -translate-x-1/2 w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[10px] border-[#1f6bd8] bg-white flex items-center justify-center shadow-[0_18px_35px_rgba(15,56,128,0.22)] z-40 cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1f6bd8]/40"
            onClick={handleFingerprintClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleFingerprintClick();
              }
            }}
            aria-label="ثبت حضور با اثر انگشت"
          >
            <FingerprintIcon />
          </div>

          {/* عنوان داشبورد */}
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              مرکز فرمان شخصی
            </h2>
            <p className="text-slate-600 text-xs">
              گزارش جامع وضعیت کاری و عملکرد روزانه
            </p>
          </div>


          {/* Overview Card - نمای کلی */}
          <div className="bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 rounded-3xl shadow-xl shadow-slate-200/40 border border-white/60 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
            {/* Header with animated gradient */}
            <div className="bg-gradient-to-r from-slate-50/80 via-blue-50/40 to-slate-50/80 px-6 py-5 border-b border-slate-200/30 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30"></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-pulse opacity-75"></div>
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    نمای کلی امروز
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-purple-600 p-1 text-white">
                    <svg
                      viewBox="0 0 24 24"
                      width="8"
                      height="8"
                      fill="currentColor"
                    >
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                    </svg>
                  </div>
                  <span className="font-medium">یکشنبه، ۸ مهر ۱۴۰۴</span>
                </div>
              </div>
            </div>

            {/* Check In/Out Grid */}
            <div className="p-2 grid grid-cols-2 gap-5">
              {/* Check In - ورود */}
              <div className="group bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 rounded-2xl p-2 border border-emerald-100/60 hover:border-emerald-200/80 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="text-white"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-900 transition-colors">
                        ورود
                      </span>
                      <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full mt-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        {checkInTime}
                      </span>
                      <span className="text-xs text-emerald-600/80 font-semibold">
                        صبح
                      </span>
                    </div>
                    <div className="text-xs text-emerald-600/60 font-medium">
                      ✓ به موقع
                    </div>
                  </div>
                </div>
              </div>

              {/* Check Out - خروج */}
              <div className="group bg-gradient-to-br from-slate-50/80 via-white to-slate-50/40 rounded-2xl p-2 border border-slate-200/60 hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-500/20 group-hover:shadow-slate-500/40 transition-all duration-300 group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="text-white"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.58 8 8-3.59 8-8 8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-800 transition-colors">
                        خروج
                      </span>
                      <div className="w-6 h-0.5 bg-gradient-to-r from-slate-400 to-slate-300 rounded-full mt-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-400 group-hover:scale-105 transition-transform duration-300">
                        {checkOutTime}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400/70 font-medium">
                      ⏳ در انتظار
                    </div>
                  </div>
                </div>
              </div>

              {/* Break - مرخصی باقیمانده */}
              <div className="group bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 rounded-2xl p-2 border border-amber-100/60 hover:border-amber-200/80 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="text-white"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-800 group-hover:text-amber-900 transition-colors leading-tight">
                        مرخصی باقیمانده
                      </span>
                      <div className="w-6 h-0.5 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mt-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        {breakStartTime}
                      </span>
                      <span className="text-xs text-amber-600/80 font-semibold">
                        روز
                      </span>
                    </div>
                    <div className="text-xs text-amber-600/60 font-medium">
                      📅 قابل استفاده
                    </div>
                  </div>
                </div>
              </div>

              {/* Overtime - اضافه‌کاری */}
              <div className="group bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 rounded-2xl p-2 border border-blue-100/60 hover:border-blue-200/80 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="text-white"
                      >
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-800 group-hover:text-blue-900 transition-colors leading-tight">
                        ساعات اضافی
                      </span>
                      <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full mt-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        {overtimeHours}
                      </span>
                      <span className="text-xs text-blue-600/80 font-semibold">
                        ساعت
                      </span>
                    </div>
                    <div className="text-xs text-blue-600/60 font-medium">
                      ⚡ این ماه
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - اقدامات سریع */}
          <div className="mb-8 px-2">
            <div className="grid grid-cols-4 gap-4">
              {/* Leaves Icon */}
              <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-green-50/80 via-white to-green-50/40 rounded-2xl border border-green-100/60 hover:border-green-200/80 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110 mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-green-800 group-hover:text-green-900 transition-colors text-center">
                  مرخصی
                </span>
              </button>

              {/* Clocking Icon */}
              <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 rounded-2xl border border-blue-100/60 hover:border-blue-200/80 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110 mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-blue-800 group-hover:text-blue-900 transition-colors text-center">
                  ساعت‌کاری
                </span>
              </button>

              {/* Missions Icon */}
              <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-purple-50/80 via-white to-purple-50/40 rounded-2xl border border-purple-100/60 hover:border-purple-200/80 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M12,2L13.09,8.26L22,9L14,14L17,23L12,18L7,23L10,14L2,9L10.91,8.26L12,2Z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-purple-800 group-hover:text-purple-900 transition-colors text-center">
                  ماموریت
                </span>
              </button>

              {/* Reports Icon */}
              <button className="group flex flex-col items-center p-4 bg-gradient-to-br from-orange-50/80 via-white to-orange-50/40 rounded-2xl border border-orange-100/60 hover:border-orange-200/80 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110 mb-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M19,3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19Z M7,10H9V17H7V10M11,7H13V17H11V7M15,13H17V17H15V13Z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-orange-800 group-hover:text-orange-900 transition-colors text-center">
                  گزارش
                </span>
              </button>
            </div>
          </div>

          {/* Performance Analytics - دایره‌های آماری */}
          <div className="bg-gradient-to-br from-white via-slate-50/30 to-purple-50/20 rounded-3xl shadow-xl shadow-slate-200/40 border border-white/60 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50/80 via-purple-50/40 to-slate-50/80 px-6 py-5 border-b border-slate-200/30 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30"></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-purple-400 animate-pulse opacity-75"></div>
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    آمار عملکرد ماهانه
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200/50 shadow-sm">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-indigo-600 p-1 text-white">
                    <svg
                      viewBox="0 0 24 24"
                      width="8"
                      height="8"
                      fill="currentColor"
                    >
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                    </svg>
                  </div>
                  <span className="font-medium">مهر ۱۴۰۴</span>
                </div>
              </div>
            </div>

            {/* Circular Progress Charts */}
            <div className="p-8 flex justify-center">
              <div className="relative w-64 h-64">
                {/* Background Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100/50 to-slate-200/30 backdrop-blur-sm"></div>
                
                {/* Outer Circle - حضور کل (85%) */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                    className="opacity-30"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#attendanceGradient)"
                    strokeWidth="3"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * 85) / 100}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Middle Circle - مرخصی باقیمانده (60%) */}
                <svg className="absolute inset-4 w-56 h-56 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="4"
                    className="opacity-30"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="url(#leaveGradient)"
                    strokeWidth="4"
                    strokeDasharray="239"
                    strokeDashoffset={239 - (239 * 60) / 100}
                    className="transition-all duration-1000 ease-out delay-300"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="leaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Circle - اضافه کاری (40%) */}
                <svg className="absolute inset-8 w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="5"
                    className="opacity-30"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="url(#overtimeGradient)"
                    strokeWidth="5"
                    strokeDasharray="188"
                    strokeDashoffset={188 - (188 * 40) / 100}
                    className="transition-all duration-1000 ease-out delay-600"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="overtimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      85%
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      عملکرد کل
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="px-8 pb-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                  <span className="text-xs font-semibold text-emerald-700">حضور</span>
                </div>
                <div className="text-lg font-bold text-emerald-800">85%</div>
                <div className="text-xs text-emerald-600/70">22 روز</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
                  <span className="text-xs font-semibold text-amber-700">مرخصی</span>
                </div>
                <div className="text-lg font-bold text-amber-800">60%</div>
                <div className="text-xs text-amber-600/70">18 روز</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <span className="text-xs font-semibold text-blue-700">اضافه کار</span>
                </div>
                <div className="text-lg font-bold text-blue-800">40%</div>
                <div className="text-xs text-blue-600/70">32 ساعت</div>
              </div>
            </div>
          </div>

          {/* دکمه‌های اقدام سریع */}
          {/* <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
            <button className="bg-[#1f6bd8] text-white py-3 px-4 rounded-xl font-medium transition-all hover:bg-[#14419a] focus:outline-none focus:ring-2 focus:ring-[#1f6bd8] focus:ring-offset-2">
              درخواست مرخصی
            </button>
            <button className="border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              گزارش ماموریت
            </button>
          </div> */}
        </div>
      </main>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-out"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-500 ease-out ${
              showMapModal ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1f6bd8] to-[#14419a] rounded-t-3xl p-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  بررسی موقعیت
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              {/* Handle bar for visual indication */}
              <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-2"></div>
            </div>

            {/* Map area */}
            <div className="h-80 relative bg-gray-50">
              {isLoadingLocation && (
                <div className="absolute inset-0 z-20 bg-white/90 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1f6bd8] border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                      در حال بررسی موقعیت شما...
                    </p>
                  </div>
                </div>
              )}

              <MapContainer
                center={userLocation || [35.7219, 51.3347]}
                zoom={15}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  opacity={0.7}
                />
                {/* Office location circles */}
                <Circle
                  center={[35.7219, 51.3347]}
                  pathOptions={{
                    color: "#4F46E5",
                    fillColor: "#4F46E5",
                    fillOpacity: 0.05,
                    weight: 1,
                  }}
                  radius={200}
                />
                <Circle
                  center={[35.7219, 51.3347]}
                  pathOptions={{
                    color: "#4F46E5",
                    fillColor: "#4F46E5",
                    fillOpacity: 0.1,
                    weight: 1,
                  }}
                  radius={100}
                />
                <Circle
                  center={[35.7219, 51.3347]}
                  pathOptions={{
                    color: "#4F46E5",
                    fillColor: "#4F46E5",
                    fillOpacity: 0.2,
                    weight: 1,
                  }}
                  radius={50}
                />

                {/* Office marker */}
                <Marker position={[35.7219, 51.3347]} icon={customIcon}>
                  <Popup>دفتر مرکزی - درب ورودی</Popup>
                </Marker>

                {/* User location marker */}
                {userLocation && locationChecked && (
                  <Marker
                    position={userLocation}
                    icon={
                      new L.Icon({
                        iconUrl:
                          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                        shadowUrl:
                          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                      })
                    }
                  >
                    <Popup>موقعیت فعلی شما</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            {/* Modal Footer */}
            <div className="p-2 border-t border-gray-100">
              {!locationChecked ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    برای ثبت حضور، ابتدا موقعیت خود را بررسی کنید
                  </p>
                  <button
                    onClick={handleCheckLocation}
                    disabled={isLoadingLocation}
                    className="w-full bg-[#1f6bd8] text-white py-4 px-6 rounded-xl font-medium transition-all hover:bg-[#14419a] focus:outline-none focus:ring-2 focus:ring-[#1f6bd8] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingLocation ? "در حال بررسی..." : "بررسی موقعیت"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-green-600 font-medium">
                        موقعیت شما تأیید شد
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      شما در محدوده دفتر قرار دارید
                    </p>
                  </div>

                  <button
                    onClick={handleTakeSelfie}
                    className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-medium transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    📸 گرفتن سلفی
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modern Bottom Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 px-6 py-4 shadow-2xl shadow-slate-900/10">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-6 bg-slate-100/80 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg shadow-slate-200/60">
            {/* Home Icon */}
            <button 
              onClick={() => setActiveNavItem("home")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                activeNavItem === "home" 
                  ? "bg-blue-500 shadow-lg shadow-blue-500/30" 
                  : "bg-slate-200/60 hover:bg-slate-300/60"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className={activeNavItem === "home" ? "text-white" : "text-slate-600"}
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </button>

            {/* Calendar Icon */}
            <button 
              onClick={() => setActiveNavItem("calendar")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                activeNavItem === "calendar" 
                  ? "bg-blue-500 shadow-lg shadow-blue-500/30" 
                  : "bg-slate-200/60 hover:bg-slate-300/60"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className={activeNavItem === "calendar" ? "text-white" : "text-slate-600"}
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
            </button>

            {/* Central Action Button - Fingerprint */}
            <button 
              onClick={() => {
                setActiveNavItem("fingerprint");
                handleFingerprintClick();
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl ${
                activeNavItem === "fingerprint"
                  ? "bg-gradient-to-br from-[#0f2f7a] to-[#14419a] shadow-blue-600/50"
                  : "bg-gradient-to-br from-[#1f6bd8] to-[#14419a] hover:from-[#14419a] hover:to-[#0f2f7a] shadow-blue-500/30 hover:shadow-blue-500/50"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.2.2.2.51 0 .71-.1.1-.23.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
              </svg>
            </button>

            {/* Reports Icon */}
            <button 
              onClick={() => setActiveNavItem("reports")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                activeNavItem === "reports" 
                  ? "bg-blue-500 shadow-lg shadow-blue-500/30" 
                  : "bg-slate-200/60 hover:bg-slate-300/60"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className={activeNavItem === "reports" ? "text-white" : "text-slate-600"}
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </button>

            {/* Profile Icon */}
            <button 
              onClick={() => setActiveNavItem("profile")}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                activeNavItem === "profile" 
                  ? "bg-blue-500 shadow-lg shadow-blue-500/30" 
                  : "bg-slate-200/60 hover:bg-slate-300/60"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className={activeNavItem === "profile" ? "text-white" : "text-slate-600"}
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
