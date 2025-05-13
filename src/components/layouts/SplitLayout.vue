<template>
  <div class="split-layout">
    <div class="split-layout__left">
      <router-view name="left" />
    </div>
    <div class="split-layout__right">
      <router-view name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
// No direct imports needed for named views
</script>

<style scoped>
.split-layout {
  display: flex;
  max-width: 56.25rem;
  margin: 2rem auto;
  gap: 2rem;
}
.split-layout__left {
  flex: 1;
}
.split-layout__right {
  flex: 1;
}
</style>    