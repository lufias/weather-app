<template>
  <div class="weather-details-weekly">
    <div class="weekly-title">Weekly Forecast</div>
    <div class="weekly-list">
      <WeatherDetailsCard 
        v-for="day in dailyForecast" 
        :key="day.dt"
        :type="'weekly'"
        :data="day"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import WeatherDetailsCard from './WeatherDetailsCard.vue';
import type { DailyForecast } from '../../store/modules/weather';

const route = useRoute();
const store = useStore();

const dailyForecast = computed<DailyForecast[]>(() => {
  const locationId = parseInt(route.params.id as string);
  const forecast = store.getters['weather/getDailyForecast'](locationId);
  // Return next 7 days of forecast
  return forecast?.slice(0, 7) || [];
});
</script>

<style scoped>
.weather-details-weekly {
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
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