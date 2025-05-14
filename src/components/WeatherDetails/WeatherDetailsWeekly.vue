<template>
  <div class="weather-details-weekly">
    <div class="weekly-title">Weekly Forecast</div>
    <div class="weekly-list">
      <WeatherDetailsCard v-for="d in 4" :key="d" :type="'weekly'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherDetailsCard from './WeatherDetailsCard.vue';
// Props and logic will be added later
</script>

<style scoped>
.weather-details-weekly {
  margin-top: 2rem;
}
.weekly-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
}
.weekly-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style> 