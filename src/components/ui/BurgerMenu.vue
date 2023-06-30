<script setup>
import { ref } from "vue";
const emit = defineEmits(["open", "close"]);
const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
  emit(isOpen.value ? "open" : "close");
}

function closeMenu() {
  isOpen.value = false;
  emit("close");
}
</script>

<template>
  <div class="burger-menu burger" :data-is-open="isOpen">
    <button @click="toggleMenu" class="burger-menu__button">
      <!-- <div id="nav-icon1" :class="{ open: isOpen }"> -->
      <!-- <span></span>
        <span></span>
        <span></span> -->
      <!-- </div> -->

      <span>
        <i class="burger-i"></i>
        <i class="burger-i"></i>
        <i class="burger-i"></i>
      </span>
    </button>
    <div v-if="isOpen" class="burger-menu__content">
      <ul class="burger-menu__list">
        <li class="burger-menu__item">
          <router-link class="link" to="/orders" @click="closeMenu">
            Мои заказы
          </router-link>
        </li>
        <li class="burger-menu__item">
          <router-link class="link" to="/data" @click="closeMenu">
            Мои данные
          </router-link>
        </li>
        <li class="burger-menu__item">
          <router-link class="link" to="/help" @click="closeMenu">
            Помощь
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.burger span {
  width: 16px;
  height: 16px;
  position: relative;
}

.burger {
  width: 45px;
  height: 45px;
  margin: 5px 15px 5px 0;
  position: relative;
  align-items: center;
  justify-content: start;
}

.burger-i {
  font-size: 0;
  background-color: #61bf1a;
  height: 2px;
  width: 15px;
  position: absolute;
  left: 0;
  transform-origin: center;
}

.burger i:first-of-type {
  top: 0;
  transition: transform 0.33s;
}

.burger i:nth-of-type(2) {
  width: 18px;
  top: 50%;
}

.burger i:last-of-type {
  top: 100%;
  transition: transform 0.33s;
}

/* #nav-icon1 {
  width: 60px;
  height: 45px;
  position: relative;
  margin: 30px auto;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
}
#nav-icon1 span {
  display: block;
  position: absolute;
  height: 5px;
  width: 100%;
  background: #38af09;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}
#nav-icon1 span:nth-child(1) {
  top: 0px;
}
#nav-icon1 span:nth-child(2) {
  top: 18px;
}
#nav-icon1 span:nth-child(3) {
  top: 36px;
}
#nav-icon1.open span:nth-child(1) {
  top: 18px;
  transform: rotate(135deg);
}
#nav-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}
#nav-icon1.open span:nth-child(3) {
  top: 18px;
  transform: rotate(-135deg);
} */

/* .............. */
.burger-menu {
  display: none;
}

.burger-menu__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.burger-menu__content {
  position: absolute;
  top: 0;
  left: 30px;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.burger-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.burger-menu__item {
  margin-bottom: 16px;
}

/* #nav-icon1.open span {
  background-color: #61bf1a;
} */

@media (max-width: 976px) {
  .burger-menu {
    display: flex;
  }
}
</style>
