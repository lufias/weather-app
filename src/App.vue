<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import SplitLayout from './components/layouts/SplitLayout.vue';
import MainLayout from './components/layouts/MainLayout.vue';
import MobileLayout from './components/layouts/MobileLayout.vue';
import MobileBlankLayout from './components/layouts/MobileBlankLayout.vue';

const route = useRoute();
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const isMobile = computed(() => windowWidth.value <= 768);

const currentLayout = computed(() => {
  if (isMobile.value) {
    if (route.meta.mobileLayout === 'blank') {
      return MobileBlankLayout;
    }
    return MobileLayout;
  }
  return route.meta.layout === 'split' ? SplitLayout : MainLayout;
});
</script>

<template>
  <component :is="currentLayout">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>
