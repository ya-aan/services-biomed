<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useModalOrderStore } from "@/store/modalOrderStore";

const orderModalStore = useModalOrderStore();

const { order, works } = storeToRefs(orderModalStore);

const emit = defineEmits(["close"]);

const fullAge = computed(() => {
  const birthDate = new Date(
    order.value.request.birthYear,
    order.value.request.birthMonth - 1,
    order.value.request.birthDay
  );

  const ageInMs = Date.now() - birthDate.getTime();
  const ageInYears = new Date(ageInMs).getFullYear() - 1970;
  return ageInYears;
});

const genderString = computed(() => {
  const genderValue = Number(order.value.request.sex);
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
      <div class="modal-content">
        <div class="modal-content__header">
          <span class="close" @click="$emit('close')">&times;</span>
          <h4>Результаты анализов</h4>
        </div>

        <div class="modal-wrapper__orders">
          <div class="modal-body__orders">
            <div
              class="body-orders"
              style="display: grid; grid-template-columns: 1fr 1fr"
            >
              <div>
                <p>
                  Заказ №:
                  <span class="ant-modal__personal-info">{{
                    order.request.internalNr
                  }}</span>
                </p>
                <p>
                  Место взятия биоматериала:
                  <span class="ant-modal__personal-info">{{
                    order.request.hospitalName
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
                    `${order.request.lastName} ${order.request.firstName} ${order.request.middleName}`
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
                <a
                  :href="order.path_to_pdf_result"
                  target="_blank"
                  class="ant-href"
                  >Официальный бланк</a
                >
              </div>
            </div>

            <div class="modal-table__orders table-dekstop">
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

            <!-- //////////////////////////////////////////////// -->

            <div class="modal-table__orders grid-table-mobile">
              <div class="table-body grid-mobile">
                <div class="ant-table-tbody div-tbody">
                  <div class="ant-table-row div-row" v-for="work in works">
                    <div class="ant-table-cell wrapper-flex">
                      <span class="span-text">Название и <br />показатель</span>
                      <span class="table__title span-text__result">
                        {{ work.name }}
                      </span>
                    </div>

                    <div class="ant-table-cell wrapper-flex">
                      <span class="span-text">Мой результат</span>
                      <span class="table__text table-text-mobile">
                        {{ work.value }}
                      </span>

                      <div class="table__text table-text-mobile">
                        {{ work.normsComment }}
                      </div>
                    </div>

                    <div class="ant-table-cell wrapper-flex">
                      <span class="span-text">Референсные значения</span>
                      <div class="table__comment table-text-mobile">
                        {{ work.norms }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- //////////////////////////////////////////// -->
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
  width: 60%;

  max-height: 50%;
  overflow-y: auto;
  overflow: auto;
}

.modal-content__header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fefefe;

  /*  */
  font-weight: bold;
  color: #3a3a3a;
  padding-top: 10px;
}

.body-orders {
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
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  /*  */
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

/* /////////////////////////////////////////////////////////////////// */

.grid-mobile {
  border: none;
  display: none;
}

.div-tbody {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.div-row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  border: 1px solid #d3d7dd;
  padding: 15px;
}

.wrapper-flex {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid #d3d7dd;
  padding: 5px;
  /* justify-content: center; */
  /* align-items: center; */
}

.span-text__result {
  text-align: center;
  margin: 0 auto;
  align-items: center;
  display: flex;
}

.table-text-mobile {
  font-weight: 900;
}

.span-text {
  border: 1px solid #d3d7dd;
  padding: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #919191;
}

@media (max-width: 976px) {
  .modal-content {
    width: 100%;
    /* height: 90%; */
  }

  .table-dekstop {
    display: none;
  }

  .grid-mobile {
    display: block;
  }
}

@media (max-width: 796px) {
  .div-tbody {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 651px) {
  .div-tbody {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .modal-content {
    width: 90%;
    /* height: 90%; */
  }
}
</style>
