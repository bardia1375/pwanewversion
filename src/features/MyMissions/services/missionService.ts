import axiosInstance from "../../../api/axiosInstance";

export interface MissionValues {
  date: string | null;
  date_from: string;
  date_to: string;
  time_from: string | null;
  time_to: string | null;
  count: number | null;
  date_food_meal: string | null;
  date_food_meal_title: string | null;
  pre_shift_id: number;
  replace_shift_id: number;
  person_id: number;
  replace_person_id: number;
  colleague_shift: string | null;
  my_shift: string | null;
}

export interface MissionData {
  id: number;
  user_id: number;
  position_id: number;
  signature: string | null;
  key: string;
  registration_datetime: string;
  type_id: number;
  status: "accepted" | "rejected" | "pending";
  values: MissionValues;
  description: string | null;
  date_from: string;
  date_to: string;
  time_from: string | null;
  time_to: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  type: Record<string, unknown> | null;
  form: Record<string, unknown> | null;
  requests: Record<string, unknown> | null;
}

export const getMissions = async (startDate?: string, endDate?: string): Promise<MissionData[]> => {
  const today = new Date().toISOString().split('T')[0];
  const start = startDate || today;
  const end = endDate || today;

  const { data } = await axiosInstance.get<MissionData[]>(
    `/MobileApp/GetMyAssignment?StartDate=${start}&EndDate=${end}`
  );
  return data;
};
