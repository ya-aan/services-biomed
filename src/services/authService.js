import { baseClient } from "./baseClient";

export const authUser = async (formData) => {
  return await baseClient.post("/users/login", formData);
};
