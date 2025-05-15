<template>
  <div class="split-layout-container">
    <Header />
    <div class="split-layout">
      <div class="split-layout__left">
        <router-view name="left" />
      </div>
      <div class="split-layout__right">
        <router-view name="right" />
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