import React from "react";
import Button from "../../shared/components/ui/Button/Button";

const Footer: React.FC = () => {
  return (
    <footer className="fixed md:relative bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none select-none bg-transparent">
      <div className="relative w-full flex items-end justify-center max-w-7xl mx-auto">
        {/* Floating Action Button */}
        <Button
          type="button"
          className="absolute z-10 -top-7 left-1/2 -translate-x-1/2 w-20 h-20 flex items-center justify-center pointer-events-auto hover:scale-105 transition-transform"
          rounded="full"
          size="lg"
          variant="cyan"
        >
          <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24">
            <path d="M12 8v8M8 16l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        {/* Footer Bar */}
        <div className="w-full bg-[#d7ebee] flex items-end justify-between py-2 px-[10%] min-h-[70px] rounded-t-[20px] border border-[#75c8db52] shadow-[-1px_4px_20px_-6px_rgba(0,0,0,0.3)] transition-all duration-500 mx-auto z-[2]">
          {/* Messages Icon */}
          <button className="flex flex-col items-center gap-1 pointer-events-auto group">
            <div className="relative p-2 rounded-xl transition-all duration-300 group-hover:bg-blue-50 group-active:scale-90">
              <svg width="28" height="28" className="transition-colors duration-300 stroke-[#6ec6e7] group-hover:stroke-blue-500 group-hover:fill-blue-50 group-active:fill-blue-100" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-[#6ec6e7] group-hover:text-blue-500 transition-colors duration-300">پیام‌ها</span>
          </button>
          {/* Home Icon */}
          <button className="flex flex-col items-center gap-1 pointer-events-auto group">
            <div className="relative p-2 rounded-xl transition-all duration-300 group-hover:bg-cyan-50 group-active:scale-90">
              <svg width="28" height="28" className="transition-colors duration-300 stroke-[#1a3766] group-hover:stroke-cyan-600 group-hover:fill-cyan-50 group-active:fill-cyan-100" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-[#1a3766] group-hover:text-cyan-600 transition-colors duration-300">خانه</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
