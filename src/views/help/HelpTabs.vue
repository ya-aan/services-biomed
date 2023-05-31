<script setup>
import { ref, computed } from "vue";
import HelpPersonalAccount from "./helpTabsComponents/HelpPersonalAccount.vue";
import HelpGetResults from "./helpTabsComponents/HelpGetResults.vue";
import HelpGetResultByEmail from "./helpTabsComponents/HelpGetResultByEmail.vue";
import HelpUploadOrdersResult from "./helpTabsComponents/HelpUploadOrdersResult.vue";
import HelpMyData from "./helpTabsComponents/HelpMyData.vue";
import HelpChangeEmail from "./helpTabsComponents/HelpChangeEmail.vue";
const currentTab = ref("HelpPersonalAccount");

const tabs = {
  "Что такое личный кабинет?": HelpPersonalAccount,
  "Как получить результаты исследований?": HelpGetResults,
  "Как получить результаты по e-mail?": HelpGetResultByEmail,
  "Как загрузить результаты заказа?": HelpUploadOrdersResult,
  "Зачем нужен раздел мои данные?": HelpMyData,
  "Как сменить e-mail?": HelpChangeEmail,
};
</script>
<template>
  <div class="content-tabs">
    <div class="tab-buttons">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        :class="[
          'tab-button',
          {
            active: currentTab === tab,
            'active-tab-button': currentTab === tab,
          },
        ]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <component :is="tabs[currentTab]" class="tab"></component>
    </div>
  </div>
  <br />
</template>

<style lang="css" scoped>
.content-tabs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  /* justify-content: center; */
  padding: 20px;
  /* border-bottom: 1px solid #ccc; */
}

.tab-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.tab-button {
  color: #098700;
  border: none;
  background: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.tab-button:hover {
  color: #ff5a00;
}

.tab-button:active,
.active-tab-button {
  /* background: #82cc6c;
  color: #fff;
  padding: 10px; */
  color: #ff5a00;
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 520px;
  margin-left: 20px;
}
</style>
