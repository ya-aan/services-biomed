<script setup>
import { useUserStore } from "@/store/userStore";
import user from "@/assets/icon-personal-cabinet-profile.png";
import logoutPng from "@/assets/logout.png";
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
        <div class="wrapper-content">
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

          <span class="personal-cabinet__login">
            {{ userStore.user?.email }}
          </span>
        </div>
      </div>

      <div class="wrapper-exit">
        <img class="personal-cabinet-exit" :src="logoutPng" alt="logout" />
        <button @click="logout" class="exit-btn">выйти</button>
      </div>
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
  margin-right: 20px;
  width: 20px;
  height: 20px;
}

.personal-cabinet__text {
  font-weight: 500;
}

.wrapper-exit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.personal-cabinet__login {
  margin-left: 5px;
  color: #141618;
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

@media (max-width: 582px) {
  .wrapper-content {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 330px) {
  .personal-cabinet__content-img {
    display: none;
  }

  .personal-cabinet-exit {
    display: none;
  }
}
</style>
