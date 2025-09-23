import type { Mission } from '../types';

const mockMissions: Mission[] = [
  {
    id: 1,
    title: 'بازدید از پروژه مترو',
    location: 'تهران، ایستگاه مترو میدان آزادی',
    startDate: '1402/06/01',
    endDate: '1402/06/03',
    status: 'approved',
    description: 'بازدید از پیشرفت پروژه ساخت ایستگاه جدید مترو'
  },
  {
    id: 2,
    title: 'جلسه با پیمانکاران',
    location: 'اصفهان، دفتر مرکزی',
    startDate: '1402/06/15',
    endDate: '1402/06/15',
    status: 'pending',
    description: 'بررسی وضعیت قراردادهای جدید و مذاکره با پیمانکاران'
  },
  {
    id: 3,
    title: 'بررسی سایت جدید',
    location: 'شیراز، منطقه صنعتی',
    startDate: '1402/07/01',
    endDate: '1402/07/02',
    status: 'pending',
    description: 'بازدید از محل احداث کارخانه جدید و بررسی زیرساخت‌ها'
  },
  {
    id: 4,
    title: 'کنفرانس صنعت ساختمان',
    location: 'تهران، مرکز همایش‌های بین‌المللی',
    startDate: '1402/07/10',
    endDate: '1402/07/12',
    status: 'approved',
    description: 'شرکت در کنفرانس سالانه صنعت ساختمان و ارائه مقاله'
  }
];

export const getMissions = async (): Promise<Mission[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMissions);
    }, 1000);
  });
};
