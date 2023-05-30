import { defineStore } from "pinia";
import { getUserData, patchUserData, postLogout } from "@/services/userService";
import moment from "moment";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  getters: {
    formattedBirthDate(state) {
      const date = moment(state.user.date_birth, "YYYY.MM.DD");
      return date.format("DD.MM.YYYY");
    },
    fullName(state) {
      return `${state.user.lastname} ${state.user.firstname} ${state.user.middlename}`;
    },

    genderString(state) {
      const genderValue = Number(state.user.male);
      let str = "";
      switch (genderValue) {
        case 1:
          str = "Мужской";
          break;
        case 2:
          str = "Женский";
          break;
        default:
          str = "Не выбрано";
          break;
      }
      return str;
    },

    hasCompletedPersonalData(state) {
      const res =
        state.user?.lastname &&
        state.user?.firstname &&
        state.user?.middlename &&
        state.user?.phone;
      return res;
    },
  },

  actions: {
    async fetchUser() {
      try {
        const response = await getUserData();
        this.user = response.data;
        if (this.user.male === null) {
          this.user.male = 0;
        }
      } catch (e) {
        if (
          e.response &&
          e.response.status === 401 &&
          e.response.data.detail === "Missing token or inactive user"
        ) {
          alert("Ошибка: такого пользователя не существует");
        } else {
          alert("Произошла ошибка при загрузке пользователя");
        }
      }
    },
    async patchUser(payload) {
      try {
        const response = await patchUserData(payload);
        await this.fetchUser();
      } catch (e) {
        if (e.response) {
          if (
            e.response.status === 400 &&
            e.response.data.detail === "UPDATE_USER_EMAIL_ALREADY_EXISTS"
          ) {
            alert("Ошибка: Этот email уже зарегистрирован");
          } else if (e.response.status === 401) {
            alert("Ошибка: Отсутствует токен или пользователь неактивен");
          } else if (e.response.status === 422) {
            alert("Ошибка: Неверный формат данных");
          }
        } else {
          alert("Произошла ошибка при обновление данных пользователя");
        }
      }
    },

    async logoutUser() {
      try {
        const response = await postLogout();
      } catch (e) {
        if (e.response && e.response.status === 401) {
          alert("Ошибка: отсутствует токен или пользователь неактивен");
        } else {
          alert("Произошла ошибка при выходе из системы");
        }
      }
    },
  },
});
