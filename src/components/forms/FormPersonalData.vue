<script setup>
import { ref, computed } from "vue";
import { useToastStore } from "@/store/toastStore";

const toastStore = useToastStore();

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
  // if (!user.value.middlename) {
  //   errors.push("Отчество обязательно для заполнения");
  // } else if (!/^[а-яА-ЯёЁ]+$/.test(user.value.middlename)) {
  //   errors.push("Отчество должно содержать только русские буквы");
  // }

  // Валидации даты рождения
  // if (isFormInEditMode.value) {
  //   if (!user.value.date_birth) {
  //     errors.push("Дата рождения обязательна для заполнения");
  //   }
  // }

  // Валидация телефона
  if (!user.value.phone) {
    errors.push("Мобильный телефон обязателен для заполнения");
  } else if (!/^\+?\d{10,14}$/.test(user.value.phone)) {
    errors.push("Некорректный формат мобильного телефона");
  }

  if (errors.length > 0) {
    toastStore.setErrorNotification(errors.join("\n"));
  } else {
    const payload = { ...user.value };
    emit("submitData", payload);
  }
}
</script>
<template>
  <form class="form" @submit.prevent="onSubmit">
    <label class="label" for="surname">Фамилия</label>
    <input
      class="input"
      type="text"
      id="surname"
      v-model.trim="user.lastname"
      required
    />

    <label class="label" for="name">Имя</label>
    <input
      class="input"
      type="text"
      id="name"
      v-model.trim="user.firstname"
      required
    />

    <label class="label" for="midlleName">Отчество</label>
    <input
      class="input"
      type="text"
      id="midlleName"
      v-model.trim="user.middlename"
      required
    />

    <label class="label" for="date-birth">Дата рождения</label>
    <input
      class="input"
      type="date"
      id="birthdate"
      v-model="user.date_birth"
      required
    />

    <div>
      <label class="label" for="gender">Пол:</label>
      <select id="gender" v-model.number="user.male">
        <option value="0">Не выбрано</option>

        <option value="1">Мужской</option>
        <option value="2">Женский</option>
      </select>
    </div>

    <label class="label" for="phone">Мобильный номер</label>
    <input class="input" type="tel" v-model.trim="user.phone" required />

    <button v-if="isFormInEditMode" class="btn" type="submit">
      Обновить данные
    </button>
    <button v-else class="btn" type="submit">Добавить данные</button>
  </form>
</template>

<style lang="css" scoped>
.form {
  padding: 20px 35px;
  text-align: left;
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

@media (max-width: 400px) {
  .form {
    padding: 0;
  }
}
</style>
