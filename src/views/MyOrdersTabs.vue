<script setup>
import { ref, onMounted } from "vue";
import { useOrdersStore } from "@/store/ordersStore";
import { useModalOrderStore } from "@/store/modalOrderStore";
import { storeToRefs } from "pinia";
import moment from "moment";
import AnalysisStatus from "@/components/ui/AnalysisStatus.vue";
import ModalOrders from "@/components/ui/ModalOrders.vue";
import Modal from "@/components/ui/Modal.vue";
import FormDowlandOrdersResults from "@/components/forms/FormDowlandOrdersResults.vue";

const ordersStore = useOrdersStore();
const modalOrderStore = useModalOrderStore();

const { orders, orderIsNotNullOrEmpty } = storeToRefs(ordersStore);

const showModalDowland = ref(false);

async function handleOrderData(requestNr, birthDate) {
  await ordersStore.addingOrder(requestNr, birthDate);
  showModalDowland.value = false;
}

async function handleDelete(orderId) {
  await ordersStore.deleteOrder(orderId);
}

// Функция для обработки даты и времени
function formatDate(dateStr) {
  const date = moment(dateStr, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  return date.format("DD.MM.YYYY HH:mm");
}

onMounted(async () => {
  await ordersStore.fetchOrders();
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

      <div class="cabinet-order__table">
        <table class="table" v-if="orderIsNotNullOrEmpty">
          <thead class="table-thead">
            <tr class="table-row">
              <th class="table-cell">№ заказа</th>
              <th class="table-cell">Дата оформления</th>
              <th class="table-cell">Статус</th>
              <th class="table-cell">Сумма оплаты</th>
              <th class="table-cell">Срок выполнения</th>
              <th class="table-cell"></th>
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
                  class="table-btn"
                  @click.prevent="modalOrderStore.setOrder(order)"
                >
                  {{ order.request.internalNr }}
                </button>
              </td>
              <td>{{ formatDate(order.request.registrationDate) }}</td>
              <td><AnalysisStatus :is-done="order.request.done" /></td>
              <td>{{ order.request.totalPrice }} ₽</td>
              <td>{{ formatDate(order.request.endDate) }}</td>
              <!-- <td>
                <router-link to="#" class="table-link"> Повторить </router-link>
              </td> -->
              <td>
                <button
                  class="table-btn__delete"
                  @click="handleDelete(order.request.internalNr)"
                >
                  Удалить
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
    </div>
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
  font-size: 16px;
  padding-left: 17px;
  margin-bottom: 25px;
  position: relative;
}

.cabinet-order__btn {
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
  padding: 7px 10px;
  border-radius: 2px;
  margin-top: 5px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.table-btn {
  background: none;
  border: none;
  /* border-bottom: 1px solid #098700; */
  color: #098700;
  cursor: pointer;
}
.table-link {
  cursor: pointer;
  color: #098700;
  padding: 0;
}

.table-link:hover {
  color: #ff5a00;
}

.table-btn:hover {
  color: #ff5a00;
}

.table td,
.table th {
  border: 1px solid #dddddd;
}
.table tr {
  text-align: left;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
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

.table-btn__delete {
  color: #098700;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

.table-btn__delete:hover {
  color: #ff5a00;
}
</style>
