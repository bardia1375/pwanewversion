import type { AttendanceRecord, AttendanceFilters } from '../types';

export class AttendanceService {
  private static BASE_URL = '/api/attendance';

  static async getAttendanceRecords(filters: AttendanceFilters): Promise<AttendanceRecord[]> {
    const queryParams = new URLSearchParams({
      startDate: filters.startDate.toISOString(),
      endDate: filters.endDate.toISOString(),
      ...(filters.department && { department: filters.department }),
      ...(filters.status && { status: filters.status }),
      ...(filters.employeeId && { employeeId: filters.employeeId })
    });

    const response = await fetch(`${this.BASE_URL}/records?${queryParams}`);

    if (!response.ok) {
      throw new Error('Failed to fetch attendance records');
    }

    return response.json();
  }

  static async recordAttendance(employeeId: string, type: 'checkIn' | 'checkOut'): Promise<AttendanceRecord> {
    const response = await fetch(`${this.BASE_URL}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeId,
        type,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to record ${type}`);
    }

    return response.json();
  }

  static async getEmployeeAttendanceSummary(employeeId: string, month: number, year: number) {
    const response = await fetch(
      `${this.BASE_URL}/summary/${employeeId}?month=${month}&year=${year}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch attendance summary');
    }

    return response.json();
  }
}
