import type { FC } from 'react';
import { useAttendanceStore } from '../store/attendanceStore';

export const AttendanceRecorder: FC = () => {
  const { recordAttendance, isLoading, error } = useAttendanceStore();

  const handleCheckIn = async (employeeId: string) => {
    await recordAttendance(employeeId, 'checkIn');
  };

  const handleCheckOut = async (employeeId: string) => {
    await recordAttendance(employeeId, 'checkOut');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">ثبت تردد</h2>
      {error && <div className="text-red-500 mb-4">{error.message}</div>}
      
      <div className="flex gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="کد پرسنلی"
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={() => handleCheckIn('employee-id')}
          disabled={isLoading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ورود
        </button>
        <button
          onClick={() => handleCheckOut('employee-id')}
          disabled={isLoading}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          خروج
        </button>
      </div>
    </div>
  );
};
