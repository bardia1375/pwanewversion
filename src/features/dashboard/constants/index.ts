import type { Tab } from '../types';

export const TABS: Tab[] = [
  { id: "missions", label: "مأموریت" },
  { id: "leaves", label: "مرخصی" },
  { id: "performance", label: "کارکرد" },
  { id: "charts", label: "دیاگرام" },
];

export const DEFAULT_TAB = "missions";
// Quick Actions Configuration
export const QUICK_ACTIONS_CONFIG = [
  {
    id: 'leaves',
    label: 'مرخصی',
    color: 'green' as const,
    iconPath: "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z",
  },
  {
    id: 'clocking',
    label: 'ساعت‌کاری',
    color: 'blue' as const,
    iconPath: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z",
  },
  {
    id: 'missions',
    label: 'ماموریت',
    color: 'purple' as const,
    iconPath: "M12,2L13.09,8.26L22,9L14,14L17,23L12,18L7,23L10,14L2,9L10.91,8.26L12,2Z",
  },
  {
    id: 'reports',
    label: 'گزارش',
    color: 'orange' as const,
    iconPath: "M19,3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19Z M7,10H9V17H7V10M11,7H13V17H11V7M15,13H17V17H15V13Z",
  },
];

// Gradient Background
export const GRADIENT_BACKGROUND =
  "linear-gradient(180deg, #1f6bd8 0%, #1d5dc2 55%, #14419a 100%)";

// Sample Data
export const SAMPLE_OVERVIEW_DATA = {
  checkInTime: "08:15",
  checkInStatus: "به موقع",
  checkOutTime: "--:--",
   breakStartTime: "11:30",
  breakStatus: "فعال",
  overtimeHours: "2.5",
  lastUpdateDate: "امروز",
};

export const SAMPLE_PERFORMANCE_DATA = {
  attendance: {
    percentage: 85,
    days: 22,
  },
  leaves: {
    percentage: 60,
    days: 18,
  },
  overtime: {
    percentage: 40,
    hours: 32,
  },
};


// Constants
export const CARD_STYLES = {
  container: "bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 rounded-3xl shadow-xl shadow-slate-200/40 border border-white/60 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500",
  header: "bg-gradient-to-r from-slate-50/80 via-blue-50/40 to-slate-50/80 px-6 py-2 border-b border-slate-200/30 backdrop-blur-sm",
  statusIndicator: "w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30",
  statusPulse: "absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-pulse opacity-75",
  dateChip: "flex items-center gap-2 text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300",
  grid: "p-2 grid grid-cols-2 gap-5",
} as const;

// Types
export type StatCardConfig = {
  key: string;
  title: string;
  bgGradient: string;
  borderColor: string;
  iconGradient: string;
  textColor: string;
  valueGradient?: string;
  valueColor?: string;
  dividerGradient: string;
  shadowColor: string;
  hoverShadow: string;
  icon: string;
  iconCircle?: boolean;
  suffix?: string;
  statusIcon: string;
  statusText?: string;
  statusColor: string;
  titleSize?: string;
};

export const STAT_CARD_CONFIG: StatCardConfig[] = [
  {
    key: 'checkIn',
    title: 'ورود',
    bgGradient: 'from-emerald-50/80 via-white to-emerald-50/40',
    borderColor: 'border-emerald-100/60 hover:border-emerald-200/80',
    iconGradient: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-800 group-hover:text-emerald-900',
    valueGradient: 'from-emerald-700 to-emerald-600',
    dividerGradient: 'from-emerald-500 to-emerald-300',
    shadowColor: 'shadow-emerald-500/30 group-hover:shadow-emerald-500/50',
    hoverShadow: 'hover:shadow-emerald-500/10',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
    suffix: 'صبح',
    statusIcon: '✓',
    statusColor: 'text-emerald-600/60',
  },
  {
    key: 'checkOut',
    title: 'خروج',
    bgGradient: 'from-slate-50/80 via-white to-slate-50/40',
    borderColor: 'border-slate-200/60 hover:border-slate-300/80',
    iconGradient: 'from-slate-400 to-slate-500',
    textColor: 'text-slate-700 group-hover:text-slate-800',
    valueColor: 'text-slate-400',
    dividerGradient: 'from-slate-400 to-slate-300',
    shadowColor: 'shadow-slate-500/20 group-hover:shadow-slate-500/40',
    hoverShadow: 'hover:shadow-slate-500/10',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.58 8 8-3.59 8-8 8z',
    iconCircle: true,
    statusIcon: '⏳',
    statusColor: 'text-slate-400/70',
  },
  {
    key: 'break',
    title: 'مرخصی باقیمانده',
    bgGradient: 'from-amber-50/80 via-white to-orange-50/40',
    borderColor: 'border-amber-100/60 hover:border-amber-200/80',
    iconGradient: 'from-amber-500 to-orange-500',
    textColor: 'text-amber-800 group-hover:text-amber-900',
    valueGradient: 'from-amber-700 to-orange-600',
    dividerGradient: 'from-amber-500 to-orange-400',
    shadowColor: 'shadow-amber-500/30 group-hover:shadow-amber-500/50',
    hoverShadow: 'hover:shadow-amber-500/10',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    suffix: 'روز',
    statusIcon: '📅',
    statusText: 'قابل استفاده',
    statusColor: 'text-amber-600/60',
    titleSize: 'text-xs',
  },
  {
    key: 'overtime',
    title: 'ساعات اضافی',
    bgGradient: 'from-blue-50/80 via-white to-indigo-50/40',
    borderColor: 'border-blue-100/60 hover:border-blue-200/80',
    iconGradient: 'from-blue-600 to-indigo-600',
    textColor: 'text-blue-800 group-hover:text-blue-900',
    valueGradient: 'from-blue-700 to-indigo-600',
    dividerGradient: 'from-blue-500 to-indigo-400',
    shadowColor: 'shadow-blue-500/30 group-hover:shadow-blue-500/50',
    hoverShadow: 'hover:shadow-blue-500/10',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    suffix: 'ساعت',
    statusIcon: '⚡',
    statusText: 'این ماه',
    statusColor: 'text-blue-600/60',
    titleSize: 'text-xs',
  },
];

export const colorStyles = {
  green: {
    bg: 'bg-gradient-to-br from-green-50/80 via-white to-green-50/40',
    border: 'border-green-100/60 hover:border-green-200/80',
    shadow: 'hover:shadow-xl hover:shadow-green-500/10',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
    iconShadow: 'shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50',
    text: 'text-green-800 group-hover:text-green-900',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40',
    border: 'border-blue-100/60 hover:border-blue-200/80',
    shadow: 'hover:shadow-xl hover:shadow-blue-500/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconShadow: 'shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50',
    text: 'text-blue-800 group-hover:text-blue-900',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50/80 via-white to-purple-50/40',
    border: 'border-purple-100/60 hover:border-purple-200/80',
    shadow: 'hover:shadow-xl hover:shadow-purple-500/10',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconShadow: 'shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50',
    text: 'text-purple-800 group-hover:text-purple-900',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-50/80 via-white to-orange-50/40',
    border: 'border-orange-100/60 hover:border-orange-200/80',
    shadow: 'hover:shadow-xl hover:shadow-orange-500/10',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    iconShadow: 'shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50',
    text: 'text-orange-800 group-hover:text-orange-900',
  },
};
