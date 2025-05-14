<template>
  <div class="weather-details-header">
    <!-- Location, date, weather icon, temperature, description -->
    <div class="header-location">Location Name</div>
    <div class="header-date">Monday, 20 December 2021</div>
    <div class="header-icon">🌦️</div>
    <div class="header-temp">24° C</div>
    <div class="header-desc">Moderate Rain</div>
  </div>
</template>

<script setup lang="ts">
// Props and logic will be added later
</script>

<style scoped>
.weather-details-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.header-location {
  font-size: 1.2rem;
  font-weight: 600;
}
.header-date {
  font-size: 1rem;
  color: #7c7c7c;
}
.header-icon {
  font-size: 3rem;
  margin: 0.5rem 0;
}
.header-temp {
  font-size: 2rem;
  font-weight: 500;
}
.header-desc {
  font-size: 1.1rem;
  font-weight: 400;
  color: #6366f1;
}
</style> 