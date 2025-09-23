import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AttendanceRecorder } from '../components/AttendanceRecorder';
import { AttendanceFilterPanel } from '../components/AttendanceFilterPanel';
import { AttendanceList } from '../components/AttendanceList';
import Button from '../../../shared/components/ui/Button/Button';

export const AttendancePage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">سیستم حضور و غیاب</h1>
        <Button variant="primary" size="sm" rounded="md" onClick={() => navigate('/')}>بازگشت</Button>
      </div>
      <div className="grid gap-6">
        {/* بخش ثبت تردد */}
        <AttendanceRecorder />
        
        {/* بخش فیلترها */}
        <AttendanceFilterPanel />
        
        {/* لیست ترددها */}
        <AttendanceList />
      </div>
    </div>
  );
};
