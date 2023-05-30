<script setup>
import { useModalResultStore } from "@/store/modalResultStore";
import { useResultStore } from "../../store/resultStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const modalResultStore = useModalResultStore();
const resultStore = useResultStore();

const { works } = storeToRefs(modalResultStore);
const { result } = storeToRefs(resultStore);

const emit = defineEmits(["close"]);

const fullAge = computed(() => {
  const birthDate = new Date(
    result.value.request.birthYear,
    result.value.request.birthMonth - 1,
    result.value.request.birthDay
  );

  const ageInMs = Date.now() - birthDate.getTime();
  const ageInYears = new Date(ageInMs).getFullYear() - 1970;
  return ageInYears;
});

const genderString = computed(() => {
  const genderValue = Number(result.value.request.sex);
  let str = "";
  switch (genderValue) {
    case 1:
      str = "Мужской";
      break;
    case 2:
      str = "Женский";
      break;
    default:
    case 0:
      str = "Не указан";
      break;
  }
  return str;
});
</script>

<template>
  <div>
    <div class="modal">
      <div class="modal-content" :style="{ width: '952px', height: '592px' }">
        <div class="modal-content__header">
          <span class="close" @click="$emit('close')">&times;</span>
          <h4>Результаты анализов</h4>
        </div>

        <div class="modal-wrapper__result">
          <div class="modal-body__result">
            <div
              class="body-result"
              style="display: grid; grid-template-columns: 1fr 1fr"
            >
              <div>
                <p>
                  Заказ №:
                  <span class="ant-modal__personal-info">{{
                    result.request.internalNr
                  }}</span>
                </p>
                <p>
                  Место взятия биоматериала:
                  <span class="ant-modal__personal-info">{{
                    result.request.hospitalName
                  }}</span>
                </p>
                <p>
                  Договор №:
                  <span class="ant-modal__personal-info">-</span>
                </p>
              </div>
              <div>
                <p>
                  ФИО:
                  <span class="ant-modal__personal-info">{{
                    `${result.request.lastName} ${result.request.firstName} ${result.request.middleName}`
                  }}</span>
                </p>
                <p>
                  Пол:
                  <span class="ant-modal__personal-info">{{
                    genderString
                  }}</span>
                </p>
                <p>
                  Возраст:
                  <span class="ant-modal__personal-info">{{ fullAge }}</span>
                </p>
              </div>
            </div>

            <div class="ant-row">
              <div class="ant-col">
                <button class="ant-btn">
                  <a
                    :href="result.path_to_pdf_result"
                    download="official_blank.pdf"
                    class="ant-href"
                    >Официальный бланк</a
                  >
                </button>
              </div>
            </div>

            <div class="modal-table__result">
              <table class="table-body">
                <thead>
                  <tr>
                    <th>Название и показатель</th>
                    <th>Мой результат</th>
                    <th>Референсные значения</th>
                  </tr>
                </thead>
                <tbody class="ant-table-tbody">
                  <tr class="ant-table-row" v-for="work in works">
                    <td class="ant-table-cell">
                      <div class="table__title">
                        {{ work.name }}
                      </div>
                      <div class="table__name">Результат</div>
                    </td>
                    <td class="ant-table-cell">
                      <div class="table__text">
                        {{ work.value }}
                      </div>

                      <div class="table__text">
                        {{ work.normsComment }}
                      </div>
                    </td>
                    <td class="ant-table-cell">
                      <div class="table__comment">{{ work.norms }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
  padding: 0px 20px;
  border: 1px solid #e8e8e8;
  width: 30%;
  overflow: auto;
}

.modal-content__header {
  position: sticky;
  top: 0;
  background-color: #fefefe;
  z-index: 1;
  font-weight: bold;
  color: #3a3a3a;
  padding-top: 10px;
}

.body-result {
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin-bottom: 10px;
}

.ant-modal__personal-info {
  font-weight: 700;
}

.ant-row {
  margin-bottom: 15px;
}

.ant-btn {
  border: none;
  background: none;
}

.ant-href {
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  color: #098700;
  padding: 0;
}

.ant-href:hover {
  color: #ff5a00;
}

/* Таблица */

.table-body {
  width: 100%;
  table-layout: fixed;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.table-body thead {
  width: 100%;
}

.table-body th,
td {
  padding: 20px;
  border: 1px solid #dddddd;
}

.table-body tr {
  text-align: left;
}

thead th:nth-child(1) {
  width: 30%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 35%;
}

.table__title {
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 2px;
}

.table__name {
  font-size: 11px;
  color: #656565;
  margin-left: 10px;
  padding-right: 70px;
}

.table__text {
  font-size: 11px;
}

.table__comment {
  font-size: 11px;
}

/* Крестик */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
