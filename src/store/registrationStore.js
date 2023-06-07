import { defineStore } from "pinia";
import {
  registerNewUser,
  resendVerification,
} from "@/services/registrationService";

export const useRegistrationStore = defineStore("registration", {
  actions: {
    async registerUser(registrationData) {
      try {
        const response = await registerNewUser(registrationData);
        alert("Письмо с подтверждения отправлено на указанный email");
      } catch (e) {
        if (
          e.response &&
          e.response.status === 400 &&
          e.response.data.detail === "REGISTER_USER_ALREADY_EXISTS"
        ) {
          alert("Пользователь с таким email уже существует");
        } else {
          alert("Произошла ошибка при регистрации, попробуйте попозже");
        }
      }
    },

    async resendEmail(email) {
      try {
        const response = await resendVerification(email);
        alert("Повторное письмо отправлено вам на почту");
      } catch (e) {
        switch (e.response && e.response.status) {
          case 400:
            alert("Почта не найдена");
            break;
          case 498:
            alert("Пользователь либо неактивен, либо уже верифицирован");
            break;
          case 422:
            alert("Ошибка валидации, проверьте правильно ли заполнены поля");
            break;
          default:
            alert(
              "Произошла ошибка при верификации пользователя, повторите позже"
            );
            break;
        }
      }
    },
  },
});
