<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import WeatherDetailsCard from './WeatherDetailsCard.vue';
import type { HourlyForecast } from '../../store/modules/weather';

const route = useRoute();
const store = useStore();

const hourlyForecast = computed<HourlyForecast[]>(() => {
  const locationId = parseInt(route.params.id as string);
  const forecast = store.getters['weather/getHourlyForecast'](locationId);
  // Return next 24 hours of forecast
  return forecast?.slice(0, 24) || [];
});
</script>

<template>
  <div class="weather-details-hourly">
    <div class="hourly-title">Hourly Forecast</div>
    <div class="hourly-list">
      <WeatherDetailsCard 
        v-for="hour in hourlyForecast.slice(0, 4)" 
        :key="hour.dt"
        :type="'hourly'"
        :data="hour"
      />
    </div>
  </div>
</template>

<style scoped>
.weather-details-hourly {
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.hourly-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
}
.hourly-list {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
</style> 