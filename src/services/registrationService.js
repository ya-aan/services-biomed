import { baseClient } from "@/services/baseClient";

export const registrationUser = async (formData) => {
  return await baseClient.post("/users/register", formData);
};

export const resendEmail = async (data) => {
  return await baseClient.post(`/users/resend-email-verify?email=${data}`);
};
