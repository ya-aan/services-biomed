import { baseClient } from "@/services/baseClient";

export const getResult = async (requestNr, birthDate) => {
  const params = {
    request_nr: requestNr,
    birth_date: birthDate,
  };
  return await baseClient.post("/requests/get-request-info", null, {
    params: params,
  });
};
