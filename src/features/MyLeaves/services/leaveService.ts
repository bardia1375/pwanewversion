import type { Leave } from '../types';

const mockLeaves: Leave[] = [
  {
    id: 1,
    type: 'daily',
    reason: 'مرخصی استحقاقی',
    startDate: '1402/06/10',
    endDate: '1402/06/12',
    status: 'approved',
    duration: '3 روز'
  },
  {
    id: 2,
    type: 'hourly',
    reason: 'مراجعه به پزشک',
    startDate: '1402/06/15',
    startTime: '10:00',
    endTime: '12:00',
    status: 'pending',
    duration: '2 ساعت'
  },
  {
    id: 3,
    type: 'daily',
    reason: 'مرخصی اضطراری',
    startDate: '1402/07/01',
    endDate: '1402/07/01',
    status: 'rejected',
    duration: '1 روز'
  },
  {
    id: 4,
    type: 'hourly',
    reason: 'امور اداری',
    startDate: '1402/07/05',
    startTime: '14:00',
    endTime: '16:00',
    status: 'approved',
    duration: '2 ساعت'
  }
];

export const getLeaves = async (): Promise<Leave[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLeaves);
    }, 1000);
  });
};
