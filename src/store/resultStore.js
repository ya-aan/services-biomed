import { defineStore } from "pinia";
import { getResult } from "@/services/resultService";
import { useModalResultStore } from "./modalResultStore";
import { useToastStore } from "./toastStore";

export const useResultStore = defineStore("result", {
  state: () => ({
    result: null,
  }),

  actions: {
    async fetchResult(requestNr, birthDate) {
      const toastStore = useToastStore();
      const modalStore = useModalResultStore();

      if (!requestNr || !birthDate) {
        toastStore.setErrorNotification("Ошибка: Не указаны данные");
        return;
      }

      try {
        const response = await getResult(requestNr, birthDate);
        this.result = response.data;
        modalStore.setResult(response.data.request);
      } catch (e) {
        if (e.response?.status === 422) {
          toastStore.setErrorNotification("Ошибка: Неверный формат данных");
        } else if (e.response?.status === 400) {
          toastStore.setErrorNotification("Ошибка: Неверный формат данных");
        } else {
          toastStore.setErrorNotification(
            "Произошла ошибка при получения заявки"
          );
        }
      }
    },
  },
});
