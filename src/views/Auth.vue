<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

async function submit() {
  const url = "http://81.200.148.127:8080/users/login";
  const formData = new FormData();
  formData.append("username", email.value);
  formData.append("password", password.value);
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
    });
    router.push("/orders");
  } catch (e) {
    if (
      e.response &&
      e.response.status === 400 &&
      e.response.data.detail === "LOGIN_BAD_CREDENTIALS"
    ) {
      alert("Неверный логин или пароль");
    } else if (e.response.data.detail === "LOGIN_USER_NOT_VERIFIED") {
      alert("Учетная запись не была подтверждена");
    } else {
      alert("Произошла ошибка при авторизации, попробуйте позже");
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="auth">
      <div class="auth-wrapper">
        <div class="auth-body">
          <h2>Авторизация</h2>
          <form @submit.prevent="submit" class="form">
            <div class="input-wrapper">
              <input
                class="auth-input"
                type="email"
                id="email"
                v-model="email"
                required
              />
              <label for="email">Email</label>
            </div>

            <div class="input-wrapper">
              <input
                class="auth-input"
                type="password"
                id="password"
                v-model="password"
                required
              />
              <label for="password">Пароль</label>
            </div>

            <button class="auth-btn" type="submit">Авторизоваться</button>
            <div class="link-wrapper">
              <router-link class="link-auth__registration" to="/registration"
                >Зарегистрироваться</router-link
              >
              <button
                class="button-auth__registration"
                @click="router.push('/forgot-password')"
              >
                Забыл пароль
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* .container-center {
  width: 100%;
  padding: 0 20px;
  margin: 20px auto 0;
  max-width: 1300px;
  width: 100%;
} */
.auth {
  display: flex;
  justify-content: center;
}

.auth-wrapper {
  background-color: #fff;
  width: 50%;
  border-radius: 20px;

  /* width: 100%;
  max-width: 500px; */
}

.auth-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.auth-input {
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
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

.input-wrapper .auth-input:focus + label,
.input-wrapper .auth-input:valid + label {
  top: -20px;
  font-size: 11px;
  color: #82cc6c;
}

.auth-btn {
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
  margin-bottom: 5px;
}

.auth-btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

.link-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.link-auth__registration {
  color: #098700;
  text-decoration: none;
}

.button-auth__registration {
  border: none;
  background: none;
  color: #098700;
  cursor: pointer;
}

.button-auth__registration:hover {
  color: #ff5a00;
}

.link-auth__registration:hover {
  color: #ff5a00;
}

/* Адаптив */

/* @media (max-width: 1300px) {
  .container-center {
    width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 767px) {
  .auth-wrapper {
    max-width: 100%;
    border-radius: 0;
  }

  .auth-btn {
    font-size: 16px;
    padding: 10px 15px;
  }
} */
</style>
