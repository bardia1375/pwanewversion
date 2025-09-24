import React from 'react';
import { Button } from "../../../../shared/components/ui";
import type { DashboardTabNavigationProps } from '../../types';


export const TabNavigation: React.FC<DashboardTabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-secondary rounded-full p-1 relative">
      {/* Animated Background Slider */}
      <div
        className="absolute top-1 left-1 w-1/2 h-[calc(100%-8px)] bg-gradient-to-r from-cyan to-[#6ec6e7] rounded-full shadow-lg transition-all duration-300 ease-out transform"
        style={{
          transform: `translateX(${activeTab === "day" ? "96%" : "0%"})`,
        }}
      />

      {/* Buttons Container */}
      <div className="relative flex">
        <Button
          variant={activeTab === "day" ? "cyan" : "ghost"}
          rounded="full"
          onClick={() => onTabChange("day")}
          className={`flex-1 font-bold text-center transition-all duration-300 z-10 ${
            activeTab === "day" ? "text-white transform scale-[1.02]" : ""
          }`}
        >
          روز
        </Button>
        <Button
          variant={activeTab === "month" ? "cyan" : "ghost"}
          onClick={() => onTabChange("month")}
          rounded="full"
          className={`flex-1 font-bold text-center transition-all duration-300 z-10 ${
            activeTab === "month"
              ? "text-white transform scale-[1.02]"
              : "text-cyan hover:text-cyan-600"
          }`}
        >
          ماه
        </Button>
      </div>
    </div>
  );
};
