<template>
  <div class="weather-details-hourly">
    <div class="hourly-title">Hourly Forecast</div>
    <div class="hourly-list">
      <WeatherDetailsCard v-for="h in 5" :key="h" :type="'hourly'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherDetailsCard from './WeatherDetailsCard.vue';
// Props and logic will be added later
</script>

<style scoped>
.weather-details-hourly {
  margin-top: 1.5rem;
}
.hourly-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
}
.hourly-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
</style> 