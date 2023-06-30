import { defineStore } from "pinia";
import { postOrder, getOrders, deleteOrder } from "@/services/ordersService";
import { useToastStore } from "./toastStore";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: null,
    totalPages: 0,
    // limit: 10,
    // perPage: 10,
    currentPage: 0,
  }),

  getters: {
    orderIsNotNullOrEmpty(state) {
      return state.orders && state.orders.length > 0;
    },

    pagesCount(state) {
      return state.currentPage < state.totalPages;
    },
  },

  actions: {
    async fetchOrders() {
      const toastStore = useToastStore();

      try {
        const response = await getOrders(this.currentPage);
        this.totalPages = response.data.total_pages;
        const keys = Object.keys(response.data.requests);
        const result = keys.map((key) => {
          return response.data.requests[key];
        });

        // this.orders = result;

        if (this.orders) {
          this.orders = [...this.orders, ...result];
        } else {
          this.orders = result;
        }

        this.currentPage += 1;
      } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data.detail) {
          toastStore.setErrorNotification("Ошибка валидации данных: ");
        } else {
          toastStore.setErrorNotification(
            "Произошла ошибка при загрузке данных"
          );
        }
      }
    },

    // Здесь добавлю Заказ (Order)
    async addingOrder(requestNr, birthDate) {
      const toastStore = useToastStore();
      try {
        const response = await postOrder(requestNr, birthDate);
        if (response.status === 200) {
          await this.fetchOrders();
        }
      } catch (e) {
        if (e.response?.status === 422) {
          toastStore.setErrorNotification(
            "Поле «Номер заказа» имеет неверный формат. Возможно, вы вводите символы на русской раскладке клавиатуры."
          );
        } else if (e.response?.status === 400) {
          toastStore.setErrorNotification("Ошибка: Неверный формат данных");
        } else {
          toastStore.setErrorNotification(
            "Произошла ошибка при добавление заявки"
          );
        }
      }
    },

    async deleteOrder(orderId) {
      const toastStore = useToastStore();
      try {
        const response = await deleteOrder(orderId);
        await this.fetchOrders();
      } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data.detail) {
          toastStore.setErrorNotification("Ошибка валидации данных");
        } else {
          toastStore.setErrorNotification(
            "Произошла ошибка при удалении заказа"
          );
        }
      }
    },
  },
});
