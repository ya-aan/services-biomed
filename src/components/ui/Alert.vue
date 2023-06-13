<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
});

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
    <h5>
      <slot></slot>
    </h5>
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
}

.alert-warning {
  color: #ffc107;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert-danger {
  color: #dc3545;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}
</style>
