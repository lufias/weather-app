<!-- Example Usage -->

<!-- <WeatherCard
  :location="'Bangsar South'"
  :temperature="24"
  description="Moderate Rain"
  :high="30"
  :low="25"
  :isCurrentLocation="true"
/>
<WeatherCard
  :location="'London'"
  :temperature="9"
  description="Not as cold tomorrow, with a high of 16°"
  :high="16"
  :low="-4"
/> -->

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { getWeatherGradient } from '../utils/WeatherUtils';

const props = defineProps({
  location: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  high: { type: Number, required: false },
  low: { type: Number, required: false },
  isCurrentLocation: { type: Boolean, default: false },
  weatherIcon: { type: String, required: false },
  time: { type: String, required: false },
});

const capitalizeFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const cardStyle = computed(() => {
  const gradient = getWeatherGradient(props.weatherIcon);
  return {
    background: gradient
  };
});
</script>

<template>
  <div class="weather-card" :class="{ 'current-location': props.isCurrentLocation }" :style="cardStyle">
    <div class="weather-card__header">
      <div>
        <div class="weather-card__location main">
          <span v-if="props.isCurrentLocation">My Location</span>
          <span v-else>{{ props.location }}</span>
        </div>
        <div class="weather-card__time" v-if="props.time">{{ props.time }}</div>
      </div>
      <div class="weather-card__temp">{{ props.temperature }}<span class="weather-card__degree">°</span></div>
    </div>
    <div class="weather-card__desc-footer-row">
      <div class="weather-card__desc">{{ capitalizeFirst(props.description) }}</div>
      <div class="weather-card__footer">
        <span v-if="props.high !== undefined && props.low !== undefined">
          H:{{ props.high }}°&nbsp;&nbsp;&nbsp;L:{{ props.low }}°
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  color: #fff;
  border-radius: 1.2rem;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  overflow: hidden;

  &.current-location {
    background: linear-gradient(135deg, #2563eb 0%, #6366f1 100%);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__location {
    font-size: 1.2rem;
    font-weight: 700;
    &.main {
      font-size: 1.3rem;
    }
  }

  &__time {
    font-size: 1rem;
    opacity: 0.85;
    font-weight: 400;
    margin-bottom: 0.1rem;
  }

  &__sub {
    font-size: 0.9rem;
    opacity: 0.8;
    font-weight: 400;
  }

  &__temp {
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 1;
    margin-left: 0.5rem;
  }

  &__degree {
    font-size: 1.2rem;
    vertical-align: super;
    font-weight: 300;
  }

  &__desc-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin: 0.7rem 0 0.2rem 0;
  }

  &__desc {
    font-size: 1.1rem;
    font-weight: 500;
    opacity: 0.95;
    margin: 0;
  }

  &__footer {
    font-size: 0.95rem;
    opacity: 0.85;
    margin: 0;
  }

  &__location.main {
    font-family: 'SF Pro Display', 'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: 700;
    font-size: 1.5625rem; // 25px
    line-height: 1;
    letter-spacing: -0.01em;
    color: #fff;
  }
}
</style> 