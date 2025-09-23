import type { Performance } from '../types';

const mockPerformance: Performance[] = [
  {
    id: 1,
    date: '1402/06/01',
    workHours: 8,
    overtimeHours: 2,
    status: 'present',
    description: 'پروژه اصلی - توسعه زیرساخت'
  },
  {
    id: 2,
    date: '1402/06/02',
    workHours: 0,
    overtimeHours: 0,
    status: 'leave',
    description: 'مرخصی استحقاقی'
  },
  {
    id: 3,
    date: '1402/06/03',
    workHours: 6,
    overtimeHours: 0,
    status: 'mission',
    description: 'ماموریت اداری - بازدید از پروژه'
  },
  {
    id: 4,
    date: '1402/06/04',
    workHours: 8,
    overtimeHours: 3,
    status: 'present',
    description: 'جلسات هماهنگی و برنامه‌ریزی'
  },
  {
    id: 5,
    date: '1402/06/05',
    workHours: 0,
    overtimeHours: 0,
    status: 'absent',
    description: 'غیبت'
  }
];

export const getPerformance = async (): Promise<Performance[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPerformance);
    }, 1000);
  });
};
