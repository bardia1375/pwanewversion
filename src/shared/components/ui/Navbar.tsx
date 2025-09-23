import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white/80 shadow flex items-center justify-between px-4 py-3 rounded-b-3xl fixed top-0 left-0 z-40" dir="rtl">
      {/* Right: Hamburger */}
      <button className="bg-white rounded-full p-2 shadow-md">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#1a3766" d="M4 6h16M4 12h16M4 18h16" stroke="#1a3766" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {/* Center: Title */}
      <div className="flex flex-col items-center">
        <span className="text-[#1a3766] text-lg font-bold">سِیِدان لاچینی</span>
        <span className="text-xs text-[#6ec6e7]">حوزه تجاری</span>
      </div>
      {/* Left: Time */}
      <div className="flex flex-col items-end">
        <span className="text-[#1a3766] text-2xl font-bold tracking-widest">10:30:45</span>
        <span className="text-xs text-[#6ec6e7]">یکشنبه ۲۳ شهریور ۱۴۰۴</span>
      </div>
    </nav>
  );
};

export default Navbar;
