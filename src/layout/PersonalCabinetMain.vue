<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
// import { useOrdersStore } from "@/store/ordersStore";
import PersonalCabinetTitle from "@/views/PersonalCabinetTitle.vue";
import PersonalCabinetTabs from "./PersonalCabinetTabs.vue";

const userStore = useUserStore();
// const ordersStore = useOrdersStore();

onMounted(async () => {
  await userStore.fetchUser();
  // await ordersStore.fetchOrders();
});
</script>
<template>
  <div class="personal-cabinet__main-wrapper">
    <div class="personal-cabinet__content-wrapper">
      <PersonalCabinetTitle />
      <RouterView />
    </div>
    <PersonalCabinetTabs />
  </div>
</template>

<style lang="css" scoped>
.personal-cabinet__main-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
}

.personal-cabinet__content-wrapper {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  background: #fff;
}

/* @media (max-width: 976px) {
  .personal-cabinet__content-wrapper {
    display: flex;
    flex-direction: column;
  }
} */
</style>
