<template>
  <div class="weather-details-card">
    <div class="details-title">Weather Details</div>
    <div class="details-placeholder">
      <span class="details-icon">🌦️</span>
      Select a weather card to see details here.
    </div>
  </div>
</template>

<script setup lang="ts">
// Placeholder for weather details logic
</script>

<style scoped>
.weather-details-card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 2.5rem 2rem;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
}

.details-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.details-placeholder {
  color: #b0b3b8;
  font-size: 1.1rem;
  text-align: center;
}

.details-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 0.7rem;
}
</style> 