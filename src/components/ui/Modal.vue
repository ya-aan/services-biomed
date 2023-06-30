<script setup>
const emit = defineEmits(["close"]);
const props = defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
});
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content__header">
        <span class="close" @click="$emit('close')">&times;</span>
        <div>{{ title }}</div>
      </div>
      <div class="modal-content__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 0px 20px;
  border: 1px solid #e8e8e8;
  width: 80%;
  max-width: 500px;
  border-radius: 5px;
  max-height: 80%;
  overflow-y: auto;
}

.modal-content__header {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  position: relative;
}

.modal-content__body {
  padding: 10px;
}

.close {
  color: #aaa;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* adaptiv */

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    margin: 10% auto;
    max-height: 80%;
    overflow-y: auto;
  }
}

@media (max-width: 576px) {
  .modal-content {
    width: 90%;
    margin: 20% auto;
  }
}
</style>
