import React from 'react';
import { motion } from 'framer-motion';
import type { Mission } from '../types';
import SwipeableCard from '../../../shared/components/ui/SwipeableCard/SwipeableCard';

interface MissionCardProps {
  mission: Mission;
  onDelete?: (id: number) => void;
  onCopy?: (mission: Mission) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onDelete, onCopy }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(mission.id);
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy(mission);
    }
  };

  return (
    <SwipeableCard 
      onDelete={handleDelete}
      onCopy={handleCopy}
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
          <h3 className="font-bold text-base md:text-lg text-[#1a3766]">{mission.title}</h3>
          <span 
            className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-2xs md:text-xs font-medium ${
              mission.status === 'approved' 
                ? 'bg-green-100 text-green-600' 
                : mission.status === 'rejected'
                ? 'bg-red-100 text-red-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {mission.status === 'approved' ? 'تایید شده' : mission.status === 'rejected' ? 'رد شده' : 'در انتظار'}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <svg className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-xs md:text-sm text-gray-600">{mission.location}</p>
        </div>

        {/* Description */}
        {mission.description && (
          <div className="mb-3 text-xs md:text-sm text-gray-500">
            {mission.description}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <div className="flex gap-1">
              <span>{mission.startDate}</span>
              {mission.endDate !== mission.startDate && (
                <>
                  <span>تا</span>
                  <span>{mission.endDate}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </SwipeableCard>
  );
};

export default MissionCard;

