<script setup lang="ts">
import ContentCard from './ContentCard.vue';
import Header from './Header.vue';
// Layout component logic can be added here
</script>

<template>
  <div class="layout">    
    <Header />
    <main class="main-content">
      <ContentCard>
        <router-view></router-view>
      </ContentCard>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 0; /* Remove extra padding, handled by card */
}
</style> 