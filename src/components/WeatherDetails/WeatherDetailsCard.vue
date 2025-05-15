<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { HourlyForecast, DailyForecast } from '../../store/modules/weather';

const props = defineProps<{
  type: 'hourly' | 'weekly';
  data: HourlyForecast | DailyForecast;
}>();

const formattedTime = computed(() => {
  const date = new Date(props.data.dt * 1000);
  if (props.type === 'hourly') {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short'
    });
  }
});

const fullDay = computed(() => {
  if (props.type === 'weekly') {
    const date = new Date(props.data.dt * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  return '';
});

const isHourly = computed(() => props.type === 'hourly');

const hourlyTemp = computed(() => {
  if (props.type === 'hourly') {
    return Math.round((props.data as HourlyForecast).temp);
  }
  return null;
});

const dailyTemp = computed(() => {
  if (props.type === 'weekly') {
    const dailyData = props.data as DailyForecast;
    return {
      max: Math.round(dailyData.temp.max),
      min: Math.round(dailyData.temp.min)
    };
  }
  return null;
});

const weatherIcon = computed(() => {
  return `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;
});
</script>

<template>
  <div
    class="weather-details-card"
    :class="{ weekly: type === 'weekly' }"
  >
    <template v-if="type === 'weekly'">
      <div class="weekly-left">
        <div class="icon-circle">
          <img :src="weatherIcon" :alt="props.data.weather[0].description" />
        </div>
        <div class="weekly-info">
          <div class="weekly-day">{{ fullDay }}</div>
          <div class="weekly-desc">{{ props.data.weather[0].main }}</div>
        </div>
      </div>
      <div class="weekly-right">
        <span class="weekly-temp">{{ dailyTemp?.max }}º C</span>
        <span class="weekly-arrow">&#9654;</span>
      </div>
    </template>
    <template v-else>
      <div class="card-icon">
        <img :src="weatherIcon" :alt="props.data.weather[0].description" />
      </div>
      <div class="card-temp">{{ hourlyTemp }}°</div>
      <div class="card-time">{{ formattedTime }}</div>
    </template>
  </div>
</template>

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
  background: #dbe6ff;
  flex-direction: row;
  align-items: center;
  min-height: 80px;
  min-width: 0;
  padding: 1.2rem 2rem;
  justify-content: space-between;
  gap: 0;
}

.weekly-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.icon-circle {
  background: #b6caff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-circle img {
  width: 32px;
  height: 32px;
}
.weekly-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.weekly-day {
  font-size: 14px;
  font-weight: 600;
  color: #222;
}
.weekly-desc {
  font-size: 13px;
  color: #201C1C;
  font-weight: 400;
  margin-top: 0.1rem;
}
.weekly-right {
  display: flex;
  align-items: center;  
}
.weekly-temp {
  font-size: 14px;
  font-weight: 600;
  color: #201C1C;
}
.weekly-arrow {
  font-size: 13px;
  color: #222;
  margin-left: 0.2rem;
}
.card-icon {
  font-size: 2rem;
}
.card-icon img {
  width: 50px;
  height: 50px;
}
.card-temp {
  font-size: 14px;
  font-weight: 600;
  color: #201C1C;
}
.card-time {
  font-size: 12px;
  font-weight: 400;
  color: #494343;
}
</style> 