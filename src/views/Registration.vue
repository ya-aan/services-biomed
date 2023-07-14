<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRegistrationStore } from "../store/registrationStore";
import Modal from "@/components/ui/Modal.vue";
import FormProblems from "@/components/forms/FormProblems.vue";

const registerStore = useRegistrationStore();
const router = useRouter();

const email = ref("");
const showModal = ref(false);

async function register() {
  const registrationData = {
    email: email.value,
    password: "",
  };
  await registerStore.registerUser(registrationData);
  router.push("/auth");
}

async function resend() {
  await registerStore.resendEmail(email.value);
}
</script>

<template>
  <div class="container">
    <div class="registration">
      <div class="registration-wrapper">
        <div class="registration-body">
          <h2 class="registration-title">Зарегистрировать Личный кабинет</h2>
          <form @submit.prevent="register" class="form">
            <label class="registration-label label" for="email">Email</label>
            <input
              class="input"
              type="email"
              id="email"
              v-model.trim="email"
              required
            />

            <button class="registration-btn" type="submit">
              Создать личный кабинет
            </button>

            <div>
              <p>
                Проблемы с регистрацией?
                <a class="link-registration" href="#" @click="showModal = true"
                  >Напишите,</a
                >
                и мы поможем.
              </p>

              <Modal
                v-if="showModal"
                @close="showModal = false"
                title="Напишите о вашей проблеме, и мы в ближайшее время свяжемся с вами для ее решения."
              >
                <FormProblems />
              </Modal>

              <p>
                <a class="link-registration" href="#" @click.prevent="resend">
                  Повторно запросить
                </a>
                письмо активации.
              </p>

              <p>
                Подтверждая регистрацию, вы принимаете
                <a
                  class="link-registration"
                  href="https://azbykamed.ru/about/policy/"
                  target="_blank"
                >
                  условия</a
                >
                согласия на обработку персональных данных.
              </p>
            </div>
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

  box-sizing: border-box;
  border-radius: 4px;
  background-color: #45a82a;
  padding: 15px 31px 1px;
  box-shadow: rgba(113, 158, 100, 1) 2px 2px 5px 0px;
  color: #fff;
  text-align: left;
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

.registration-label {
  color: #fff;
}

.registration-btn {
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  background-color: #45a82a;
  padding: 12px 11px;
  display: block;
  width: 100%;
  font: normal 14.6pt/14.6pt Tahoma, Arial, Helvetica, sans-serif;
  box-shadow: rgba(94, 112, 91, 1) 2px 2px 5px 0px;
  color: #529f38;
  text-align: center;
  background: #fbfdfa;
  cursor: pointer;

  background: linear-gradient(to bottom, #fbfdfa 0%, #c1c7bf 100%);
}

.registration-btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

.link-registration {
  color: #fff;
}

.link-registration:hover {
  text-decoration: none;
}

@media (max-width: 900px) {
  .registration-wrapper {
    width: 100%;
    border-radius: 0;
  }
}

@media (max-width: 450px) {
  .form {
    width: 100%;
  }

  .registration-title {
    font-size: 1rem;
  }
}
</style>
