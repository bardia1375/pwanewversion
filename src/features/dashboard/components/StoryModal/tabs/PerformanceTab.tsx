import React from 'react';
import PerformanceCard from '../../../../MyClocking/pages/PerformanceCard';
import type { PerformanceTabProps } from '../../../types';



const PerformanceTab: React.FC<PerformanceTabProps> = ({ performance, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 border-3 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base sm:text-lg font-bold text-[#1a3766]">
        گزارش کارکرد
      </h3>
      <div className="space-y-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {performance.map((item: any) => (
          <PerformanceCard key={item.id} performance={item} />
        ))}
      </div>
    </div>
  );
};

export default PerformanceTab;
