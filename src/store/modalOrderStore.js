import { defineStore } from "pinia";

export const useModalOrderStore = defineStore("modalOrder", {
  state: () => ({
    order: null,
    works: [],
    showModal: false,
  }),

  actions: {
    setOrder(order) {
      this.order = order;
      let workArray = [];
      this.order.request.responses.forEach((item) => {
        workArray.push(...item.works);
      });
      this.works = workArray;
      this.showModal = true;
    },
  },
});
