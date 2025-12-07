import React from 'react';

interface HeaderProps {
  userName?: string;
  subtitle?: string;
  isDarkMode?: boolean;
  profileImageUrl?: string;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'بردیا',
  subtitle = 'وقت آن است که بهترین عملکرد خود را داشته باشید',
  isDarkMode = false,
  profileImageUrl = 'https://randomuser.me/api/portraits/women/44.jpg',
  onMenuClick,
  onNotificationClick,
  onProfileClick
}) => {
  const buttonBaseClasses = `p-2 rounded-full transition-all duration-300 ${
    isDarkMode
      ? "bg-slate-800 text-gray-100 hover:bg-slate-700"
      : "bg-white/15 text-white shadow-sm backdrop-blur hover:bg-white/25"
  }`;

  return (
    <header className="relative z-30 flex-shrink-0 pt-4 pb-20 px-6 text-white">
      <div className="flex justify-between items-center mb-6">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className={buttonBaseClasses}
          aria-label="منو"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </button>

        <div className="flex items-center gap-4">
          {/* Notification Button */}
          <button
            onClick={onNotificationClick}
            className={buttonBaseClasses}
            aria-label="اعلان‌ها"
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
          
          {/* Profile Image */}
          <button
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-cover bg-center overflow-hidden border-2 border-white/70 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              backgroundImage: `url("${profileImageUrl}")`,
            }}
            aria-label="پروفایل کاربر"
          />
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-16">
        <p
          className={`text-xs mb-1 ${
            isDarkMode ? "text-gray-300" : "text-blue-50/80"
          }`}
        >
          {subtitle}
        </p>
        <h1 className="text-lg font-bold text-white">
          چه خبر، {userName}!
        </h1>
      </div>
    </header>
  );
};

export default Header;