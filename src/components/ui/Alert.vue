<script setup>
import { computed } from "vue";
import alertError from "@/assets/alert-error.png";

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  message: {
    type: String,
  },
});

const emit = defineEmits(["close"]);

const classes = computed(() => {
  return {
    "alert-info": props.type === "info",
    "alert-success": props.type === "success",
    "alert-warning": props.type === "warning",
    "alert-danger": props.type === "danger",
  };
});
</script>
<template>
  <div class="alert" :class="classes" role="alert">
    <div v-if="classes['alert-danger']">
      <img :src="alertError" alt="Alert" />
    </div>
    <div class="alert-text">
      {{ message }}
    </div>
    <div>
      <span class="close" @click="$emit('close')">&times;</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  max-width: 500px;
  margin: 0 auto;
  /* display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 50%; */
}

.alert-text {
  margin-bottom: 10px;
  text-align: center;
}

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

.alert-info {
  color: #0dcaf0;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}

.alert-success {
  color: #198754;
  background-color: #d4edda;
  border-color: #c3e6cb;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 10%; */
  /* height: 10.33%; */
  width: 33.33%;
}

.alert-warning {
  color: #ffc107;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert-danger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  color: #dc3545;
  background-color: #ffffff;
  border-color: #f5c2c7;
  width: 100%;

  border-radius: 6px;
}

@media (max-width: 667px) {
  .alert-success {
    width: auto;
  }
}

@media (max-width: 450px) {
  .alert-success {
    width: 100%;
  }
  /* .alert-danger {
    width: 80%;
  } */
}
</style>
