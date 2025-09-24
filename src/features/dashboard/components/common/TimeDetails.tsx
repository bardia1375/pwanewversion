import React from 'react';
import type { TimeDetailsProps } from '../../types';



export const TimeDetails: React.FC<TimeDetailsProps> = ({ isExpanded }) => {
  const timeEntries = [
    { label: "ورود", value: "۰۸:۰۰", valueColor: "text-[#6ec6e7]" },
    { label: "خروج", value: "۱۶:۰۰", valueColor: "text-[#6ec6e7]" },
    { label: "مدت حضور", value: "۰۸:۰۰", valueColor: "text-[#6ec6e7]" },
    { label: "اضافه کار", value: "۰۰:۰۰", valueColor: "text-[#e14f4f]" },
    { label: "کسر کار", value: "۰۰:۰۰", valueColor: "text-[#e14f4f]" },
  ];

  return (
    <div className="w-full">
      {/* <button
        onClick={onToggle}
        className="w-full mt-2 text-[#e14f4f] flex items-center justify-center transition-transform duration-300"
        style={{
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        ▼
      </button> */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-4 space-y-3">
          {timeEntries.map((entry, index) => (
            <div key={index} className="flex justify-between items-center px-2">
              <span className="text-[#1a3766] font-medium">{entry.label}</span>
              <span className={entry.valueColor}>{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeDetails;
