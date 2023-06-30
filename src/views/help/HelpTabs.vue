<script setup>
import { ref } from "vue";
import HelpPersonalAccount from "./helpTabsComponents/HelpPersonalAccount.vue";
import HelpMyData from "./helpTabsComponents/HelpMyData.vue";
const currentTab = ref("HelpPersonalAccount");

const tabs = {
  "Что такое личный кабинет?": HelpPersonalAccount,

  "Зачем нужен раздел мои данные?": HelpMyData,
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
