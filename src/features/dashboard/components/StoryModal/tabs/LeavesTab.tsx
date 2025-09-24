import React from 'react';
import LeaveCard from '../../../../MyLeaves/pages/LeaveCard';
import { handleCopyLeave } from '../../../utils/leaveHandlers';
import type { Leave } from '../../../../MyLeaves/types';
import type { LeavesTabProps } from '../../../types';



const LeavesTab: React.FC<LeavesTabProps> = ({ leaves, loading, onDeleteLeave }) => {
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
        لیست مرخصی‌ها
      </h3>
      <div className="space-y-3">
        {leaves.map((leave: unknown) => (
          <LeaveCard 
            key={(leave as Leave).id} 
            leave={leave as Leave} 
            onDelete={onDeleteLeave}
            onCopy={handleCopyLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default LeavesTab;
