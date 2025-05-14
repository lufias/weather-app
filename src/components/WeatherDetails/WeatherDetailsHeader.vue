<script setup lang="ts">
  import WeatherDetailsMeta from './WeatherDetailsMeta.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
// Props and logic will be added later
</script>

<template>
  <div class="weather-details-header">
    <!-- Location section with icons -->
    <div class="location-container">
      <button class="icon-button back-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="header-location">Location Name</div>
      <button class="icon-button">
        <FontAwesomeIcon :icon="faTrashAlt" />
      </button>
    </div>
    <div class="header-date">Monday, 20 December 2021</div>
    <div class="header-icon">🌦️</div>
    <div class="header-temp">24° C</div>
    <div class="header-desc">Moderate Rain</div>
    <WeatherDetailsMeta />
  </div>
</template>

<style lang="scss" scoped>
.weather-details-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #4F80FA 0%, #3764D7 50%, #335FD1 100%);
  // gap: 0.5rem;
  color: #fff;
}

.location-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 1rem;
  margin-bottom: 24px;
  padding-top: 29px;

  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;    
    transition: color 0.2s ease;

    &.back-button {
      visibility: hidden; // Hide by default on desktop

      @media (max-width: 768px) {
        visibility: visible; // Show on mobile        
      }
    }

    i {
      font-size: 1.2rem;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      color: #4b5563;
    }
  }

  .header-location {
    font-size: 14px;
    font-weight: 500;
    margin: 0 1rem;
  }
}

.header-date {
  font-size: 14px;
  font-weight: 400;  
  margin-bottom: 24px;
}
.header-icon {
  font-size: 3rem;  
}
.header-temp {
  font-size: 20px;
  font-weight: 400;
}
.header-desc {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
}
</style> 