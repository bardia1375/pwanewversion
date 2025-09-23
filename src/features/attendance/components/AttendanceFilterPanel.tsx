import type { FC } from 'react';
import { useCallback, useState } from 'react';
import type { AttendanceFilters as AttendanceFilterType } from '../types';
import { useAttendanceStore } from '../store/attendanceStore';

export const AttendanceFilterPanel: FC = () => {
  const [filters, setFilters] = useState<AttendanceFilterType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const { fetchRecords, isLoading } = useAttendanceStore();

  const handleFilter = useCallback(async () => {
    await fetchRecords(filters);
  }, [fetchRecords, filters]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-4">فیلترها</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            از تاریخ
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            value={filters.startDate.toISOString().split('T')[0]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                startDate: new Date(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تا تاریخ
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            value={filters.endDate.toISOString().split('T')[0]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                endDate: new Date(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            دپارتمان
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={filters.department || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                department: e.target.value || undefined,
              }))
            }
          >
            <option value="">همه</option>
            <option value="IT">فناوری اطلاعات</option>
            <option value="HR">منابع انسانی</option>
            <option value="Finance">مالی</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleFilter}
          disabled={isLoading}
        >
          {isLoading ? 'در حال جستجو...' : 'اعمال فیلتر'}
        </button>
      </div>
    </div>
  );
};
