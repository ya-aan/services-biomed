<!-- Здесь будет конвертироваться Дата которая была неправильно отредактирована с API -->

<script setup>
import { computed } from "vue";
import moment from "moment";

const props = defineProps({
  date: "",
});

const formatDate = computed(() => {
  if (!props.date) {
    return "В процессе";
  }
  const date = moment(props.date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  return date.format("DD.MM.YYYY HH:mm");
});
</script>

<template>
  <div>
    {{ formatDate }}
  </div>
</template>

<style lang="css" scoped></style>
