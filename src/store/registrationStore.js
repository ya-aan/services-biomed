import { defineStore } from "pinia";
import {
  registerNewUser,
  resendVerification,
} from "@/services/registrationService";
import { useToastStore } from "./toastStore";

export const useRegistrationStore = defineStore("registration", {
  actions: {
    async registerUser(registrationData) {
      const toastStore = useToastStore();
      try {
        const response = await registerNewUser(registrationData);
        toastStore.setNotification(
          "Письмо с подтверждения отправлено на указанный email",
          "success"
        );
      } catch (e) {
        if (
          e.response &&
          e.response.status === 400 &&
          e.response.data.detail === "REGISTER_USER_ALREADY_EXISTS"
        ) {
          toastStore.setErrorNotification(
            "Пользователь с таким email уже существует"
          );
        } else {
          toastStore.setErrorNotification(
            "Произошла ошибка при регистрации, попробуйте попозже"
          );
        }
      }
    },

    async resendEmail(email) {
      const toastStore = useToastStore();
      try {
        const response = await resendVerification(email);
        toastStore.setNotification(
          "Повторное письмо отправлено вам на почту",
          "info"
        );
      } catch (e) {
        switch (e.response && e.response.status) {
          case 400:
            toastStore.setErrorNotification("Почта не найдена");
            break;
          case 498:
            toastStore.setErrorNotification(
              "Пользователь либо неактивен, либо уже верифицирован"
            );
            break;
          case 422:
            toastStore.setErrorNotification(
              "Ошибка валидации, проверьте правильно ли заполнены поля"
            );
            break;
          default:
            toastStore.setErrorNotification(
              "Произошла ошибка при верификации пользователя, повторите позже"
            );
            break;
        }
      }
    },
  },
});
