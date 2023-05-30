import { defineStore } from "pinia";

export const useModalResultStore = defineStore("modalResult", {
  state: () => ({
    resultModal: null,
    works: [],
    showModal: false,
  }),

  actions: {
    setResult(res) {
      this.resultModal = res;
      let workArray = [];
      this.resultModal.responses.forEach((item) => {
        workArray.push(...item.works);
      });
      this.works = workArray;
      this.showModal = true;
    },
  },
});
