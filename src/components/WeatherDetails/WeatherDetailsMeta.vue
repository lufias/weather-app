<template>
  <div class="weather-details-meta">
    <!-- Last update and meta info -->
    <div class="meta-update">Last Update 6:00 PM <FontAwesomeIcon :icon="faArrowsRotate" class="meta-refresh" /></div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
// Props and logic will be added later
</script>

<style scoped>
.weather-details-meta {
  text-align: center;  
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0.5rem;
}
.meta-refresh {
  font-size: 1rem;
  margin-left: 0.3rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
</style> 