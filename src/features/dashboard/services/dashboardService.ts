import axiosInstance from "../../../api/axiosInstance";



export const dashboardService = async (): Promise<{ accessToken: string }> => {
  const { data } = await axiosInstance.post("/dashboardService", {});
  return data;
};

