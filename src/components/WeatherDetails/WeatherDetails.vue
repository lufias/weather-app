<template>
  <div class="weather-details">
    <WeatherDetailsHeader />
    <WeatherDetailsMeta />
    <WeatherDetailsHourly />
    <WeatherDetailsWeekly />
  </div>
</template>

<script setup lang="ts">
import WeatherDetailsHeader from './WeatherDetailsHeader.vue';
import WeatherDetailsMeta from './WeatherDetailsMeta.vue';
import WeatherDetailsHourly from './WeatherDetailsHourly.vue';
import WeatherDetailsWeekly from './WeatherDetailsWeekly.vue';
</script>

<style scoped>
.weather-details {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
</style> 