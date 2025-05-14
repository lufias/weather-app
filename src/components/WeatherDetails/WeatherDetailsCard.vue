<template>
  <div class="weather-details-card" :class="type">
    <div class="card-icon">🌦️</div>
    <div class="card-temp">20°</div>
    <div class="card-time">7:00 PM</div>
    <div class="card-desc">Rain</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  type: { type: String, default: 'hourly' } // 'hourly' or 'weekly'
});
// More props will be added later
</script>

<style scoped>
.weather-details-card {
  background: #f3f4f6;
  border-radius: 1rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
  min-height: 120px;
  gap: 0.3rem;
}
.weather-details-card.weekly {
  flex-direction: row;
  justify-content: flex-start;
  min-width: 0;
  min-height: 60px;
  padding: 0.8rem 1.2rem;
  gap: 1.2rem;
}
.card-icon {
  font-size: 2rem;
}
.card-temp {
  font-size: 1.1rem;
  font-weight: 600;
}
.card-time {
  font-size: 0.98rem;
  color: #7c7c7c;
}
.card-desc {
  font-size: 0.95rem;
  color: #6366f1;
}
</style> 