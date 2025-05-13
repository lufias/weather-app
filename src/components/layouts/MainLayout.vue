<script setup lang="ts">
import Header from './Header.vue';
// Layout component logic can be added here
</script>

<template>
  <div class="layout">
    <Header />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 1rem 1.5rem;
  background: white;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
}

.profile-icon {
  display: flex;
  align-items: center;
  color: #2c3e50;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style> 