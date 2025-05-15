<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
import store from '../store';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { API_KEY, API_ENDPOINTS } from '../config/api';

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

async function fetchCitySuggestions(query: string) {
  if (!query.trim()) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await fetch(
      `${API_ENDPOINTS.geocoding}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
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
  const result = await store.dispatch('locations/addLocation', {
    city: val.city,
    state: val.state,
    country: val.country,
    lat: val.lat,
    lon: val.lon
  });
  if (result && result.status === 'duplicate') {
    toast.warn('Location already exists!');
    return;
  }
  // Reload locations to get the new ID and update UI
  await store.dispatch('locations/loadLocations');
}
</script>

<template>
  <div class="search-container">
    <SearchBar
      :suggestions="suggestions"
      placeholder="Search for a city or airport"
      @update:modelValue="handleUpdate"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}
</style> 