import React from 'react';

interface CircularProgressProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
  gradientId: string;
  delay?: number;
}

interface PerformanceMetric {
  label: string;
  percentage: number;
  value: string;
  color: {
    primary: string;
    secondary: string;
  };
}

interface PerformanceAnalyticsProps {
  metrics?: PerformanceMetric[];
  title?: string;
  period?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  radius,
  strokeWidth,
  gradientId,
  delay = 0
}) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <svg 
      className={`absolute transform -rotate-90 transition-all duration-1000 ease-out`}
      style={{ 
        animationDelay: `${delay}ms`,
        width: `${(radius + strokeWidth) * 2}px`,
        height: `${(radius + strokeWidth) * 2}px`
      }}
      viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
    >
      {/* Background circle */}
      <circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
        className="opacity-30"
      />
      
      {/* Progress circle */}
      <circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-1000 ease-out"
        strokeLinecap="round"
        style={{ animationDelay: `${delay}ms` }}
      />
    </svg>
  );
};

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  metrics = [
    {
      label: 'حضور',
      percentage: 85,
      value: '22 روز',
      color: { primary: '#10b981', secondary: '#059669' }
    },
    {
      label: 'مرخصی',
      percentage: 60,
      value: '18 روز',
      color: { primary: '#f59e0b', secondary: '#d97706' }
    },
    {
      label: 'اضافه کار',
      percentage: 40,
      value: '32 ساعت',
      color: { primary: '#3b82f6', secondary: '#1d4ed8' }
    }
  ],
  title = 'آمار عملکرد ماهانه',
  period = 'مهر ۱۴۰۴'
}) => {
  const overallPerformance = Math.round(
    metrics.reduce((acc, metric) => acc + metric.percentage, 0) / metrics.length
  );

  return (
    <div className="bg-gradient-to-br from-white via-slate-50/30 to-purple-50/20 rounded-3xl shadow-xl shadow-slate-200/40 border border-white/60 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50/80 via-purple-50/40 to-slate-50/80 px-6 py-5 border-b border-slate-200/30 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-purple-400 animate-pulse opacity-75"></div>
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200/50 shadow-sm">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-indigo-600 p-1 text-white">
              <svg
                viewBox="0 0 24 24"
                width="8"
                height="8"
                fill="currentColor"
              >
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <span className="font-medium">{period}</span>
          </div>
        </div>
      </div>

      {/* Circular Progress Charts */}
      <div className="p-8 flex justify-center">
        <div className="relative w-64 h-64">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100/50 to-slate-200/30 backdrop-blur-sm"></div>
          
          {/* SVG Gradients Definition */}
          <svg className="absolute" width="0" height="0">
            <defs>
              {metrics.map((metric, index) => (
                <linearGradient 
                  key={index}
                  id={`gradient-${index}`} 
                  x1="0%" 
                  y1="0%" 
                  x2="100%" 
                  y2="100%"
                >
                  <stop offset="0%" stopColor={metric.color.primary} />
                  <stop offset="100%" stopColor={metric.color.secondary} />
                </linearGradient>
              ))}
            </defs>
          </svg>

          {/* Progress Circles */}
          {metrics.map((metric, index) => {
            const radius = 45 - (index * 7); // 45, 38, 31
            const strokeWidth = 3 + index; // 3, 4, 5
            const delay = index * 300;
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  inset: `${index * 16}px`, // 0px, 16px, 32px
                }}
              >
                <CircularProgress
                  percentage={metric.percentage}
                  radius={radius}
                  strokeWidth={strokeWidth}
                  gradientId={`gradient-${index}`}
                  delay={delay}
                />
              </div>
            );
          })}

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {overallPerformance}%
              </div>
              <div className="text-xs text-slate-500 font-medium">
                عملکرد کل
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-8 pb-6 grid grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${metric.color.primary}, ${metric.color.secondary})`
                }}
              ></div>
              <span 
                className="text-xs font-semibold"
                style={{ color: metric.color.secondary }}
              >
                {metric.label}
              </span>
            </div>
            <div 
              className="text-lg font-bold"
              style={{ color: metric.color.secondary }}
            >
              {metric.percentage}%
            </div>
            <div 
              className="text-xs opacity-70"
              style={{ color: metric.color.primary }}
            >
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceAnalytics;