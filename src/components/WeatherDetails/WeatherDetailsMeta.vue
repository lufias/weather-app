<template>
  <div class="weather-details-meta">
    <!-- Last update and meta info -->
    <div class="meta-update">
      Last Update {{ formattedTime }}
      <FontAwesomeIcon :icon="faArrowsRotate" class="meta-refresh" @click="handleRefresh" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import type { CurrentWeather } from '../../store/modules/weather';
import { computed } from 'vue';

const props = defineProps<{
  currentWeather: CurrentWeather;
}>();

const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const formattedTime = computed(() => {
  const date = new Date(props.currentWeather.dt * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  });
});

const handleRefresh = () => {
  emit('refresh');
};
</script>

<style scoped>
.weather-details-meta {
  width: 100%;
  padding: 0 1rem;
}

.meta-update {
  text-align: center;  
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.meta-refresh {
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(45deg);
  }
}
</style> 