import { create } from 'zustand';
import type { AttendanceState, AttendanceFilters } from '../types';
import { AttendanceService } from '../services/attendanceService';

interface AttendanceStore extends AttendanceState {
  fetchRecords: (filters: AttendanceFilters) => Promise<void>;
  recordAttendance: (employeeId: string, type: 'checkIn' | 'checkOut') => Promise<void>;
  setSelectedDate: (date: Date) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  records: [],
  isLoading: false,
  error: null,
  selectedDate: new Date(),

  fetchRecords: async (filters: AttendanceFilters) => {
    try {
      set({ isLoading: true, error: null });
      const records = await AttendanceService.getAttendanceRecords(filters);
      set({ records });
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Failed to fetch attendance records') });
    } finally {
      set({ isLoading: false });
    }
  },

  recordAttendance: async (employeeId: string, type: 'checkIn' | 'checkOut') => {
    try {
      set({ isLoading: true, error: null });
      const record = await AttendanceService.recordAttendance(employeeId, type);
      set((state) => ({
        records: [...state.records, record]
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Failed to record attendance') });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  }
}));

