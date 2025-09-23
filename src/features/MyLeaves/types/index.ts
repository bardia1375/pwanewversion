export interface Leave {
  id: number;
  type: 'daily' | 'hourly';
  reason: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  status: 'pending' | 'approved' | 'rejected';
  duration: string;
}

export type LeaveType = 'daily' | 'hourly';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
