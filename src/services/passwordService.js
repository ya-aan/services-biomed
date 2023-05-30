import { baseClient } from "@/services/baseClient";

export const forgotPassword = async (data) => {
  return await baseClient.post("/users/forgot-password", data);
};
