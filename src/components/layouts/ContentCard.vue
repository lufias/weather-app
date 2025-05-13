<template>
  <div class="content-card">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No script logic needed
</script>

<style scoped>
.content-card {
  max-width: 56.25rem; /* 900px */
  margin: 2rem auto;
  background: #fff;
  box-shadow: 0 0.125rem 1rem rgba(0,0,0,0.08); /* 2px 16px */
  padding: 2.5rem 2rem;
  border-radius: 1.2rem;
}
</style> 