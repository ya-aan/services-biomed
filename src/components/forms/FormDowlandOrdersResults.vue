<script setup>
import { ref } from "vue";
const emit = defineEmits(["submit"]);

const orderNumber = ref("");
const birthDate = ref("");
const showBirthDateInput = ref(false);

function onSubmit() {
  // const payload = {
  //   request_nr: orderNumber.value,
  //   date_birth: birthDate.value,
  // };
  emit("submit", orderNumber.value, birthDate.value);
}
</script>
<template>
  <div class="form-wrapper">
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input
          class="form-input"
          type="text"
          v-model.trim="orderNumber"
          required
        />
        <label for="text">Номер заказа</label>
      </div>

      <div class="input-wrapper" v-if="showBirthDateInput">
        <input class="form-input" type="date" v-model.trim="birthDate" />
        <label for="text">Дата рождения</label>
      </div>

      <span v-if="showBirthDateInput"
        >Введите дату рождения пользователя которого вы хотите получить
        анализ</span
      >

      <div class="form-example">
        например: 5218-D681-192143708 или 12345-12345-12345678
      </div>

      <button class="btn-form" type="submit">Добавить</button>
    </form>
    <button class="btn-form" @click="showBirthDateInput = true">
      Добавить доп. Данные
    </button>
  </div>
</template>

<style lang="css" scoped>
.form-wrapper {
  font-size: 14px;
  line-height: 1.5715;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
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

.form-input {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  width: 100%;
  height: 50px;
}

.input-wrapper .form-input:focus + label,
.input-wrapper .form-input:valid + label {
  top: -20px;
  font-size: 11px;
  color: #82cc6c;
}

.form-example {
  margin: 10px 0;
  font-size: 11px;
  text-align: center;
  color: #5f5f5f;
}

.btn-form {
  border: 1px solid #82cc6c;
  border-radius: 5px;
  margin-left: auto;
  margin-bottom: 5px;
  display: block;
  color: #098700;
  text-decoration: none;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  cursor: pointer;
}

.btn-form:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}
</style>
