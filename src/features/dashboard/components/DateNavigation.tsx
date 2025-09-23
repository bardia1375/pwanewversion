import React from 'react';

const ArrowButton: React.FC<{ direction: 'right' | 'left'; onClick?: () => void }> = ({ direction, onClick }) => (
  <button 
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center text-[#1a3766] rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
  >
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#37B3B8" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`${direction === 'left' ? 'rotate-180' : ''} transform transition-transform`}
    >
      <path d="M9 18l6-6-6-6"/>
    </svg>
  </button>
);

export const DateNavigation: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-secondary rounded-full py-2 px-4 mt-2 text-cyan mx-auto">
      <div className="flex items-center justify-center gap-4">
        <ArrowButton direction="right" />
        <span className="text-lg font-bold min-w-[120px] text-center">۲۳ شهریور ۱۴۰۴</span>
        <ArrowButton direction="left" />
      </div>
    </div>
  );
};
