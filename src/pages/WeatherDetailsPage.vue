<template>
  <div class="weather-details-page">
    <WeatherDetails />
  </div>
</template>

<script setup lang="ts">
import WeatherDetails from '../components/WeatherDetails/WeatherDetails.vue';
</script>

<style scoped>
.weather-details-page {
  /* padding: 2rem; */
  display: flex;
  justify-content: center;
}
</style> 