export interface Performance {
  id: number;
  date: string;
  workHours: number;
  overtimeHours: number;
  status: PerformanceStatus;
  description?: string;
}

export type PerformanceStatus = 'present' | 'absent' | 'leave' | 'mission';
