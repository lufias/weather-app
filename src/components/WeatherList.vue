<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import WeatherCard from './WeatherCard.vue';

const router = useRouter();

const weatherList = ref([
  { id: 1, city: 'New York', temp: 22, desc: 'Sunny', high: 25, low: 18, isCurrentLocation: true },
  { id: 2, city: 'London', temp: 18, desc: 'Cloudy', high: 20, low: 15, isCurrentLocation: false },
  { id: 3, city: 'Tokyo', temp: 25, desc: 'Rainy', high: 27, low: 21, isCurrentLocation: false },
  { id: 4, city: 'Sydney', temp: 20, desc: 'Windy', high: 23, low: 17, isCurrentLocation: false },
]);

function goToDetails(id: number) {
  router.push({ name: 'WeatherDetails', params: { id } });
}
</script>

<template>
    <div class="weather-list">
      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-list-item"
        @click="goToDetails(item.id)"
      >
        <WeatherCard
          :location="item.city"
          :temperature="item.temp"
          :description="item.desc"
          :high="item.high"
          :low="item.low"
          :isCurrentLocation="item.isCurrentLocation"
        />
      </div>
    </div>
  </template>

<style scoped>
.weather-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.weather-list-item {
  cursor: pointer;
}
</style> 