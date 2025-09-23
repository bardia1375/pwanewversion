import type { FC } from 'react';
import { useAttendanceStore } from '../store/attendanceStore';
import type { AttendanceRecord } from '../types';

export const AttendanceList: FC = () => {
  const { records, isLoading, error } = useAttendanceStore();

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: AttendanceRecord['status']) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      leave: 'bg-blue-100 text-blue-800'
    };
    return colors[status];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-right">نام کارمند</th>
            <th className="px-6 py-3 text-right">زمان ورود</th>
            <th className="px-6 py-3 text-right">زمان خروج</th>
            <th className="px-6 py-3 text-right">وضعیت</th>
            <th className="px-6 py-3 text-right">توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="px-6 py-4">{record.employeeId}</td>
              <td className="px-6 py-4">{formatDate(record.checkIn)}</td>
              <td className="px-6 py-4">
                {record.checkOut ? formatDate(record.checkOut) : '-'}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </td>
              <td className="px-6 py-4">{record.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
