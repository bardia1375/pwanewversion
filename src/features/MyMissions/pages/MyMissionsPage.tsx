import { useMemo } from 'react';
import { useMissions, transformMissionData } from '../hooks/useMissions';
import MissionCard from './MissionCard';

export default function MyMissionsPage() {
  const { data: missionsData, isLoading, error } = useMissions();

  // تبدیل داده‌های API به فرمت قابل نمایش
  const missions = useMemo(() => {
    if (!missionsData) return [];
    return missionsData.map(transformMissionData);
  }, [missionsData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" dir="rtl">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">در حال بارگیری ماموریت‌ها...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">❌ خطا</div>
          <p className="text-gray-400">
            {error instanceof Error ? error.message : 'خطای نامشخصی رخ داد'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
          >
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">ماموریت‌های من</h1>
          <p className="text-gray-400">
            {missions.length} ماموریت یافت شد
          </p>
        </div>

        {/* Missions List */}
        {missions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-gray-400">ماموریتی یافت نشد</p>
          </div>
        ) : (
          <div className="space-y-4">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onDelete={(id) => console.log('حذف:', id)}
                onCopy={(mission) => console.log('کپی:', mission)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
