<script setup>
import { ref } from "vue";
import { forgotPassword } from "@/services/passwordService";
import { useRouter } from "vue-router";
import { useToastStore } from "@/store/toastStore";

const router = useRouter();
const toastStore = useToastStore();

const email = ref("");

async function forgot() {
  const data = {
    email: email.value,
  };

  try {
    const response = await forgotPassword(data);
    toastStore.setNotification(
      "Письмо со сменной пароля отправлено вам на почту.",
      "success"
    );
    router.push("/auth");
  } catch (e) {
    if (e.response.status === 422) {
      toastStore.setErrorNotification("Ошибка: Неверный формат данных");
    } else {
      toastStore.setErrorNotification(
        "Произошла ошибка при восстановлении пароля"
      );
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="forgot">
      <div class="forgot-wrapper">
        <div class="forgot-body">
          <h2>Восстановление пароля</h2>
          <form @submit.prevent="forgot" class="form">
            <label class="label" for="email">Email</label>
            <input class="input" type="email" v-model.trim="email" required />

            <button class="btn-forgot" type="submit">Сменить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.forgot {
  display: flex;
  justify-content: center;
}

.forgot-wrapper {
  background-color: #fff;
  width: 50%;
  border-radius: 20px;
}

.forgot-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 15px;
}

.btn-forgot {
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

.btn-forgot:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

@media (max-width: 900px) {
  .forgot-wrapper {
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
