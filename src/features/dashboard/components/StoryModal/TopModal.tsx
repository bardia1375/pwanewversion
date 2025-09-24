import React from 'react';

interface TopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopModal: React.FC<TopModalProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      onClick={onClose}
      className={`fixed top-0 left-0 right-0 z-1440 bg-gradient-to-b from-[#0d2b6b] to-[#6ec6e7]
        transform transition-all duration-700 ease-[cubic-bezier(0.33, 1, 0.68, 1)]
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        h-[16dvh]  shadow-lg flex items-center justify-center cursor-pointer`}
    >
      <div className="text-white font-bold text-xl text-center">
        شرکت جهان گستر
      </div>
    </div>
  );
};
