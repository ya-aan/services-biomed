import { baseClient } from "@/services/baseClient";

export const forgotPassword = async (data) => {
  return await baseClient.post("/users/forgot-password", data);
};

export const resetPassword = async (newPassword) => {
  return await baseClient.post(
    `/users/reset-password?new_password=${newPassword}`
  );
};
