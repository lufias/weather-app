<script setup lang="ts">
import WeatherCard from './WeatherCard.vue';
</script>

<template>
  <div>
    <WeatherCard
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
    />
  </div>
</template>
