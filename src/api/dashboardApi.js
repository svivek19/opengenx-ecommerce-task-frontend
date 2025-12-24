import axios from "./axios";

export const fetchDashboardStats = async () => {
  const { data } = await axios.get("/dashboard/stats");
  return data;
};
