import { baseClient } from "@/services/baseClient";

export const registerNewUser = async (formData) => {
  return await baseClient.post("/users/register", formData);
};

export const resendVerification = async (email) => {
  return await baseClient.post(`/users/resend-email-verify?email=${email}`);
};
