import React from "react";

const hours = Array.from({ length: 24 }, (_, i) => (i + 1));
const absentBars = Array.from({ length: 10 }, (_, i) => i + 15); // Example: 15 to 24 (for demo)

const CircularHourChart: React.FC = () => {
  return (
    <div className="relative w-[280px] h-[280px] flex items-center justify-center mx-auto">
      {/* Outer Circle with Hour Labels */}
      <svg width={280} height={280} className="absolute top-0 left-0">
        <circle cx={140} cy={140} r={135} fill="#f7fafd" />
        {/* Hour Labels */}
        {hours.map((h, i) => {
          const angle = ((i - 5) / 24) * 2 * Math.PI; // -5 to start from top right
          const x = 140 + 120 * Math.cos(angle);
          const y = 140 + 120 * Math.sin(angle);
          return (
            <text
              key={h}
              x={x}
              y={y + 6}
              textAnchor="middle"
              fontSize="20"
              fill="#1a3766"
              fontFamily="inherit"
            >
              {h}
            </text>
          );
        })}
      </svg>
      {/* Absent Bars */}
      <svg width={240} height={240} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = ((i - 6) / 24) * 2 * Math.PI;
          const r1 = 110, r2 = 120;
          const x1 = 120 + r1 * Math.cos(angle);
          const y1 = 120 + r1 * Math.sin(angle);
          const x2 = 120 + r2 * Math.cos(angle);
          const y2 = 120 + r2 * Math.sin(angle);
          const isAbsent = absentBars.includes(i + 1);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isAbsent ? "#e14fc2" : "#e0e0e0"}
              strokeWidth={isAbsent ? 6 : 4}
              strokeLinecap="round"
              opacity={isAbsent ? 1 : 0.3}
            />
          );
        })}
      </svg>
      {/* Center Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-gradient-to-b from-[#f7fafd] to-[#f0f6fa] rounded-full flex flex-col items-center justify-center shadow">
        <span className="text-[#1a3766] text-lg font-bold mt-6">09:00</span>
        <span className="text-[#b0b0b0] text-base mt-2">غیبت ساعتی</span>
      </div>
    </div>
  );
};

export default CircularHourChart;
