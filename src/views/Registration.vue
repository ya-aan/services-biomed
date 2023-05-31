<script setup>
import { ref } from "vue";
import {
  registerNewUser,
  resendVerification,
} from "../services/registrationService";

const email = ref("");
const password = ref("");
const birthDate = ref("");
const showRegisterButton = ref(false);

async function register() {
  const formData = {
    email: email.value,
    password: password.value,
    date_birth: birthDate.value,
    male: 0, // 0 означает пол не присвоен, 1 - мужской, 2 - женский
  };
  showRegisterButton.value = true;
  try {
    const response = await registerNewUser(formData);
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
}

async function resend() {
  try {
    const response = await resendVerification(email.value);
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
        alert("Произошла ошибка при верификации пользователя, повторите позже");
        break;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="registration">
      <div class="registration-wrapper">
        <div class="registration-body">
          <h2>Регистрация</h2>
          <form @submit.prevent="register" class="form">
            <div class="input-wrapper">
              <input
                class="registration-input"
                type="email"
                id="email"
                v-model="email"
                required
              />
              <label for="email">Email</label>
            </div>
            <div class="input-wrapper">
              <input
                class="registration-input"
                type="password"
                id="password"
                v-model="password"
                required
              />
              <label for="password">Пароль</label>
            </div>
            <div class="input-wrapper">
              <input
                class="registration-input"
                type="date"
                id="birthdate"
                pattern="\d{2}\.\d{2}\.\d{4}"
                v-model="birthDate"
                required
              />
              <label for="birthdate">Дата рождения</label>
            </div>
            <button class="registration-btn" type="submit">
              Зарегистрироваться
            </button>
            <button
              class="registration-btn"
              @click.prevent="resend"
              v-if="showRegisterButton"
            >
              Не пришло письмо?
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.registration {
  display: flex;
  justify-content: center;
}

.registration-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  width: 50%;
  border-radius: 20px;
}

.registration-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.form {
  width: 400px;
  display: flex;
  flex-direction: column;
}

.form div {
  margin-bottom: 20px;
}

.registration-input {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  width: 100%;
  height: 50px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.input-wrapper label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 13px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  padding: 5px;
}

.input-wrapper .registration-input:focus + label,
.input-wrapper .registration-input:valid + label {
  top: -20px;
  font-size: 11px;
  color: #82cc6c;
}

.registration-btn {
  text-decoration: none;
  overflow: visible;
  padding: 7px 11px;
  border: 1px solid #82cc6c;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #098700;
  font: 13px Tahoma, Arial, sans-serif;
  cursor: pointer;
  background: #fff;
  margin-bottom: 20px;
}

.registration-btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}
</style>
