<script setup>
import { computed } from "vue";
import ready from "@/assets/ready.png";
import atWork from "@/assets/at-work.png";
const props = defineProps({
  isDone: { type: Boolean },
});

const statusImg = computed(() => {
  return props.isDone ? ready : atWork;
});

const statusText = computed(() => {
  return props.isDone ? "Готово" : "В работе";
});
</script>
<template>
  <span class="done">
    <img :src="statusImg" alt="img" />
    {{ statusText }}
  </span>
</template>

<style lang="css" scoped>
.done {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5px;
}
</style>
