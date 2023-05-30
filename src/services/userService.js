import { baseClient } from "@/services/baseClient";

export const getUserData = async () => {
  return await baseClient.get("/users/me");
};

export const patchUserData = async (payload) => {
  return await baseClient.patch("/users/me", payload);
};

export const postLogout = async () => {
  return await baseClient.post("/users/logout");
};
