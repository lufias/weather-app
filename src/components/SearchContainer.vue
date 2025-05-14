<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
import store from '../store';

interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

interface SuggestionItem {
  label: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

const suggestions = ref<SuggestionItem[]>([]);
const searchValue = ref('');
const API_KEY = 'a8bcd4ef1794d3d95d4ec15f5f5a15dc';

async function fetchCitySuggestions(query: string) {
  if (!query.trim()) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    const data = await response.json();
    suggestions.value = data.map((city: CitySuggestion) => {
      const label = [city.name, city.state, city.country].filter(Boolean).join(', ');
      return {
        label,
        city: city.name,
        state: city.state,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      };
    });
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    suggestions.value = [];
  }
}

function handleUpdate(val: string) {
  searchValue.value = val;
  fetchCitySuggestions(val);
}

async function handleSelect(val: SuggestionItem) {
  console.log('Selected city:', val);
  await store.dispatch('locations/addLocation', {
    city: val.city,
    state: val.state,
    country: val.country,
    lat: val.lat,
    lon: val.lon
  });
}
</script>

<template>
  <div class="search-container">
    <SearchBar
      :suggestions="suggestions"
      placeholder="Search city..."
      @update:modelValue="handleUpdate"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.search-container {
  width: 300px;
}

@media (max-width: 768px) {
  .search-container {
    display: none;
  }
}
</style> 