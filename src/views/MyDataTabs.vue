<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import Modal from "@/components/ui/Modal.vue";
import FormPersonalData from "@/components/forms/FormPersonalData.vue";

const userStore = useUserStore();
const {
  user,
  formattedBirthDate,
  fullName,
  genderString,
  hasCompletedPersonalData,
} = storeToRefs(userStore); // я вытаскиваю переменные из STORE и делаю ИХ Реактивными

const showModal = ref(false);

const showModalReplace = ref(false);

async function handleFormData(data) {
  userStore.user = data;
  await userStore.patchUser(data);
  showModal.value = false;
}

async function replaceHandleFormData(data) {
  await userStore.patchUser(data);
  showModalReplace.value = false;
}
</script>
<template>
  <div class="content-text">
    <div class="content-caption">
      <span>Персональные данные</span>
      <btn
        class="content-btn"
        @click="showModal = true"
        v-if="!hasCompletedPersonalData"
        >Добавить</btn
      >

      <Modal
        v-if="showModal"
        @close="showModal = false"
        title="Добавление персональных данных"
      >
        <FormPersonalData @submitData="handleFormData" :formData="user" />
      </Modal>
    </div>
    <table class="content-table">
      <tbody>
        <tr>
          <th>ФИО</th>
          <th>Дата рождения</th>
          <th>Пол</th>
          <th>Моб. тел.</th>
          <th>Email</th>
          <th v-if="hasCompletedPersonalData" />
        </tr>

        <tr v-if="hasCompletedPersonalData">
          <td>
            {{ fullName }}
          </td>
          <td>{{ formattedBirthDate }}</td>
          <td>{{ genderString }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>

          <td class="table-cell-btn">
            <button class="content-table__btn" @click="showModalReplace = true">
              Редактировать
            </button>
            <Modal
              v-if="showModalReplace"
              title="Обновление персональных данных"
              @close="showModalReplace = false"
            >
              <FormPersonalData
                @submitData="replaceHandleFormData"
                :formData="user"
                :editAllFields="true"
              />
            </Modal>
          </td>
        </tr>

        <tr v-else>
          <td colspan="5">
            Вы можете добавить свои персональные данные. Это ускорит оформление
            предварительных заказов.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
.content-text {
  padding: 20px;
  overflow: auto;
}
.content-caption {
  position: relative;
  /* display: flex;
  justify-content: space-between; */

  font-size: 16px;
  padding-left: 17px;
  margin-bottom: 25px;
}

.content-btn {
  position: absolute;
  right: 0;
  top: 0;
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
  margin-top: 1px;
}

.content-btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

.content-table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.table-cell-btn {
  text-align: center;
}

.content-table td,
.content-table th {
  border: 1px solid #dddddd;
}
/* .content-table tr {
  text-align: left;
} */
.content-table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.content-table td {
  padding: 5px;
  order: 1px solid #e8e8e8;
  padding: 7px 10px;
  -ms-border-radius: 2px;
  border-radius: 2px;
}

.content-table td {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.content-table__btn {
  border: none;
  background: none;
  color: #098700;
  cursor: pointer;
}

.content-table__btn:hover {
  color: #ff5a00;
}

@media (max-width: 335px) {
  .content-caption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .content-btn {
    position: initial;
  }
}
</style>
