<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["submitData"]);

const props = defineProps({
  formData: { type: Object },
  editAllFields: { type: Boolean, default: false },
});
const user = ref({ ...props.formData });

const isFormInEditMode = computed(() => props.editAllFields);

function onSubmit() {
  const errors = [];

  // Валидация фамилии
  if (!user.value.lastname) {
    errors.push("Фамилия обязательна для заполнения");
  } else if (!/^[а-яА-ЯёЁ]+$/.test(user.value.lastname)) {
    errors.push("Фамилия должна содержать только русские буквы");
  }

  // Валидация имени
  if (!user.value.firstname) {
    errors.push("Имя обязательно для заполнения");
  } else if (!/^[а-яА-ЯёЁ]+$/.test(user.value.firstname)) {
    errors.push("Имя должно содержать только русские буквы");
  }

  // Валидация отчества
  if (!user.value.middlename) {
    errors.push("Отчество обязательно для заполнения");
  } else if (!/^[а-яА-ЯёЁ]+$/.test(user.value.middlename)) {
    errors.push("Отчество должно содержать только русские буквы");
  }

  // Валидации даты рождения
  if (isFormInEditMode.value) {
    if (!user.value.date_birth) {
      errors.push("Дата рождения обязательна для заполнения");
    }
  }

  // Валидация телефона
  if (!user.value.phone) {
    errors.push("Мобильный телефон обязателен для заполнения");
  } else if (!/^\+?\d{10,14}$/.test(user.value.phone)) {
    errors.push("Некорректный формат мобильного телефона");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    const payload = { ...user.value };
    emit("submitData", payload);
  }
}
</script>
<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="input-wrapper">
      <input
        class="form-input"
        type="text"
        id="surname"
        v-model.trim="user.lastname"
        required
      />
      <label for="name">Фамилия</label>
    </div>

    <div class="input-wrapper">
      <input
        class="form-input"
        type="text"
        id="name"
        v-model.trim="user.firstname"
        required
      />
      <label for="name">Имя</label>
    </div>

    <div class="input-wrapper">
      <input
        class="form-input"
        type="text"
        id="midlleName"
        v-model.trim="user.middlename"
        required
      />
      <label for="midlleName">Отчество</label>
    </div>

    <div class="input-wrapper">
      <input
        class="form-input"
        type="date"
        id="birthdate"
        v-model.trim="user.date_birth"
        required
      />
      <label for="midlleName">Дата рождения</label>
    </div>

    <div>
      <label for="gender">Пол:</label>
      <select id="gender" v-model.number="user.male">
        <option value="0">Не выбрано</option>

        <option value="1">Мужской</option>
        <option value="2">Женский</option>
      </select>
    </div>

    <div class="input-wrapper">
      <input
        class="form-input"
        type="tel"
        id="phone"
        v-model.trim="user.phone"
        required
      />
      <label for="email">Мобильный номер</label>
    </div>

    <div class="input-wrapper" v-if="isFormInEditMode">
      <input
        class="form-input"
        type="email"
        id="email"
        v-model.trim="user.email"
        required
      />
      <label for="email">Email</label>
    </div>

    <button v-if="isFormInEditMode" class="btn" type="submit">
      Обновить данные
    </button>
    <button v-else class="btn" type="submit">Добавить данные</button>
  </form>
</template>

<style lang="css" scoped>
.form {
  padding: 20px 35px;
}

.form div {
  margin-bottom: 15px;
}

.form select {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  margin-bottom: 15px;
}

.form-input {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  /* width: 242px; */
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

.input-wrapper .form-input:focus + label,
.input-wrapper .form-input:valid + label {
  top: -20px;
  font-size: 11px;
  color: #82cc6c;
}

label[for="gender"] {
  display: block;
  margin-bottom: 5px;
  font-size: 13px;
  color: #999;
}

#gender {
  width: 100%;
  height: 50px;
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
}

.btn {
  max-width: 250px;
  width: 100%;
  border: 1px solid #82cc6c;
  border-radius: 5px;
  margin-left: auto;
  margin-bottom: 5px;
  display: block;
  color: #098700;
  text-decoration: none;
  line-height: 30px;
  cursor: pointer;
  background: none;
}

.btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}
</style>
