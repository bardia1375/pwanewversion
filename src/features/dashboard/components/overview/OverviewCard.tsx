import React from 'react';
import type { OverviewCardProps } from '../../types/overview';
import { CARD_STYLES,STAT_CARD_CONFIG } from '../../constants/index';



// Sub-components
const StatusIndicator: React.FC = () => (
  <div className="relative">
    <div className={CARD_STYLES.statusIndicator} />
    <div className={CARD_STYLES.statusPulse} />
  </div>
);

const DateChip: React.FC = () => (
  <div className={CARD_STYLES.dateChip}>
    <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-purple-600 p-1 text-white">
      <svg viewBox="0 0 24 24" width="8" height="8" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
      </svg>
    </div>
    <span className="font-medium">یکشنبه، ۸ مهر ۱۴۰۴</span>
  </div>
);

const CardHeader: React.FC = () => (
  <div className={CARD_STYLES.header}>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <StatusIndicator />
        <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          نمای کلی امروز
        </h2>
      </div>
      <DateChip />
    </div>
  </div>
);

interface StatCardProps {
  config: typeof STAT_CARD_CONFIG[number];
  value: string;
  status?: string;
}

const StatCard: React.FC<StatCardProps> = ({ config, value, status }) => {
  const {
    title,
    bgGradient,
    borderColor,
    iconGradient,
    textColor,
    valueGradient,
    valueColor,
    dividerGradient,
    shadowColor,
    hoverShadow,
    icon,
    iconCircle,
    suffix,
    statusIcon,
    statusText,
    statusColor,
    titleSize = 'text-sm',
  } = config;

  return (
    <div
      className={`group bg-gradient-to-br ${bgGradient} rounded-2xl p-2 border ${borderColor} ${hoverShadow} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg ${shadowColor} transition-all duration-300 group-hover:scale-110`}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-white">
              <path d={icon} />
              {iconCircle && <circle cx="12" cy="12" r="3" />}
            </svg>
          </div>
          <div>
            <span className={`${titleSize} font-bold ${textColor} transition-colors leading-tight`}>
              {title}
            </span>
            <div className={`w-6 h-0.5 bg-gradient-to-r ${dividerGradient} rounded-full mt-0.5`} />
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-xl font-black ${
                valueGradient ? `bg-gradient-to-r ${valueGradient} bg-clip-text text-transparent` : valueColor
              } group-hover:scale-105 transition-transform duration-300`}
            >
              {value}
            </span>
            {suffix && (
              <span className={`text-xs ${textColor.split(' ')[0]}/80 font-semibold`}>
                {suffix}
              </span>
            )}
          </div>
          {status && (
            <div className={`text-xs ${statusColor} font-medium`}>
              {statusIcon} {statusText || status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const OverviewCard: React.FC<OverviewCardProps> = ({ data }) => {
  const { checkInTime, checkInStatus, checkOutTime, checkOutStatus, breakStartTime, overtimeHours } = data;

  const cardData = [
    { config: STAT_CARD_CONFIG[0], value: checkInTime, status: checkInStatus },
    { config: STAT_CARD_CONFIG[1], value: checkOutTime, status: checkOutStatus },
    { config: STAT_CARD_CONFIG[2], value: breakStartTime, status: '' },
    { config: STAT_CARD_CONFIG[3], value: overtimeHours, status: '' },
  ];

  return (
    <div className={CARD_STYLES.container}>
      <CardHeader />
      <div className={CARD_STYLES.grid}>
        {cardData.map((item) => (
          <StatCard key={item.config.key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;