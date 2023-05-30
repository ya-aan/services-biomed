<script setup>
import { computed } from "vue";
const props = defineProps({
  isDone: { type: Boolean },
});

const statusText = computed(() => {
  return props.isDone ? "Готово" : "В ожидание";
});
</script>
<template>
  <span>
    {{ statusText }}
  </span>
</template>

<style lang="css" scoped></style>
