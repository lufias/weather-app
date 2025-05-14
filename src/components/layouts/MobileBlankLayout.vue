<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// Determine which component to render in mobile view:
// 1. Use route.meta.mobileComponent if set
// 2. Otherwise, use the default component from the matched route
const resolvedMobileComponent = computed(() => {  
  if (route.meta.mobileComponent) {
    return route.meta.mobileComponent;
  } else if (route.matched.length > 0) {
    const lastMatched = route.matched[route.matched.length - 1];
    return lastMatched.components?.default;
  } else {
    return null;
  }
});
</script>

<template>
  <div class="mobile-blank-layout">
    <component :is="resolvedMobileComponent" />
  </div>
</template>

<style scoped>
.mobile-blank-layout {
  width: 100%;
  min-height: 100vh;
  background-color: var(--background-color);  
}
</style> 