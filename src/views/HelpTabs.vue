<script setup>
import Help from "./helpPages/Help.vue";
</script>
<template>
  <div class="help">
    <RouterView>
      <Help />
    </RouterView>
  </div>
</template>

<style lang="css" scoped>
.help {
  width: 250px;
}
</style>
