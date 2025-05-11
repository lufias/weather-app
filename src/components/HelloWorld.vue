<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';

const suggestions = ref([
  'Milan, Italy',
  'Milan, TN United States',
  'Milan, MI United States',
  'Milan, OH United States',
  'Milan, IL United States',
]);

const searchValue = ref('');
const selected = ref('');

function handleUpdate(val: string) {
  searchValue.value = val;
}

function handleSelect(val: string) {
  selected.value = val;
}
</script>

<template>
  <!-- <div style="padding: 2rem; max-width: 40rem; margin: auto;"> -->
  <div>
    <SearchBar
      :suggestions="searchValue ? suggestions.filter((s: string) => s.toLowerCase().includes(searchValue.toLowerCase())) : []"
      placeholder="Search city..."
      @update:modelValue="handleUpdate"
      @select="handleSelect"
    />
    <div v-if="selected" style="margin-top: 2rem; font-size: 1.4rem; color: #333;">
      Selected: <strong>{{ selected }}</strong>
    </div>
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
  </div>
</template>
