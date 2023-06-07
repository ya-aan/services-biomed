import { baseClient } from "@/services/baseClient";

export const registerNewUser = async (registrationData) => {
  return await baseClient.post("/users/register", registrationData);
};

export const resendVerification = async (email) => {
  return await baseClient.post(`/users/resend-email-verify?email=${email}`);
};
