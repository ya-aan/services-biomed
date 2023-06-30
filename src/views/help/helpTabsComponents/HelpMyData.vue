<script setup>
import helpMyData from "@/assets/helpMyData.png";
</script>
<template>
  <div class="tab">
    <p>
      <a class="link" href="http://81.200.148.127:8080/data" target="_blank">
        В разделе «Мои данные»
      </a>
      вы можете сохранять свои персональные данные в безопасной среде. Эта
      информация необходима для получения результатов анализов и удобного
      оформления предварительных заказов. Мы гарантируем полную
      конфиденциальность и защиту вашей личной информации. Ваши данные будут
      использованы исключительно в рамках медицинских услуг и не будут
      разглашены третьим лицам. Мы ценим ваше доверие и принимаем все меры для
      обеспечения безопасности ваших данных.
    </p>

    <div id="gallery">
      <a :href="helpMyData" target="_blank">
        <img style="max-width: 100%" :src="helpMyData" alt="help" />
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
#gallery {
  -moz-user-select: none;
  user-select: none;
}
#gallery img {
  max-width: 340px;
  max-height: 200px;
  cursor: zoom-in;
}
#gallery img:focus {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 31;
  max-width: 100%;
  max-height: 100%;
  outline: none;
  pointer-events: none;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -moz-user-select: none;
  user-select: none;
}
#gallery img:focus ~ div {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background: rgba(240, 240, 240, 0.9);
  cursor: zoom-out;
}
</style>
