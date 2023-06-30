<script setup>
import helpCabinet from "@/assets/helpCabinet.png";
import helpModal from "@/assets/helpModal.png";
</script>
<template>
  <div class="tab">
    <p>
      Личный кабинет предоставляет вам возможности для управления результатами
      анализов.
      <a class="link" href="http://81.200.148.127:8080/" target="_blank">
        Внутри Личного кабинета
      </a>

      вы сможете легко отслеживать статус заявок на проведение анализов,
      просматривать детальные результаты и сравнивать их с нормой. Кроме того,
      вы сможете скачать официальный бланк с вашими результатами исследований,
      что облегчит взаимодействие с врачами и специалистами. Наш Личный кабинет
      создан с учетом вашего комфорта и предлагает удобство и контроль над

      <a class="link" href="http://81.200.148.127:8080/orders" target="_blank"
        >медицинскими данными</a
      >
    </p>

    <div id="gallery">
      <a :href="helpCabinet" target="_blank">
        <img style="max-width: 100%" :src="helpCabinet" alt="help" />
      </a>
    </div>

    <p>
      <strong>Как получить результаты исследований?</strong>
    </p>

    <ol>
      <li>
        В разделе
        <a class="link" href="http://81.200.148.127:8080/data" target="_blank"
          >"Мои данные"</a
        >
        добавьте данные пациента, на которого был оформлен заказ. Особое
        внимание уделите дате рождения, так как именно она определяет
        принадлежность заказа. Убедитесь, что введенные данные соответствуют
        информации, указанной на бланке.
      </li>

      <li>
        Перейдите в раздел
        <a class="link" href="http://81.200.148.127:8080/orders" target="_blank"
          >"Мои заказы"</a
        >
        и нажмите кнопку "Загрузить результаты заказа". Введите номер заказа.
        Если дата рождения в заказе отличается от той, которую вы указали на
        предыдущем шаге, или если вы хотите получить результаты для члена семьи,
        нажмите на кнопку "Указать другую дату рождения" и введите дату
        рождения, указанную на бланке.
      </li>

      <li>
        В случае успешной обработки запроса, номер заявки появится в таблице
        "Оформленные заказы".
      </li>
      <li>
        Щелкните по номеру заказа в таблице "Оформленные заказы", и откроется
        окно с результатами исследований. Там вы также сможете
        <a
          class="link"
          href="http://81.200.148.127:8080/requests/pdf-response/authorized/7230421038"
          target="_blank"
          >скачать официальный бланк с результатами</a
        >
      </li>
    </ol>

    <div id="gallery">
      <a :href="helpModal" target="_blank">
        <img style="max-width: 100%" :src="helpModal" alt="help" />
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
.help-personal {
  width: 520px;
  margin-left: 20px;
}

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
