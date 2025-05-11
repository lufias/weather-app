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
import { defineProps } from 'vue';

const props = defineProps({
  location: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  high: { type: Number, required: false },
  low: { type: Number, required: false },
  isCurrentLocation: { type: Boolean, default: false },
});
</script>

<template>
  <div class="weather-card" :class="{ 'current-location': props.isCurrentLocation }">
    <div class="weather-card__header">
      <div>
        <div class="weather-card__location main">
          <span v-if="props.isCurrentLocation">My Location</span>
          <span v-else>{{ props.location }}</span>
        </div>
        <div class="weather-card__sub">{{ props.location }}</div>
      </div>
      <div class="weather-card__temp">{{ props.temperature }}<span class="weather-card__degree">°</span></div>
    </div>
    <div class="weather-card__desc-footer-row">
      <div class="weather-card__desc">{{ props.description }}</div>
      <div class="weather-card__footer">
        <span v-if="props.high !== undefined && props.low !== undefined">
          H:{{ props.high }}°  L:{{ props.low }}°
        </span>
      </div>
    </div>
    <div class="weather-card__icon">
      <!-- Placeholder for weather icon -->
      <svg width="2.5rem" height="2.5rem" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" fill="#e0e7ff" />
        <ellipse cx="24" cy="28" rx="10" ry="6" fill="#a5b4fc" />
        <ellipse cx="30" cy="22" rx="8" ry="5" fill="#fbbf24" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather-card {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
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

  &__icon {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    opacity: 0.25;
    pointer-events: none;
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