import React from 'react';
import type { QuickActionsProps } from '../../types/overview';
import { colorStyles } from '../../constants/index';


const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="mb-8 px-2">
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action) => {
          const styles = colorStyles[action.color];
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`group flex flex-col items-center p-4 ${styles.bg} rounded-2xl border ${styles.border} ${styles.shadow} transition-all duration-500 hover:scale-105 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} flex items-center justify-center ${styles.iconShadow} transition-all duration-300 group-hover:scale-110 mb-3`}>
                <div className="text-white">
                  {action.icon}
                </div>
              </div>
              <span className={`text-xs font-bold ${styles.text} transition-colors text-center`}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;