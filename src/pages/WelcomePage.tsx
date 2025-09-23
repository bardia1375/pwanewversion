import React from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const WelcomePage: React.FC = () => {
  const isOnline = useOnlineStatus();

  const features = [
    { id: 1, text: "ثبت تردد", icon: "✓" },
    { id: 2, text: "مدیریت کارها و برنامه‌ها", icon: "✓" },
    { id: 3, text: "محاسبۀ حقوق و مزایا", icon: "✓" },
    { id: 4, text: "ثبت مرخصی و مأموریت", icon: "✓" },
  ];
  return (
    <div
      className="min-h-screen w-screen bg-bg p-4 flex items-center justify-center"
      dir="rtl"
    >
      <div className="w-full max-w-xl bg-bg p-8 relative overflow-hidden">
        {/* Offline Notice */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white py-3 text-center font-medium animate-[slideDown_0.3s_ease-out] z-50">
            <span className="ml-2">⚠️</span>
            اتصال به اینترنت برقرار نیست
          </div>
        )}
        <div className="relative h-full flex flex-col items-center justify-between gap-8 py-6">
          {/* Header Section */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl font-bold text-primary">سلام!</h1>
            <div className="text-lg text-gray space-y-2 leading-relaxed">
              <p>من دستیار شما هستم و از این پس به</p>
              <p>شما کمک می‌کنم تا به سادگی این</p>
              <p>کارها را انجام دهید</p>
            </div>
          </div>
          {/* Features Grid */}
          <div className="space-y-3 w-full">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center gap-2 text-text"
              >
                <span className="text-primary">{feature.icon}</span>
                <span className="text-base">{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 flex items-center justify-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
