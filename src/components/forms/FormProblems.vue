<script setup>
import { ref } from "vue";
import { sendEmailSupport } from "@/services/problemService";

const email = ref("");
const message = ref("");

async function problem() {
  try {
    await sendEmailSupport(email.value, message.value);
    alert("Ваше сообщение отправлено службе поддержки");
  } catch (e) {
    if (e.response?.status === 422) {
      alert("Ошибка: Неверный формат данных");
    } else if (e.response?.status === 400) {
      alert("Ошибка: Неверный формат данных");
    } else {
      alert("Произошла ошибка при попытки отправить заявку");
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="problem">
      <input
        class="input-form"
        id="email"
        type="email"
        v-model.trim="email"
        placeholder="Напишите ваш email"
        required
      />

      <textarea
        class="textarea-form"
        v-model.trim="message"
        placeholder="Опишите вашу проблему"
        cols="30"
        rows="10"
      ></textarea>

      <button class="button-form" type="submit">Отправить запрос</button>
    </form>
  </div>
</template>

<style lang="css" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-form {
  border-radius: 8px;
  border: none;
  background-color: #ebeded;
  color: #58595b;
  -webkit-box-shadow: rgba(186, 186, 186, 1) 0px 1px 3px 0px inset;
  box-shadow: rgba(186, 186, 186, 1) 0px 1px 3px 0px inset;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 13px;
  margin-bottom: 20px;
}

.textarea-form {
  border-radius: 8px;
  border: none;
  background-color: #ebeded;
  color: #58595b;
  -webkit-box-shadow: rgba(186, 186, 186, 1) 0px 1px 3px 0px inset;
  box-shadow: rgba(186, 186, 186, 1) 0px 1px 3px 0px inset;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 13px;

  resize: none;
  margin-bottom: 20px;
}

.button-form {
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  background-color: #45a82a;
  padding: 12px 11px;
  display: block;
  width: 100%;
  font: normal 14.6pt/14.6pt Tahoma, Arial, Helvetica, sans-serif;
  box-shadow: rgba(94, 112, 91, 1) 2px 2px 5px 0px;
  color: #fff;
  text-align: center;
  background: #45a82a;
  cursor: pointer;
  background: linear-gradient(to bottom, #45a82a 0%, #3c9225 100%);
}
</style>
