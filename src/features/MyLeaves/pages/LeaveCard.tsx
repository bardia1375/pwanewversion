import React from 'react';
import { motion } from 'framer-motion';
import type { Leave } from '../types';
import SwipeableCard from '../../../shared/components/ui/SwipeableCard/SwipeableCard';

interface LeaveCardProps {
  leave: Leave;
  onDelete?: (id: number) => void;
  onCopy?: (leave: Leave) => void;
}

const LeaveCard: React.FC<LeaveCardProps> = ({ leave, onDelete, onCopy }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(leave.id);
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy(leave);
    }
  };
  
  // Format data for copy action tooltip
  const getCopyTooltip = () => {
    return leave.type === 'daily' 
      ? `${leave.reason}: ${leave.startDate}${leave.endDate !== leave.startDate ? ` تا ${leave.endDate}` : ''}`
      : `${leave.reason}: ${leave.startDate} - از ساعت ${leave.startTime} تا ${leave.endTime}`;
  };

  return (
    <SwipeableCard
      onDelete={handleDelete}
      onCopy={handleCopy}
      copyTooltip={getCopyTooltip()}
      className="bg-white p-4 shadow-lg border border-gray-100"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              leave.type === 'daily' ? 'bg-purple-500' : 'bg-cyan-500'
            }`} />
            <h3 className="font-bold text-base md:text-lg text-[#1a3766]">{leave.reason}</h3>
          </div>
          <span 
            className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-2xs md:text-xs font-medium ${
              leave.status === 'approved' 
                ? 'bg-green-100 text-green-600' 
                : leave.status === 'rejected'
                ? 'bg-red-100 text-red-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {leave.status === 'approved' ? 'تایید شده' : leave.status === 'rejected' ? 'رد شده' : 'در انتظار'}
          </span>
        </div>

        {/* Time/Date Info */}
        <div className="space-y-2">
          {leave.type === 'daily' ? (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
              <div className="flex gap-1 text-xs md:text-sm">
                <span>{leave.startDate}</span>
                {leave.endDate !== leave.startDate && (
                  <>
                    <span>تا</span>
                    <span>{leave.endDate}</span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
              </svg>
              <span className="text-xs md:text-sm">{leave.startDate} - از ساعت {leave.startTime} تا {leave.endTime}</span>
            </div>
          )}

          {/* Duration */}
          <div className="flex items-center justify-end gap-1 text-2xs md:text-sm text-gray-500">
            <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{leave.duration}</span>
          </div>
        </div>
      </motion.div>
    </SwipeableCard>
  );
};

export default LeaveCard;
