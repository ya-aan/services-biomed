// Здесь загрузка заказов

import { baseClient } from "./baseClient";

export const postOrder = async (requestNr, birthDate) => {
  const params = {
    request_nr: requestNr,
    date_birth: birthDate,
  };

  return await baseClient.post("/requests/add-request", null, {
    params: params,
  });
};

export const getOrders = async (pageNumber = 0) => {
  return await baseClient.post(
    `/requests/get-requests-user?page=${pageNumber}`
  );
};

export const deleteOrder = async (orderId) => {
  return await baseClient.post(`/requests/del-request?request_nr=${orderId}`);
};
