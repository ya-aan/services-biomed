<script setup>
import BurgerMenu from "./ui/BurgerMenu.vue";
import logoPng from "@/assets/logo.png";
import logoSvg from "@/assets/logo-svg.svg";
import phone from "@/assets/phone.png";
</script>
<template>
  <div class="navigations">
    <div class="wrapper-navigations-mobile">
      <div class="navigations-flex">
        <BurgerMenu @open="open" />

        <div class="wrapper-logo-mobile">
          <img :src="logoSvg" alt="logo" />
        </div>

        <div class="wrapper-phone-mobile">
          <a href="tel:+73452518481">
            <img :src="phone" alt="phone" />
          </a>
          <p class="phone-text">8 (3452) 51-84-81</p>
        </div>
      </div>
    </div>

    <!-- //////////////// -->
    <div class="wrapper-navigations">
      <div class="wrapper-logo">
        <img :src="logoPng" alt="logo" />
      </div>
      <router-link class="span-text" to="/orders"
        >Личный кабинет клиента</router-link
      >

      <div class="wrapper-navbar">
        <nav class="navbar">
          <ul class="navbar-menu">
            <li>
              <a class="link" href="https://azbykamed.ru/" target="_blank"
                >Главная страница сайта</a
              >
            </li>
            <li>
              <a
                class="link"
                href="https://azbykamed.ru/analizy-i-tseny/"
                target="_blank"
                >Анализы и цены</a
              >
            </li>
            <li>
              <a
                class="link"
                href="https://azbykamed.ru/contacts/"
                target="_blank"
              >
                Адреса и время работы</a
              >
            </li>
          </ul>
        </nav>
      </div>

      <div class="wrapper-phone">
        <a href="tel:+73452518481">
          <img :src="phone" alt="phone" />
        </a>
        <p>8 (3452) 51-84-81</p>
      </div>
    </div>

    <div class="wrapper-navbar-mobile">
      <div>
        <nav class="navbar">
          <ul class="navbar-menu">
            <li>
              <a
                class="link link-margin"
                href="https://azbykamed.ru/"
                target="_blank"
                >Главная страница сайта</a
              >
            </li>
            <li>
              <a
                class="link"
                href="https://azbykamed.ru/analizy-i-tseny/"
                target="_blank"
                >Анализы и цены</a
              >
            </li>
            <li>
              <a
                class="link"
                href="https://azbykamed.ru/contacts/"
                target="_blank"
                >Адреса и время работы</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.navigations {
  padding: 15px 50px;
  width: 100%;
  background: #ffffff;
}

.wrapper-navigations {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
}

.wrapper-navigations-mobile {
  display: none;
}

.wrapper-navbar-mobile {
  display: none;
}

.navbar {
  display: flex;
  padding-right: 22rem;
  justify-content: center;
  align-items: center;
}

.navbar-menu {
  list-style: none;
  display: flex;
}

.navbar-menu li {
  margin-right: 2rem;
}

.wrapper-phone {
  display: flex;
  align-items: center;
  gap: 10px;
}

.phone-text {
  display: none;
}

.span-text {
  text-decoration: none;
  color: #333;
}

/* adaptiv */

@media (max-width: 1530px) {
  .span-text {
    display: none;
  }

  .navbar {
    padding-right: 0;
  }
}

@media (max-width: 976px) {
  .wrapper-navigations {
    display: none;
  }

  .wrapper-navigations-mobile {
    display: block;
  }

  .wrapper-navbar-mobile {
    display: block;
  }

  .navigations-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navigations {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 18px;
  }

  /* .wrapper-logo {
    margin-bottom: 1rem;
  } */

  .wrapper-logo-mobile {
    margin-right: 35px;
  }

  .navbar-menu {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 690px) {
  .navbar {
    overflow: scroll;
  }
  .navbar-menu li {
    white-space: nowrap;
  }
}

@media (max-width: 510px) {
  .link-margin {
    margin-left: 100px;
  }
}

@media (max-width: 424px) {
  .link-margin {
    margin-left: 139px;
  }
}

@media (max-width: 378px) {
  .link-margin {
    margin-left: 169px;
  }
}

@media (max-width: 354px) {
  .link-margin {
    margin-left: 200px;
  }
}

@media (max-width: 310px) {
  .link-margin {
    margin-left: 210px;
  }
}

@media (max-width: 300px) {
  .link-margin {
    margin-left: 239px;
  }
}
</style>
