<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const orderNumber = ref("");
const birthDate = ref("");
const showBirthDateInput = ref(false);

function onSubmit() {
  emit("submit", orderNumber.value, birthDate.value);
}
</script>
<template>
  <div class="form-wrapper">
    <form class="form" @submit.prevent="onSubmit">
      <div>
        <label class="label" for="text">Номер заказа</label>
        <input
          class="input input-dowland"
          type="text"
          v-model.trim="orderNumber"
          required
        />

        <span class="form-example">например: 7230418123</span>
      </div>

      <div v-if="showBirthDateInput">
        <label class="label" for="text">Дата рождения</label>
        <input class="input" type="date" required v-model="birthDate" />
      </div>

      <span v-if="showBirthDateInput"
        >Введите дату рождения указанную на бланке</span
      >

      <div class="wrapper-button">
        <button class="btn-form" @click="showBirthDateInput = true">
          Загрузить для другого человека
        </button>

        <button class="btn-form" type="submit">Добавить</button>
      </div>
    </form>
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

.input-dowland {
  margin-bottom: 0;
}

.form-example {
  margin: 10px 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #919191;
}

.wrapper-button {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}

.btn-form {
  border: 1px solid #82cc6c;
  border-radius: 5px;
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

/* adaptiv */

@media (max-width: 576px) {
  .wrapper-button {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
