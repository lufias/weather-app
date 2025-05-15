<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import WeatherCard from './WeatherCard.vue';
import SearchContainer from './SearchContainer.vue';

const router = useRouter();
const store = useStore();

const isMobile = computed(() => window.innerWidth <= 768);

const locations = computed(() => [...store.getters['locations/getLocations']]);
const getWeather = (id: number) => store.getters['weather/getCurrentWeather'](id);

function goToDetails(id: number) {
  router.push({ name: 'details', params: { id: id.toString() } });
}

function removeAll() {
  store.dispatch('locations/removeAllLocations');
}

onMounted(async () => {
  await store.dispatch('locations/loadLocations');
  await Promise.all(
    locations.value.map(location => 
      store.dispatch('weather/fetchCurrentWeather', {
        locationId: location.id,
        lat: location.lat,
        lon: location.lon
      })
    )
  );
});
</script>

<template>
  <div class="weather-list" :class="{ 'mobile': isMobile }">
    <div class="search-wrapper">
      <SearchContainer />
    </div>
    <template v-if="locations.length">
      <button class="remove-all-btn" @click.stop="removeAll" title="Remove all locations">
        🗑 Remove All
      </button>
      <div
        v-for="item in locations"
        :key="item.id"
        class="weather-list-item"
        @click="goToDetails(item.id)"
      >
        <WeatherCard
          :location="item.city"
          :temperature="getWeather(item.id)?.temp ?? 0"
          :description="getWeather(item.id)?.weather[0]?.description ?? 'Loading...'"
          :high="getWeather(item.id)?.temp ?? 0"
          :low="getWeather(item.id)?.temp ?? 0"
          :isCurrentLocation="item.isCurrentLocation"
          :weatherIcon="getWeather(item.id)?.weather[0]?.icon"
          :time="getWeather(item.id)?.dt ? new Date(getWeather(item.id).dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''"
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
  justify-content: flex-start;
  align-items: center;
  position: relative;
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

.remove-all-btn {  
  right: 1.2rem;
  background: #fff;
  color: #6366f1;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.7rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99,102,241,0.08);
  z-index: 2;
  transition: background 0.15s, color 0.15s;
  align-self: flex-end;
}
.remove-all-btn:hover {
  background: #6366f1;
  color: #fff;
}

.search-wrapper {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
}

.weather-list.mobile .search-wrapper {
  padding: 0.75rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 100%;
}
</style> 