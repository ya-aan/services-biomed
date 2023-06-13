<script setup></script>
<template>
  <div class="container-center">
    <div>
      <div class="center">
        <p class="text">
          <b>Запрашиваемая вами страница не найдена. </b>
        </p>
      </div>
      <p>Возможные решения проблемы:</p>
      <ul>
        <li>Убедитесь в правильности введённого адреса страницы</li>
        <li>
          Если вы уверены в правильности введённого адреса, то вы можете перейти
          на сайт Азбука Мед и сообщить нашим специалистам об ошибке
        </li>
      </ul>
      <p class="text">
        Возможно, то что вы искали находится в одном из разделов:
      </p>

      <ul>
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
    </div>
  </div>
</template>

<style lang="css" scoped>
.container-center {
  padding: 20px;
}
.center {
  text-align: center;
}

.text {
  width: 100%;
  margin: 0 0 6px 0;
  -ms-word-wrap: break-word;
  word-wrap: break-word;
}

ul {
  margin: 15px 40px;
}

ul li {
  list-style: square;
  margin: 5px 0;
}
</style>
