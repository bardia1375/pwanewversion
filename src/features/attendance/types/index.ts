export interface Employee {
  id: string;
  name: string;
  employeeCode: string;
  department: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  checkIn: Date;
  checkOut: Date | null;
  status: 'present' | 'absent' | 'late' | 'leave';
  notes?: string;
}

export interface AttendanceState {
  records: AttendanceRecord[];
  isLoading: boolean;
  error: Error | null;
  selectedDate: Date;
}

export interface AttendanceFilters {
  startDate: Date;
  endDate: Date;
  department?: string;
  status?: 'present' | 'absent' | 'late' | 'leave';
  employeeId?: string;
}
