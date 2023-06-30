<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();

const router = useRouter();

const email = ref("");
const password = ref("");

async function submit() {
  const formData = new FormData();
  formData.append("username", email.value);
  formData.append("password", password.value);

  await authStore.authorizationStore(formData);
  router.push("/orders");
}

//   async function submit() {
//   const url = "http://81.200.148.127:8080/users/login";
//   const formData = new FormData();
//   formData.append("username", email.value);
//   formData.append("password", password.value);
//   try {
//     const response = await axios.post(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         withCredentials: true,
//       },
//     });
//     router.push("/orders");
//   } catch (e) {
//     if (
//       e.response &&
//       e.response.status === 400 &&
//       e.response.data.detail === "LOGIN_BAD_CREDENTIALS"
//     ) {
//       alert("Неверный логин или пароль");
//     } else if (e.response.data.detail === "LOGIN_USER_NOT_VERIFIED") {
//       alert("Учетная запись не была подтверждена");
//     } else {
//       alert("Произошла ошибка при авторизации, попробуйте позже");
//     }
//   }
// }
</script>

<template>
  <div class="container">
    <div class="auth">
      <div class="auth-wrapper">
        <div class="auth-body">
          <h2>Авторизация</h2>
          <form @submit.prevent="submit" class="form">
            <label class="label" for="email">Email</label>
            <input
              class="input"
              type="email"
              id="email"
              v-model.trim="email"
              required
            />

            <label class="label" for="password">Пароль</label>
            <input
              class="input"
              type="password"
              id="password"
              v-model.trim="password"
              required
            />

            <button class="auth-btn" type="submit">Авторизоваться</button>
            <div class="link-wrapper">
              <router-link class="link" to="/registration"
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
.auth {
  display: flex;
  justify-content: center;
}

.auth-wrapper {
  background-color: #fff;
  width: 50%;
  border-radius: 20px;
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

.button-auth__registration {
  border: none;
  background: none;
  color: #098700;
  cursor: pointer;
}

.button-auth__registration:hover {
  color: #ff5a00;
}

/* Adaptiv */

@media (max-width: 900px) {
  .auth-wrapper {
    width: 100%;
    border-radius: 0;
  }
}

@media (max-width: 450px) {
  .form {
    width: 100%;
  }
}
</style>
