export interface Mission {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
}

export type MissionStatus = 'pending' | 'approved' | 'rejected';
