<script setup lang="ts">
import { useRoute } from 'vue-router';
import SplitLayout from './components/layouts/SplitLayout.vue';
import MainLayout from './components/layouts/MainLayout.vue';
import Header from './components/layouts/Header.vue';

const route = useRoute();
</script>

<template>
  <Header />
  <component :is="route.meta.layout === 'main' ? MainLayout : SplitLayout">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>
