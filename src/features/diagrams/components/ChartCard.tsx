import React from 'react';
import Chart from 'react-apexcharts';

interface ChartCardProps {
  title: string;
  type: 'bar' | 'line' | 'area' | 'donut' | 'radialBar';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  height?: number;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  type,
  series,
  options,
  height = 220,
  className = ""
}) => {
  return (
    <div className={`p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm ${className}`}>
      <h4 className="font-semibold mb-2 text-[#1a3766] text-xs sm:text-sm">
        {title}
      </h4>
      <Chart
        options={options}
        series={series}
        type={type}
        height={height}
      />
    </div>
  );
};

export default ChartCard;
