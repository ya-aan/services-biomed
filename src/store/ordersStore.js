import { defineStore } from "pinia";
import { postOrder, getOrders, deleteOrder } from "@/services/ordersService";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: null,
    totalPages: 0,
  }),

  getters: {
    orderIsNotNullOrEmpty(state) {
      return state.orders && state.orders.length > 0;
    },
  },

  actions: {
    async fetchOrders() {
      try {
        // const response = (await import("../data/data.json")).default;
        // this.totalPages = response.total_pages;
        // const keys = Object.keys(response.requests);
        // const result = keys.map((key) => {
        //   return response.requests[key];
        // });
        const response = await getOrders();
        this.totalPages = response.data.total_pages;
        const keys = Object.keys(response.data.requests);
        const result = keys.map((key) => {
          return response.data.requests[key];
        });
        this.orders = result;
        console.log("eto result", result);
      } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data.detail) {
          alert("Ошибка валидации данных: ", e.response.data.detail);
        } else {
          alert("Произошла ошибка при загрузке данных");
        }
      }
    },

    // Здесь добавлю Заказ (Order)
    async addingOrder(requestNr, birthDate) {
      try {
        const response = await postOrder(requestNr, birthDate);
        if (response.status === 200) {
          await this.fetchOrders();
        }
      } catch (e) {
        if (
          e.response &&
          e.response.status === 422 &&
          e.response.status === 400 &&
          e.response.data.detail === "Bad Request"
        ) {
          alert(
            "Ошибка: Неверный формат данных. Проверьте указана ли верная дата рождения, а так же номер заказа"
          );
        } else {
          alert("Ошибка: Попробуйте позже");
        }
      }
    },

    async deleteOrder(orderId) {
      try {
        const response = await deleteOrder(orderId);
        await this.fetchOrders();
      } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data.detail) {
          alert("Ошибка валидации данных");
        } else {
          alert("Произошла ошибка при удалении заказа");
        }
      }
    },
  },
});