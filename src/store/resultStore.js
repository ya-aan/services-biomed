import { defineStore } from "pinia";
import { getResult } from "@/services/resultService";
import { useModalResultStore } from "./modalResultStore";

export const useResultStore = defineStore("result", {
  state: () => ({
    result: null,
  }),

  actions: {
    async fetchResult(requestNr, birthDate) {
      const modalStore = useModalResultStore();
      try {
        const response = await getResult(requestNr, birthDate);
        this.result = response.data;
        modalStore.setResult(response.data.request);
      } catch (e) {
        if (e.response?.status === 422) {
          alert("Ошибка: Неверный формат данных");
        } else if (e.response?.status === 400) {
          alert("Ошибка: Неверный запрос");
        } else {
          alert("Произошла ошибка при получения заявки");
        }
      }
    },
  },
});
