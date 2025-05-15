<template>
  <div class="split-layout-container" data-testid="split-layout">
    <Header />
    <div class="split-layout" data-testid="split-layout-content">
      <div class="split-layout__left" data-testid="split-layout-left">
        <router-view name="left" data-testid="router-view-left" />
      </div>
      <div class="split-layout__right" data-testid="split-layout-right">
        <router-view name="right" data-testid="router-view-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
// No direct imports needed for named views
</script>

<style scoped>
.split-layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.split-layout {
  display: flex;
  max-width: 80rem;
  margin: 2rem auto;
  gap: 2rem;
  height: 80vh;
}
.split-layout__left { 
  flex: 1;
  overflow-y: auto;
  min-width:  30rem;   
  /* width: 30rem; */
}
.split-layout__right {  
  flex: 1;
  overflow-y: auto;
  min-width: 30rem; 
  /* width: 30rem; */
  
}

.split-layout__left::-webkit-scrollbar,
.split-layout__right::-webkit-scrollbar {
  width: 0.25rem;
  background: transparent;
}

.split-layout__left::-webkit-scrollbar-thumb,
.split-layout__right::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 0.5rem;
  transition: background 0.3s;
}

.split-layout__left:hover::-webkit-scrollbar-thumb,
.split-layout__right:hover::-webkit-scrollbar-thumb {
  background: #b3b3b3;
}

.split-layout__left::-webkit-scrollbar-track,
.split-layout__right::-webkit-scrollbar-track {
  background: transparent;
}
</style>    