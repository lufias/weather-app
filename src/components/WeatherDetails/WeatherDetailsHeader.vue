<template>
  <div class="weather-details-header">
    <!-- Location section with icons -->
    <div class="location-container">
      <button class="icon-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="header-location">Location Name</div>
      <button class="icon-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
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

.location-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
  transition: color 0.2s ease;
}

.icon-button:hover {
  color: #4b5563;
}

.header-location {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 1rem;
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