import { baseClient } from "./baseClient";

export const sendEmailSupport = async (email, message) => {
  const params = {
    email: email,
    message: message,
  };
  return await baseClient.post("/users/send-email-support", null, {
    params: params,
  });
};
