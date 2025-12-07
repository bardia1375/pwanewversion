import React from 'react';

interface FingerprintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
  className?: string;
}

const FingerprintButton: React.FC<FingerprintButtonProps> = ({
  onClick,
  isLoading = false,
  size = 'lg',
  imageUrl = 'https://dl.shut.ir/public/file/2023/10/22/%D8%B9%DA%A9%D8%B3-%D8%A7%D8%AB%D8%B1-%D8%A7%D9%86%DA%AF%D8%B4%D8%AA-png.png',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-32 h-32 sm:w-36 sm:h-36', 
    lg: 'w-36 h-36 sm:w-40 sm:h-40'
  };

  const borderSizes = {
    sm: 'border-[6px]',
    md: 'border-[8px]',
    lg: 'border-[10px]'
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`absolute left-1/2 -top-24 -translate-x-1/2 ${sizeClasses[size]} rounded-full ${borderSizes[size]} border-[#1f6bd8] bg-white flex items-center justify-center shadow-[0_18px_35px_rgba(15,56,128,0.22)] z-40 cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1f6bd8]/40 ${isLoading ? 'opacity-70 cursor-wait' : ''} ${className}`}
      onClick={isLoading ? undefined : onClick}
      role="button"
      tabIndex={0}
      onKeyDown={isLoading ? undefined : handleKeyDown}
      aria-label="ثبت حضور با اثر انگشت"
      aria-disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1f6bd8] border-t-transparent mb-2" />
          <span className="text-xs text-[#1f6bd8] font-medium">در حال پردازش...</span>
        </div>
      ) : (
        <img
          className="w-[70%] select-none pointer-events-none"
          width="70%"
          draggable={false}
          alt="اثر انگشت"
          src={imageUrl}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default FingerprintButton;