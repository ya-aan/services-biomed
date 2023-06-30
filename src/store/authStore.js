import { defineStore } from "pinia";
import { authUser } from "@/services/authService";
import { useToastStore } from "@/store/toastStore";

export const useAuthStore = defineStore("auth", {
  actions: {
    async authorizationStore(formData) {
      const toastStore = useToastStore();

      try {
        const response = await authUser(formData);
      } catch (e) {
        if (
          e.response &&
          e.response.status === 400 &&
          e.response.data.detail === "LOGIN_BAD_CREDENTIALS"
        ) {
          toastStore.setErrorNotification("Неверный логин или пароль");
        } else if (e.response.data.detail === "LOGIN_USER_NOT_VERIFIED") {
          toastStore.setErrorNotification(
            "Учетная запись не была подтверждена"
          );
        } else {
          toastStore.setErrorNotification(
            "Произошла ошибка при авторизации, попробуйте позже"
          );
        }
      }
    },
  },
});
