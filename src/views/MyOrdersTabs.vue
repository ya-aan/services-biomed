<script setup>
import { ref, onMounted } from "vue";
import { useOrdersStore } from "@/store/ordersStore";
import { useModalOrderStore } from "@/store/modalOrderStore";
import { storeToRefs } from "pinia";
import AnalysisStatus from "@/components/ui/AnalysisStatus.vue";
import ModalOrders from "@/components/ui/ModalOrders.vue";
import Modal from "@/components/ui/Modal.vue";
import FormDowlandOrdersResults from "@/components/forms/FormDowlandOrdersResults.vue";
import DateConverter from "@/components/DateConverter.vue";
import deletePng from "@/assets/delete.png";
import printerPng from "@/assets/printer.png";

const ordersStore = useOrdersStore();
const modalOrderStore = useModalOrderStore();

const { orders, orderIsNotNullOrEmpty, pagesCount } = storeToRefs(ordersStore);

const showModalDowland = ref(false);

async function handleOrderData(requestNr, birthDate) {
  await ordersStore.addingOrder(requestNr, birthDate);
  showModalDowland.value = false;
}

async function handleDelete(orderId) {
  await ordersStore.deleteOrder(orderId);
}

// async function handleLoadMore() {
//   const nextPage = this.currentPage + 1;
//   await ordersStore.fetchOrders(nextPage);
// }

const getSort = (event) => {
  const target = event.target;
  const order = (target.dataset.order = -(target.dataset.order || -1));
  const index = [...target.parentNode.cells].indexOf(target);
  const collator = new Intl.Collator(["en", "ru"], { numeric: true });
  const comparator = (index, order) => (a, b) =>
    order *
    collator.compare(a.children[index].innerHTML, b.children[index].innerHTML);

  for (const tBody of target.closest("table").tBodies) {
    const rows = [...tBody.rows];
    const excludeIndex = [...target.parentNode.cells].indexOf(
      target.parentNode.querySelector(".exclude-sort")
    );
    const sortedRows =
      excludeIndex >= 0
        ? rows.filter(
            (row) => !row.cells[excludeIndex].classList.contains("exclude-sort")
          )
        : rows;
    tBody.append(...sortedRows.sort(comparator(index, order)));
  }

  for (const cell of target.parentNode.cells)
    cell.classList.toggle("sorted", cell === target);
};

onMounted(async () => {
  await ordersStore.fetchOrders();
  document
    .querySelectorAll(".table_sort thead")
    .forEach((tableTH) => tableTH.addEventListener("click", getSort));
});
</script>
<template>
  <div class="cabinet-order">
    <div class="cabinet-order__pre-orders">
      <div class="cabinet-order__title">Предварительные заказы</div>
      <a
        class="cabinet-order__btn"
        href="https://azbykamed.ru/analizy-i-tseny/"
        target="_blank"
      >
        Сделать предварительный заказ
      </a>
      <div class="cabinet-order__pre-order-list">
        Активных предварительных заказов нет.
      </div>
    </div>

    <div class="cabinet-order__pre-orders">
      <div class="cabinet-order__title">Оформленные заказы</div>
      <button class="cabinet-order__btn" @click="showModalDowland = true">
        Загрузить результаты заказа
      </button>
      <Modal
        v-if="showModalDowland"
        title="Добавление данных заказа в архив"
        @close="showModalDowland = false"
      >
        <FormDowlandOrdersResults @submit="handleOrderData" />
      </Modal>

      <span class="text-filter"
        >Вы можете отфильтровать заказы кликнуть на "первые загаловки"</span
      >

      <div class="cabinet-order__table table-dekstop">
        <table class="table table_sort" v-if="orderIsNotNullOrEmpty">
          <thead class="table-thead">
            <tr class="table-row table-thead__tr">
              <th class="table-cell sorted" data-order="1">№ заказа</th>
              <th class="table-cell">Дата оформления</th>
              <th class="table-cell">Статус</th>
              <th class="table-cell">Сумма оплаты</th>
              <th class="table-cell">Срок выполнения</th>
              <th class="table-cell no-sort"></th>
              <th class="table-cell no-sort"></th>
              <th class="table-cell no-sort"></th>
            </tr>
          </thead>

          <tbody class="table-tbody">
            <tr
              class="table-row"
              v-for="order in orders"
              :key="order.request.id"
            >
              <td>
                <button
                  class="table-btn internalNr-text"
                  @click.prevent="modalOrderStore.setOrder(order)"
                >
                  {{ order.request.internalNr }}
                </button>
              </td>

              <td>
                <DateConverter :date="order.request.registrationDate" />
              </td>
              <td>
                <AnalysisStatus :is-done="order.request.done" />
              </td>
              <td>{{ order.request.totalPrice }} ₽</td>
              <td><DateConverter :date="order.request.endDate" /></td>

              <td>
                <router-link to="#" class="link-disabled" disabled>
                  Повторить
                </router-link>
              </td>

              <td class="exclude-sort">
                <div class="ant-col">
                  <a
                    :href="order.path_to_pdf_result"
                    target="_blank"
                    class="ant-href"
                  >
                    <img :src="printerPng" alt="printer" />
                  </a>
                </div>
              </td>
              <td class="exclude-sort">
                <button
                  class="table-btn__delete"
                  @click="handleDelete(order.request.internalNr)"
                >
                  <img :src="deletePng" alt="delete" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <ModalOrders
          v-if="modalOrderStore.showModal"
          @close="modalOrderStore.showModal = false"
        />

        <div
          class="cabinet-order__pre-order-list"
          v-if="!orderIsNotNullOrEmpty"
        >
          Добавив заказ в архив, вы сможете отслеживать статус его выполнения, а
          также получать результаты в любое удобное время. Для добавления заказа
          в архив необходимо создать профиль (ФИО, пол, дата рождения) пациента,
          на которого оформлялся заказ, сделать это можно в разделе "Мои
          данные".
        </div>
      </div>

      <!-- //////////////////////////////////////////////////////////////////////////////////////// -->

      <div class="cabinet-order__table table_sort grid-table-mobile">
        <table
          class="wrapper-card table table_sort"
          v-if="orderIsNotNullOrEmpty"
        >
          <thead class="div-thead">
            <tr class="mobile-tr">
              <span class="span-text sort-text">Сортировать</span>

              <th class="table-cell-mobile sorted" data-order="1">
                Номер заказа
              </th>
            </tr>
          </thead>

          <tbody class="div-tbody tbody">
            <tr class="div-row" v-for="order in orders" :key="order.request.id">
              <td>
                <div class="wrapper-flex">
                  <div>
                    <button
                      class="table-btn btn-mobile"
                      @click.prevent="modalOrderStore.setOrder(order)"
                    >
                      {{ order.request.internalNr }}
                    </button>
                  </div>

                  <span class="text-request">
                    <AnalysisStatus :is-done="order.request.done" />
                  </span>
                </div>
              </td>

              <td>
                <div class="wrapper-flex">
                  <span class="span-text">Оформление</span>
                  <span class="text-request">
                    <DateConverter :date="order.request.registrationDate" />
                  </span>
                </div>
              </td>

              <td>
                <div class="wrapper-flex">
                  <span class="span-text">Готовность</span>
                  <span class="text-request">
                    <DateConverter :date="order.request.endDate" />
                  </span>
                </div>
              </td>

              <td>
                <div class="wrapper-flex">
                  <span class="span-text">Сумма</span>
                  <span class="text-request">
                    {{ order.request.totalPrice }} ₽
                  </span>
                </div>
              </td>

              <div class="wrapper-flex">
                <div class="wrapper-link">
                  <router-link to="#" class="table-link link-disabled" disabled>
                    Повторить
                  </router-link>
                </div>

                <div class="exclude-sort">
                  <a :href="order.path_to_pdf_result" target="_blank">
                    <img :src="printerPng" alt="printer" />
                  </a>
                </div>
                <div class="exclude-sort">
                  <button
                    class="table-btn__delete"
                    @click="handleDelete(order.request.internalNr)"
                  >
                    <img :src="deletePng" alt="delete" />
                  </button>
                </div>
              </div>
            </tr>
          </tbody>
        </table>

        <ModalOrders
          v-if="modalOrderStore.showModal"
          @close="modalOrderStore.showModal = false"
        />

        <div
          class="cabinet-order__pre-order-list"
          v-if="!orderIsNotNullOrEmpty"
        >
          Добавив заказ в архив, вы сможете отслеживать статус его выполнения, а
          также получать результаты в любое удобное время. Для добавления заказа
          в архив необходимо создать профиль (ФИО, пол, дата рождения) пациента,
          на которого оформлялся заказ, сделать это можно в разделе "Мои
          данные".
        </div>
      </div>
    </div>
    <button
      v-if="pagesCount"
      class="dowland-orders__btn"
      @click="ordersStore.fetchOrders()"
    >
      Загрузить ещё
    </button>
  </div>
</template>

<style lang="css" scoped>
.cabinet-order {
  padding: 20px;
}

.cabinet-order__pre-orders:not(:first-child) {
  margin-top: 25px;
}
.cabinet-order__title {
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  padding-left: 17px;
  margin-bottom: 20px;
  position: relative;
}

.grid-table-mobile {
  display: none;
}

.cabinet-order__btn {
  max-width: 250px;
  width: 100%;
  border: 1px solid #82cc6c;
  border-radius: 5px;
  margin-left: auto;
  margin-bottom: 10px;
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

.cabinet-order__btn:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

.cabinet-order__pre-order-list {
  border: 1px solid #e8e8e8;
  /* padding: 7px 30px; */
  padding: 9px 20px;
  border-radius: 2px;
  margin-top: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #919191;
}

.text-filter {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  /* border: 1px solid #dddddd;
  border-collapse: collapse; */
}

.table-thead {
  width: 170px;
  height: 55px;
}
th,
td {
  vertical-align: middle;
}

.table_sort th {
  cursor: pointer;
}

.table-cell.sorted[data-order="1"],
.table-cell.sorted[data-order="-1"] {
  position: relative;
}

.table-cell.sorted[data-order="1"]::after,
.table-cell.sorted[data-order="-1"]::after {
  right: 8px;
  position: absolute;
}

.table-cell.sorted[data-order="1"]::after {
  content: url("../assets/down-arrow.png");
  transform: rotate(180deg);
}

.table-cell.sorted[data-order="-1"]::after {
  content: url("../assets/down-arrow.png");
}

.table-cell.sorted[data-order="1"]::after {
  content: url("../assets/down-arrow.png");
}

th.no-sort {
  cursor: default;
}

th.no-sort::after {
  display: none;
}

/*  */

.table-btn {
  background: none;
  border: none;
  color: #61bf1a;
  cursor: pointer;
  font-family: "Gilroy";
  font-weight: 500;
}

.btn-mobile {
  font-size: 16px;
}

.btn-mobile::before {
  content: "№";
  color: #919191;
  margin-right: 5px;
}

.internalNr-text {
  font-size: 14px;
}
.table-link {
  cursor: pointer;
  color: #61bf1a;
  padding: 0;
}

.table-link:hover {
  color: #ff5a00;
}

.table-btn:hover {
  color: #ff5a00;
}

.table td,
.table-cell {
  border: 1px solid #d3d7dd;
}

.table tr {
  text-align: center;
}
.table-cell {
  font-weight: bold;
  padding: 5px;
  background: #f9fafb;
  border: 1px solid #d3d7dd;
}
.table td {
  padding: 5px;
  order: 1px solid #e8e8e8;
  padding: 7px 10px;
  -ms-border-radius: 2px;
  border-radius: 2px;
}

.table td {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.exclude-sort {
  border: 1px solid #d3d7dd;
  padding: 10px 15px;
}

.table-btn__delete {
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

.dowland-orders__btn {
  display: block;
  margin: 0 auto;
  width: 155px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #61bf1a;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
  border-radius: 5px;
  color: #61bf1a;
  cursor: pointer;
}

/* ///////////////////////////////////////////////////////////////// */

.div-tbody {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}

.div-row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  border: 1px solid #d3d7dd;
  /* padding: 15px; */
}

.mobile-tr {
  display: inline;
  display: flex;
  align-items: center;
}

.table-cell-mobile {
  border: none;
}

.table-cell-mobile.sorted[data-order="1"],
.table-cell-mobile.sorted[data-order="-1"] {
  position: relative;
}

.table-cell-mobile.sorted[data-order="1"]::after,
.table-cell-mobile.sorted[data-order="-1"]::after {
  position: absolute;
}

.table-cell-mobile.sorted[data-order="1"]::after {
  content: url("../assets/down-arrow.png");
  transform: rotate(180deg);
}

.table-cell-mobile.sorted[data-order="-1"]::after {
  content: url("../assets/down-arrow.png");
}

.table-cell-mobile.sorted[data-order="1"]::after {
  content: url("../assets/down-arrow.png");
}

.wrapper-flex {
  display: flex;
  justify-content: space-between;
}

.wrapper-link {
  border: 1px solid #d3d7dd;
  width: 100%;
  display: flex;
  align-items: center;
}

.link-disabled {
  margin: 0 auto;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
  text-decoration: none;
  color: #61bf1a;
}

.sort-text {
  margin-right: 5px;
}

.span-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #919191;
}

.text-request {
  font-size: 16px;
}

/* ///////////////////////////////////////////////////////////////// */

@media (max-width: 976px) {
  .table-dekstop {
    display: none;
  }

  .grid-table-mobile {
    display: block;
  }

  .wrapper-card td,
  .table-cell {
    border: none;
  }

  .text-filter {
    display: none;
  }
}

@media (max-width: 796px) {
  .div-tbody {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 550px) {
  .cabinet-order__btn {
    max-width: 100%;
  }
}

@media (max-width: 524px) {
  .div-tbody {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
