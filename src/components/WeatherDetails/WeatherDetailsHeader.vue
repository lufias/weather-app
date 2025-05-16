<script setup lang="ts">
import WeatherDetailsMeta from './WeatherDetailsMeta.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { CurrentWeather } from '../../store/modules/weather';
import type { Location } from '../../store/modules/locations';
import { computed } from 'vue';

const props = defineProps<{
  currentWeather: CurrentWeather;
  location: Location;
}>();

const router = useRouter();
const store = useStore();

const formattedDate = computed(() => {
  const date = new Date(props.currentWeather.dt * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

const handleBack = () => {
  router.push('/');
};

const handleDelete = async () => {
  if (props.location.id) {
    await store.dispatch('locations/deleteLocation', props.location.id);
    router.push('/');
  }
};

const handleRefresh = async () => {
  if (props.location.id) {
    await Promise.all([
      store.dispatch('weather/fetchCurrentWeather', {
        locationId: props.location.id,
        lat: props.location.lat,
        lon: props.location.lon
      }),
      store.dispatch('weather/fetchWeatherDetails', {
        locationId: props.location.id,
        lat: props.location.lat,
        lon: props.location.lon
      })
    ]);
  }
};
</script>

<template>
  <div class="weather-details-header" data-testid="weather-details-header">
    <!-- Location section with icons -->
    <div class="location-container">
      <button class="icon-button back-button" @click="handleBack" data-testid="back-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="header-location" data-testid="location-name">{{ location.city }}</div>
      <button class="icon-button" @click="handleDelete" data-testid="delete-button">
        <FontAwesomeIcon :icon="faTrashAlt" />
      </button>
    </div>
    <div class="header-date" data-testid="weather-date">{{ formattedDate }}</div>
    <div class="header-icon">
      <img 
        :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" 
        :alt="currentWeather.weather[0].description"
        data-testid="weather-icon"
      />
    </div>
    <div class="header-temp" data-testid="weather-temp">{{ Math.round(currentWeather.temp) }}° C</div>
    <div class="header-desc" data-testid="weather-description">{{ currentWeather.weather[0].description }}</div>
    <WeatherDetailsMeta 
      :current-weather="currentWeather" 
      @refresh="handleRefresh"
      data-testid="weather-details-meta"
    />
  </div>
</template>

<style lang="scss" scoped>
.weather-details-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #4F80FA 0%, #3764D7 50%, #335FD1 100%);
  color: #fff;
}

.location-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 1rem;
  margin-bottom: 1.5rem;
  padding-top: 1.8125rem;

  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.8125rem;
    height: 0.8125rem;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;    
    transition: color 0.2s ease;
    color: #fff;

    &.back-button {
      visibility: hidden; // Hide by default on desktop

      @media (max-width: 48rem) {
        visibility: visible; // Show on mobile        
      }
    }

    i {
      font-size: 1.25rem;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      color: #e2e8f0;
    }
  }

  .header-location {
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0 1rem;
    text-transform: capitalize;
  }
}

.header-date {
  font-size: 0.875rem;
  font-weight: 400;  
  margin-bottom: 1.5rem;
}

.header-icon {
  margin-bottom: 2rem;
  img {
    width: 4rem;
    height: 4rem;
  }
}

.header-temp {
  font-size: 1.25rem;
  font-weight: 400;
}

.header-desc {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}
</style> 