<script setup>
import ordersTabs from "@/assets/orders-tabs.png";
import userTabs from "@/assets/user-tabs.png";
import helpTabs from "@/assets/help-tabs.png";
</script>

<template>
  <div class="personal-cabinet__tabs">
    <ul class="personal-cabinet__menu">
      <li>
        <router-link to="/orders">
          <img :src="ordersTabs" alt="order" />
          <span>Мои заказы</span>
        </router-link>
      </li>
      <li>
        <router-link to="/data">
          <img :src="userTabs" alt="user" />
          <span>Мои данные</span>
        </router-link>
      </li>
      <li>
        <router-link to="/help">
          <img :src="helpTabs" alt="help" />
          <span>Помощь</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.personal-cabinet__tabs {
  display: flex;
  flex-direction: column;
}

.personal-cabinet__menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  line-height: 1.3;
  font-family: Tahoma, Arial, sans-serif;
}

.personal-cabinet__menu li a {
  color: #098700;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*  */
  width: 140px;
  height: 102px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background: none;
  position: relative;
}

.personal-cabinet__menu li a:hover,
.personal-cabinet__menu li a.router-link-active {
  background: #fff;
  color: #ff5a00;
  border: 1px solid #e8e8e8;
}

@media (max-width: 976px) {
  .personal-cabinet__tabs {
    display: none;
  }
}
</style>
