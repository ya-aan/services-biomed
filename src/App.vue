<script setup>
import { useToastStore } from "./store/toastStore";
import Navigations from "./components/Navigations.vue";
import Alert from "./components/ui/Alert.vue";

const toastStore = useToastStore();
</script>
<template>
  <Navigations />
  <div class="container">
    <Alert
      v-for="(notification, index) in toastStore.allNotification"
      :key="'notification' + index"
      :message="notification.message"
      :type="notification.type"
      @close="toastStore.deleteNotification(index)"
    >
    </Alert>

    <RouterView />
  </div>
</template>

<style lang="css" scoped></style>
