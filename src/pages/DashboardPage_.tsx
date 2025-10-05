import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet icons issue in React
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function DashboardPage_() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userName = "چاندرا";

  // Sample data for check-in/out
  const checkInTime = "09:10";
  const checkInStatus = "به موقع";
  const checkOutTime = "--:--";
  const checkOutStatus = "ندارد";
  const breakStartTime = "11:40";
  const breakStatus = "خیلی زود";
  const overtimeHours = 8;
  const lastUpdateDate = "18 تیر 1403";

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Set up Leaflet map and clean up on unmount
  useEffect(() => {
    // Fix for Leaflet icon issue in React
    // @ts-expect-error: Accessing private property
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    // Force recalculation of the map size when component mounts
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);

    return () => {
      // Clean up any Leaflet artifacts if needed
    };
  }, []);

  // Theme-based styles
  const themeStyles = {
    background: isDarkMode ? "bg-gray-900" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-800",
    card: isDarkMode ? "bg-gray-800" : "bg-white shadow-md",
    cardContent: isDarkMode ? "bg-gray-700/50" : "bg-gray-100",
    subText: isDarkMode ? "text-gray-400" : "text-gray-500",
    buttonBg: isDarkMode ? "bg-gray-800" : "bg-white/90 shadow",
  };

  return (
    <div
      className={`flex flex-col h-screen ${themeStyles.background} ${themeStyles.text} font-vazirmatn`}
      dir="rtl"
    >
      <div className="bg-gradient-to-b from-[#0d2b6b] to-[#6ec6e7] p-4 pb-12 relative z-0">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/20 text-white text-xs"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {/* Header */}
        <div className="flex justify-between mb-2">
          <button
            className={`p-2 ${
              isDarkMode ? "bg-gray-800" : "bg-white/90 shadow"
            } rounded-full`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <button
              className={`p-2 ${
                isDarkMode ? "bg-gray-800" : "bg-white/90 shadow"
              } rounded-full`}
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
              className="w-10 h-10 rounded-full bg-cover bg-center overflow-hidden border-2 border-white"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/women/44.jpg")',
              }}
            ></div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-6">
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-100"
            }`}
          >
            وقت آن است که بهترین عملکرد خود را داشته باشید
          </p>
          <h1 className="text-2xl font-bold text-white">چه خبر، {userName}!</h1>
        </div>
      </div>

      {/* Overview Card - Sits on top of the gradient with negative margin */}
      <div
        className={`${themeStyles.card} rounded-t-3xl p-6 -mt-8 relative z-10 mb-6`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">نمای کلی</h2>
          <button className="flex items-center gap-2 text-sm text-blue-400">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="text-blue-400 ml-1"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
            چهارشنبه، ۲۲ تیر ۱۴۰۳
          </button>
        </div>

        {/* Check In/Out Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Check In */}
          <div className={`${themeStyles.cardContent} rounded-xl p-3 relative`}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-blue-400"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <span>ورود</span>
              </div>
              <button>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-semibold">{checkInTime}</span>
              <span className={`text-xs ${themeStyles.subText} mb-1`}>صبح</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${themeStyles.subText}`}>
                ورود موفق
              </span>
              <span
                className={twMerge(
                  "text-xs px-2 py-1 rounded-full",
                  checkInStatus === "به موقع"
                    ? "bg-orange-500/20 text-orange-400"
                    : ""
                )}
              >
                {checkInStatus}
              </span>
            </div>
          </div>

          {/* Check Out */}
          <div className={`${themeStyles.cardContent} rounded-xl p-3 relative`}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center">
                  <span className="text-purple-400 text-xs">؟</span>
                </div>
                <span>خروج</span>
              </div>
              <button>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-semibold">{checkOutTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${themeStyles.subText}`}>
                هنوز زمان آن نیست
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-gray-600/50 text-gray-400"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {checkOutStatus}
              </span>
            </div>
          </div>

          {/* Break */}
          <div className={`${themeStyles.cardContent} rounded-xl p-3 relative`}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-400/20 flex items-center justify-center">
                  <span className="text-indigo-400 text-xs">ا</span>
                </div>
                <span>استراحت</span>
              </div>
              <button>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-semibold">{breakStartTime}</span>
              <span className={`text-xs ${themeStyles.subText} mb-1`}>صبح</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${themeStyles.subText}`}>
                استراحت در جریان
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                {breakStatus}
              </span>
            </div>
          </div>

          {/* Overtime */}
          <div className={`${themeStyles.cardContent} rounded-xl p-3 relative`}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <span>اضافه‌کاری</span>
              </div>
              <button>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold">مجموع</span>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-semibold">{overtimeHours}</span>
                <span className={`text-xs ${themeStyles.subText} mb-1`}>
                  ساعت
                </span>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <span className={`text-xs ${themeStyles.subText}`}>
                به‌روز رسانی، {lastUpdateDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <div>
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-lg font-semibold">موقعیت فعلی</h2>
        </div>

        {/* Location Map with Leaflet */}
        <div
          className={`relative ${themeStyles.card} rounded-xl overflow-hidden`}
        >
          {/* Map header */}
          <div className="px-4 py-3 bg-white z-10 rounded-t-xl flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            </div>
            <div>
              <p className="text-xs text-gray-500">موقعیت فعلی</p>
              <p className="text-sm font-medium text-gray-800">
                دفتر مرکزی - درب ورودی
              </p>
            </div>
          </div>

          {/* Map area */}
          <div className="h-64">
            <MapContainer
              center={[35.7219, 51.3347]}
              zoom={15}
              style={{ height: "100%", width: "100%", zIndex: 1 }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                opacity={0.7}
              />
              {/* Geofence circles */}
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
              {/* Location marker */}
              <Marker position={[35.7219, 51.3347]} icon={customIcon}>
                <Popup>دفتر مرکزی - درب ورودی</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Check in button */}
          <div className="px-4 py-3">
            <button className="w-full py-3 bg-black text-white rounded-full font-medium text-center">
              ثبت ورود
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage_;
