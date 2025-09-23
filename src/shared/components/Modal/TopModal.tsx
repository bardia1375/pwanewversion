import React from 'react';

interface TopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange?: (index: number) => void;
}

export const TopModal: React.FC<TopModalProps> = ({ isOpen, onClose, onTabChange }) => {
  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#0d2b6b] to-[#6ec6e7]
        transform transition-all duration-700 ease-[cubic-bezier(0.33, 1, 0.68, 1)]
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        h-[30dvh] shadow-lg flex flex-col items-center justify-between py-4`}
    >
      <div className="text-white font-bold text-xl text-center mb-6">
        شرکت جهان گستر
      </div>
      <div className="flex justify-around w-full px-8 pb-4">
        {[
          { id: 'missions', label: 'ماموریت', icon: (isActive: boolean) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                fill={isActive ? '#1a3766' : '#fff'}/>
            </svg>
          )},
          { id: 'leaves', label: 'مرخصی', icon: (isActive: boolean) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
                fill={isActive ? '#1a3766' : '#fff'}/>
            </svg>
          )},
          { id: 'performance', label: 'کارکرد', icon: (isActive: boolean) => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill={isActive ? '#1a3766' : '#fff'}/>
            </svg>
          )}
        ].map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange?.(index);
              onClose();
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center
              ${index === 0 ? 'bg-white shadow-lg text-[#1a3766]' : 'bg-white/10 text-white'}
              transition-all duration-300 hover:scale-105`}
            >
              {item.icon(index === 0)}
            </div>
            <span className={`text-sm font-bold ${
              index === 0 ? 'text-white' : 'text-white/80'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
