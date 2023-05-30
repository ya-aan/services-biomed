<script setup>
import { ref } from "vue";
import { forgotPassword } from "@/services/passwordService";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");

async function forgot() {
  const data = {
    email: email.value,
  };

  try {
    const response = await forgotPassword(data);
    alert("Письмо со сменной пароля отправлено вам на почту.");
    router.push("/auth");
  } catch (e) {
    if (e.response.status === 422) {
      alert("Ошибка: Неверный формат данных");
    } else {
      alert("Произошла ошибка при восстановлении пароля");
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
            <div class="input-wrapper">
              <input
                class="forgot-input"
                type="email"
                v-model="email"
                required
              />
              <label for="email">Email</label>
            </div>

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

.forgot-input {
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

.input-wrapper .forgot-input:focus + label,
.input-wrapper .forgot-input:valid + label {
  top: -20px;
  font-size: 11px;
  color: #82cc6c;
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
</style>
