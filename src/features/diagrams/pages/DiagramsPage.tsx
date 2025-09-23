import React from 'react';
import ChartCard from '../components/ChartCard';
import { getChartsData } from '../services/diagramService';

const DiagramsPage: React.FC = () => {
  const chartsData = getChartsData();

  return (
    <div className="space-y-6">
      <h3 className="text-base sm:text-lg font-bold text-[#1a3766]">
        دیاگرام‌ها
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <ChartCard
          title="نمودار ستونی"
          type="bar"
          options={chartsData.bar.options}
          series={chartsData.bar.series}
          height={220}
        />
        
        {/* Line Chart */}
        <ChartCard
          title="نمودار خطی"
          type="line"
          options={chartsData.line.options}
          series={chartsData.line.series}
          height={220}
        />
        
        {/* Area (Volume) Chart */}
        <ChartCard
          title="نمودار حجمی"
          type="area"
          options={chartsData.area.options}
          series={chartsData.area.series}
          height={220}
        />
        
        {/* Pie / Donut Chart */}
        <ChartCard
          title="سهم‌بندی"
          type="donut"
          options={chartsData.pie.options}
          series={chartsData.pie.series}
          height={240}
        />
        
        {/* Horizontal Bar */}
        <ChartCard
          title="نمودار افقی"
          type="bar"
          options={chartsData.horizontal.options}
          series={chartsData.horizontal.series}
          height={220}
        />
        
        {/* Radial Progress */}
        <ChartCard
          title="پیشرفت کلی"
          type="radialBar"
          options={chartsData.radial.options}
          series={chartsData.radial.series}
          height={240}
          className="flex flex-col items-center justify-center"
        />
      </div>
    </div>
  );
};

export default DiagramsPage;
