<script setup>
import { ref } from "vue";

const emit = defineEmits(["close", "formData"]);
const props = defineProps({
  editUser: { type: Object },
});

const user = ref({ ...props.editUser });

// const selectedMonth = ref("");
// const selectedDay = ref("");
// const selectedYear = ref("");

// const name = ref("");
// const surname = ref("");
// const middleName = ref("");
// // const birthDate = ref("");
// const gender = ref("Мужской");
// const phone = ref("");
// const email = ref("");

// const days = ref([]);
// const years = ref([]);
// const months = [
//   "Январь",
//   "Февраль",
//   "Март",
//   "Апрель",
//   "Май",
//   "Июнь",
//   "Июль",
//   "Август",
//   "Сентябрь",
//   "Октябрь",
//   "Ноябрь",
//   "Декабрь",
// ];

// Следим за изменением выбранного месяца и обновляем список дней
// watch(selectedMonth, () => {
//   updateDays();
// });

// Функция для обновления списка дней в зависимости от выбранного месяца и года
// function updateDays() {
//   const daysInMonth = new Date(
//     selectedYear.value,
//     selectedMonth.value,
//     0
//   ).getDate();
//   days.value = Array.from({ length: daysInMonth }, (_, i) => i + 1);
// }

// Функция для обновления списка лет
// function updateYears() {
//   const currentYear = new Date().getFullYear();
//   years.value = Array.from({ length: 100 }, (_, i) => currentYear - i);
// }

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

  // Валидация даты рождения
  // if (!selectedMonth.value || !selectedDay.value || !selectedYear.value) {
  //   errors.push("Дата рождения обязательна для заполнения");
  // }

  // Валидация телефона
  if (!user.value.phone) {
    errors.push("Мобильный телефон обязателен для заполнения");
  } else if (!/^\+?\d{10,14}$/.test(user.value.phone)) {
    errors.push("Некорректный формат мобильного телефона");
  }

  // Валидация email
  // if (!email.value) {
  //   errors.push("Email обязателен для заполнения");
  // } else if (
  //   !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
  // ) {
  //   errors.push("Некорректный формат email");
  // }

  if (errors.length > 0) {
    alert(errors.join("\n"));
  } else {
    // const formData = {
    //   name: user.firstname.value,
    //   surname: surname.value,
    //   middleName: middleName.value,
    //   gender: gender.value,
    //   phone: phone.value,
    // };

    // birthDate: `${selectedDay.value}, ${selectedMonth.value}, ${selectedYear.value}`,
    // email: email.value,

    // userStore.allUsers.push(formData);
    // userStore.allUsers = formData;
    // console.log(userStore.allUsers);
    emit("formData", user);
    emit("close");
  }
}

// При монтировании компонента обновляем список дней и лет
// onMounted(() => {
//   updateDays();
//   updateYears();
// });
</script>

<template>
  <div>
    <div class="modal">
      <div class="modal-content" style="margin: 130px auto 0px; display: block">
        <div class="modal-content__header">
          <span class="close" @click="$emit('close')">&times;</span>
          <h2>Добавление персональных данных</h2>
        </div>
        <form class="modal-content__form" @submit.prevent="onSubmit">
          <div>
            <label for="surname">Фамилия:</label>
            <input type="text" id="surname" v-model="user.lastname" />
          </div>

          <div>
            <label for="name">Имя:</label>
            <input type="text" id="name" v-model="user.firstname" />
          </div>

          <div>
            <label for="middleName">Отечество:</label>
            <input type="text" id="middleName" v-model="user.middlename" />
          </div>

          <div>
            <label for="gender">Пол:</label>
            <select id="gender" v-model.number="user.male">
              <option value="0">Не выбрано</option>

              <option value="1">Мужской</option>
              <option value="2">Женский</option>
            </select>
          </div>
          <div>
            <label for="phone">Мобильный телефон:</label>
            <input type="tel" id="phone" v-model="user.phone" />
          </div>

          <button class="modal-content__btn" type="submit">
            Добавить данные
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 5px;
  border: 1px solid #e8e8e8;
  width: 30%;
  overflow: auto;
}

.modal-content__header {
  font-weight: bold;
  color: #3a3a3a;
  padding-top: 10px;
  padding-left: 20px;
}
.modal-content__form {
  padding: 20px;
}

.modal-content__form label {
  display: inherit;
}

.modal-content__form select {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  margin-top: 1px;
}

.modal-content__form input {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  margin-top: 1px;
  width: 242px;
}

.modal-content__btn {
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

.modal-content__btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

<!-- <div>
            <label for="birthDate">Дата рождения:</label>
            <select
              id="birthDate"
              v-model="selectedMonth"
              style="margin-right: 5px"
            >
              <option value="">Месяц</option>
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
              >
                {{ month }}
              </option>
            </select>
            <select
              v-if="selectedMonth"
              v-model="selectedDay"
              style="margin-right: 5px"
            >
              <option value="">День</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
            <select v-if="selectedDay" v-model="selectedYear">
              <option value="">Год</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div> -->
