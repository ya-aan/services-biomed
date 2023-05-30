<script setup>
import { useUserStore } from "../store/userStore";
import user from "@/assets/icon-personal-cabinet-profile.png";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

async function logout() {
  userStore.logoutUser();
  router.push("/auth");
}
</script>
<template>
  <div class="personal-cabinet__profile">
    <div class="personal-cabinet__title">
      <div class="personal-cabinet__content">
        <img class="personal-cabinet__content-img" :src="user" alt="user" />
        <span
          v-if="
            !userStore.user?.lastname &&
            !userStore.user?.firstname &&
            !userStore.user?.middlename
          "
          >Профиль не заполнен
        </span>
        <span v-else
          >{{
            `${userStore.user?.lastname} ${userStore.user?.firstname} ${userStore.user?.middlename}`
          }}
        </span>
      </div>
      <span class="personal-cabinet__exit">
        <button @click="logout" class="exit-btn">выйти</button></span
      >
    </div>
  </div>
</template>

<style lang="css" scoped>
.personal-cabinet__profile {
  border-bottom: 1px solid #e8e8e8;
  padding: 15px;
  max-height: 55px;
  height: 55px;
}

.personal-cabinet__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.personal-cabinet__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.personal-cabinet__content-img {
  width: 35px;
  height: 35px;
}

.exit-btn {
  border: none;
  background: none;
  cursor: pointer;
  color: #098700;
  padding: 0;
}

.exit-btn:hover {
  color: #ff5a00;
}
</style>
