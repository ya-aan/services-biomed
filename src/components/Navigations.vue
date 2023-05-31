<script setup></script>
<template>
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
        <a class="link" href="https://azbykamed.ru/contacts/" target="_blank">
          Адреса и время работы</a
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="css" scoped>
.navbar {
  display: flex;
  padding: 0 2rem;
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
/* 
.navbar-menu li a {
  color: #098700;
  text-decoration: none;
}

.navbar-menu li a:hover {
  color: #ff5a00;
} */
</style>
