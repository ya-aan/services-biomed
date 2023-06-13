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
          <h1>Результаты анализов</h1>
          <form @submit.prevent="getResult" class="form">
            <div class="input-wrapper">
              <input
                class="result-input"
                type="number"
                v-model="applicationNumber"
                required
              />
              <label for="applicationNumber">Номер заявки</label>
            </div>

            <div class="input-wrapper">
              <input
                class="result-input"
                type="date"
                v-model="birthDate"
                required
              />
              <label for="birthDate">Дата рождения</label>
            </div>

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

.result-input {
  padding: 7px 9px;
  border: 1px solid #e8e8e8;
  -ms-border-radius: 5px;
  border-radius: 5px;
  color: #333;
  font: 13px Tahoma, Arial, sans-serif;
  width: 100%;
  height: 50px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

.input-wrapper .result-input:focus + label,
.input-wrapper .result-input:valid + label {
  top: -20px;
  font-size: 11px;
  color: #82cc6c;
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
</style>
