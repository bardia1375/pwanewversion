import React from 'react';
import { motion } from 'framer-motion';
import type { Performance } from '../types';

interface PerformanceCardProps {
  performance: Performance;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ performance }) => {
  const getStatusInfo = (status: Performance['status']) => {
    switch (status) {
      case 'present':
        return { color: 'bg-green-500', text: 'حاضر' };
      case 'absent':
        return { color: 'bg-red-500', text: 'غایب' };
      case 'leave':
        return { color: 'bg-yellow-500', text: 'مرخصی' };
      case 'mission':
        return { color: 'bg-blue-500', text: 'ماموریت' };
      default:
        return { color: 'bg-gray-500', text: '' };
    }
  };

  const statusInfo = getStatusInfo(performance.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-[#1a3766]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
          </svg>
          <h3 className="font-bold text-base md:text-lg text-[#1a3766]">{performance.date}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
          <span className="text-xs md:text-sm text-gray-600">{statusInfo.text}</span>
        </div>
      </div>

      {/* Description if exists */}
      {performance.description && (
        <div className="mb-4 text-xs md:text-sm text-gray-500">
          {performance.description}
        </div>
      )}

      {/* Hours Info */}
      <div className="grid grid-cols-2 gap-4">
        {/* Work Hours */}
        <div className="bg-cyan-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
            </svg>
            <span className="text-2xs md:text-xs text-cyan-700">ساعات کاری</span>
          </div>
          <div className="text-sm md:text-lg font-bold text-[#1a3766]">
            {performance.workHours} <span className="text-2xs md:text-xs font-normal text-gray-500">ساعت</span>
          </div>
        </div>

        {/* Overtime Hours */}
        <div className="bg-purple-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xs md:text-xs text-purple-700">اضافه کاری</span>
          </div>
          <div className="text-sm md:text-lg font-bold text-[#1a3766]">
            {performance.overtimeHours} <span className="text-2xs md:text-xs font-normal text-gray-500">ساعت</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
