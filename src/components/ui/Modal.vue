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
  display: block;
  /* justify-content: center;
  align-items: center; */
}

.modal-content {
  /* background-color: #fefefe;
  border: 1px solid #888;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative; */

  background-color: #fefefe;
  margin: 15% auto;
  padding: 0px 20px;
  border: 1px solid #e8e8e8;
  width: 30%;
  border-radius: 5px;
}

.modal-content__header {
  /* background-color: #f1f1f1; */
  color: #333;
  /* font-size: 18px; */
  font-weight: bold;
  padding: 10px;
  position: relative;
}

.modal-content__body {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 22px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 767px) {
  .modal-content {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
  }
}
</style>
