<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import WeatherCard from './WeatherCard.vue';

const router = useRouter();

const isMobile = computed(() => window.innerWidth <= 768);

interface WeatherItem {
  id: number;
  city: string;
  temp: number;
  desc: string;
  high: number;
  low: number;
  isCurrentLocation: boolean;
}

const weatherList = ref<WeatherItem[]>([]);

function goToDetails(id: number) {
  if (isMobile.value) {
    router.push(`/details/${id}`);
  } else {
    router.push({ name: 'WeatherDetails', params: { id } });
  }
}
</script>

<template>
  <div class="weather-list" :class="{ 'mobile': isMobile }">
    <template v-if="weatherList.length">
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
    </template>
    <template v-else>
      <div class="weather-list-placeholder">
        <div class="placeholder-icon">☁️</div>
        No locations added yet. Use the search above to add a city.
      </div>
    </template>
  </div>
</template>

<style scoped>
.weather-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-height: 60vh;
  justify-content: center;
  align-items: center;
}

.weather-list.mobile {
  padding: 0;
}

.weather-list.mobile .weather-list-item {
  border-radius: 0;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
}

.weather-list-item {
  cursor: pointer;
}

.weather-list-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #b0b3b8;
  font-size: 1.35rem;
  font-weight: 400;
  margin: 0;
  min-height: 30vh;
}

.weather-list-placeholder .placeholder-icon {
  font-size: 3.5rem;
  margin-bottom: 1.2rem;
  color: #d1d5db;
}
</style> 