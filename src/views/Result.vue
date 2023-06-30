<script setup>
import { ref } from "vue";
import { useModalResultStore } from "@/store/modalResultStore";
import { useResultStore } from "@/store/resultStore";
import ResultModal from "@/components/ui/ResultModal.vue";

const resultStore = useResultStore();
const modalResultStore = useModalResultStore();

const applicationNumber = ref("");
const birthDate = ref("");

async function getResult() {
  await resultStore.fetchResult(applicationNumber.value, birthDate.value);
}
</script>
<template>
  <div class="container">
    <div class="result">
      <div class="result-wrapper">
        <div class="result-body">
          <h2 class="result-title">Результаты анализов</h2>
          <form @submit.prevent="getResult" class="form">
            <label class="label" for="applicationNumber">Номер заявки</label>
            <input
              class="input"
              type="number"
              v-model.trim="applicationNumber"
              required
            />

            <label class="label" for="birthDate">Дата рождения</label>
            <input class="input" type="date" v-model="birthDate" required />

            <button class="btn-result" type="submit">
              Показать результаты
            </button>
          </form>

          <ResultModal
            v-if="modalResultStore.showModal"
            @close="modalResultStore.showModal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.result {
  display: flex;
  justify-content: center;
}

.result-wrapper {
  background-color: #fff;
  width: 50%;
  border-radius: 20px;
}

.result-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 15px;
}

.btn-result {
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
  margin-bottom: 5px;
}

.btn-result:hover {
  color: #fff;
  background: #82cc6c;
  border-color: #82cc6c;
}

@media (max-width: 900px) {
  .result-wrapper {
    width: 100%;
    border-radius: 0;
  }
}

@media (max-width: 450px) {
  .form {
    width: 100%;
  }

  .result-title {
    font-size: 1rem;
  }
}
</style>
