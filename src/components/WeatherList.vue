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
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin: 2rem 0;
}
</style> 