<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import WeatherCard from './WeatherCard.vue';

const router = useRouter();
const store = useStore();

const isMobile = computed(() => window.innerWidth <= 768);

const locations = computed(() => store.getters['locations/getLocations']);
const getWeather = (id: number) => store.getters['weather/getWeatherByLocation'](id);

function goToDetails(id: number) {
  if (isMobile.value) {
    router.push(`/details/${id}`);
  } else {
    router.push({ name: 'WeatherDetails', params: { id } });
  }
}

onMounted(async () => {
  await store.dispatch('locations/loadLocations');
  for (const location of locations.value) {
    await store.dispatch('weather/fetchWeather', {
      locationId: location.id,
      lat: location.lat,
      lon: location.lon
    });
  }
});
</script>

<template>
  <div class="weather-list" :class="{ 'mobile': isMobile }">
    <template v-if="locations.length">
      <div
        v-for="item in locations"
        :key="item.id"
        class="weather-list-item"
        @click="goToDetails(item.id)"
      >
        <WeatherCard
          :location="item.city"
          :temperature="getWeather(item.id)?.current?.temp ?? 0"
          :description="getWeather(item.id)?.current?.weather[0]?.description ?? 'Loading...'"
          :high="getWeather(item.id)?.current?.temp ?? 0"
          :low="getWeather(item.id)?.current?.temp ?? 0"
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
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
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