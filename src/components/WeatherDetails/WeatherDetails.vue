<template>
  <div class="weather-details">
    <template v-if="selectedLocationId && currentLocation && currentWeather">
      <WeatherDetailsHeader         
        :current-weather="currentWeather"
        :location="currentLocation"
      />    
      <WeatherDetailsHourly />
      <WeatherDetailsWeekly />
    </template>
    <template v-else>
      <div class="placeholder">
        <p>Please select a city to view weather details.</p>
        <button class="back-button" @click="$router.push('/')" aria-label="Go back to home">
          <i class="fas fa-arrow-left"></i>
          Back to Home
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { watch, ref, computed } from 'vue';
import type { Location } from '../../store/modules/locations';
import type { CurrentWeather } from '../../store/modules/weather';
import WeatherDetailsHeader from './WeatherDetailsHeader.vue';
import WeatherDetailsHourly from './WeatherDetailsHourly.vue';
import WeatherDetailsWeekly from './WeatherDetailsWeekly.vue';

const route = useRoute();
const store = useStore();

const currentWeather = ref<CurrentWeather | null>(null);
const currentLocation = ref<Location | null>(null);

const locations = computed(() => store.getters['locations/getLocations']);
const selectedLocationId = computed(() => store.getters['locations/getSelectedLocationId']);

// Watch for changes in route params and update selectedLocationId in store
watch(
  () => route.params.id,
  (newId) => {
    const id = newId ? parseInt(newId as string) : null;
    store.dispatch('locations/setSelectedLocationId', id);
  },
  { immediate: true }
);

// Watch for changes in selectedLocationId and locations
watch(
  [selectedLocationId, locations],
  async ([locationId, locationsValue]) => {
    if (locationId && locationsValue.length > 0) {
      // Get location info from store
      const location = locationsValue.find((loc: Location) => loc.id === locationId);
      if (location) {
        currentLocation.value = location;
        // Check if we already have current weather data
        const existingCurrentWeather = store.getters['weather/getCurrentWeather'](locationId);        
        // Prepare fetch promises array
        const fetchPromises = [];
        // Only fetch current weather if we don't have it or if it's older than 30 minutes
        if (!existingCurrentWeather || 
            (Date.now() / 1000 - existingCurrentWeather.dt > 1800)) {
          fetchPromises.push(
            store.dispatch('weather/fetchCurrentWeather', {
              locationId,
              lat: location.lat,
              lon: location.lon
            })
          );
        } else {
          currentWeather.value = existingCurrentWeather;
        }
        // Always fetch weather details as they contain hourly and daily forecasts
        fetchPromises.push(
          store.dispatch('weather/fetchWeatherDetails', {
            locationId,
            lat: location.lat,
            lon: location.lon
          })
        );
        // Execute any necessary fetches
        if (fetchPromises.length > 0) {
          await Promise.all(fetchPromises);
          // Update current weather ref if we fetched new data
          if (!currentWeather.value) {
            currentWeather.value = store.getters['weather/getCurrentWeather'](locationId);
          }
        }
      }
    } else {
      currentLocation.value = null;
      currentWeather.value = null;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.weather-details {
  width: 100%;
  max-width: 480px;  
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);  
  display: flex;
  flex-direction: column;  
}
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #888;
  font-size: 1.1rem;
  font-weight: 500;
  gap: 1rem;
}

.back-button {
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #f1f5f9;
  color: #475569;
}

@media (max-width: 768px) {
  .back-button {
    display: flex;
  }
}
</style> 