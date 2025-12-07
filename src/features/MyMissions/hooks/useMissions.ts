import { useQuery } from "@tanstack/react-query";
import { getMissions, type MissionData } from "../services/missionService";
import type { Mission } from "../types";

export const useMissions = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ["missions", startDate, endDate],
    queryFn: () => getMissions(startDate, endDate),
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    retry: 1,
  });
};

/**
 * تبدیل MissionData از API به Mission برای نمایش
 */
export const transformMissionData = (data: MissionData): Mission => {
  return {
    id: data.id,
    title: `ماموریت - تیپ ${data.type_id}`,
    location: data.description || "موقعیت مشخص نشده",
    startDate: data.values.date_from ? new Date(data.values.date_from).toLocaleDateString('fa-IR') : "",
    endDate: data.values.date_to ? new Date(data.values.date_to).toLocaleDateString('fa-IR') : "",
    status: data.status === "accepted" ? "approved" : (data.status === "rejected" ? "rejected" : "pending"),
    description: data.description || undefined,
  };
};
