import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => ({
    notifications: [],
  }),

  //   Если что то изменится в notifications getters автоматом вытащит новую notification;
  getters: {
    allNotification(state) {
      return state.notifications;
    },
  },

  actions: {
    async setNotification(message, type) {
      this.notifications.push({
        message: message,
        type: type,
      });
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000));
      await this.deleteNotification();
    },

    async setErrorNotification(message) {
      this.notifications.push({
        message: message,
        type: "danger",
      });
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000));
      await this.deleteNotification();
    },

    async deleteNotification() {
      const notifications = [...this.notifications];
      notifications.shift();
      this.notifications = [...notifications];
    },
  },
});
