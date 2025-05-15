<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';

interface SuggestionItem {
  label: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

const props = defineProps<{
  suggestions: SuggestionItem[];
  placeholder?: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'select', value: SuggestionItem): void;
}>();

const inputValue = ref('');
const showSuggestions = ref(false);
const searchBarRef = ref<HTMLElement | null>(null);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

function onInput() {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    emit('update:modelValue', inputValue.value);
  }, 300);
}

function selectSuggestion(suggestion: SuggestionItem) {
  emit('select', suggestion);
  inputValue.value = '';
  emit('update:modelValue', '');
  showSuggestions.value = false;
}

function clearInput() {
  inputValue.value = '';
  emit('update:modelValue', '');
  showSuggestions.value = false;
}

function handleClickOutside(event: MouseEvent) {
  setTimeout(() => {
    if (searchBarRef.value && !searchBarRef.value.contains(event.target as Node)) {
      showSuggestions.value = false;
    }
  }, 120); // Delay to allow click event on suggestion to register
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

watch(() => props.suggestions, (newVal) => {
  if (!newVal.length) showSuggestions.value = false;
  else if (document.activeElement === searchBarRef.value?.querySelector('input') && inputValue.value) {
    showSuggestions.value = true;
  }
});
</script>

<template>
  <div class="search-bar" ref="searchBarRef">
    <div class="search-input-wrapper">
      <input
        v-model="inputValue"
        @input="onInput"
        @focus="showSuggestions = !!inputValue && !!props.suggestions.length"
        type="text"
        class="search-input"
        :placeholder="placeholder"
      />
      <span class="search-icon">
        <i class="fa fa-search" aria-hidden="true"></i>
      </span>
      <button v-if="inputValue" class="clear-btn" @click="clearInput" aria-label="Clear">
        ×
      </button>
    </div>
    <ul v-if="showSuggestions && suggestions.length" class="suggestions-list">
      <li
        v-for="(suggestion, idx) in suggestions"
        :key="idx"
        class="suggestion-item"
        @click="selectSuggestion(suggestion)"
      >
        <span class="city">{{ suggestion.city }}</span>
        <span v-if="suggestion.state" class="state-country">, {{ suggestion.state }}, {{ suggestion.country }}</span>
        <span v-else class="state-country">, {{ suggestion.country }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// Color variables
$input-bg: #f7f8fa;
$input-border: #ccc;
$input-radius: 0.6rem;
$input-focus: #007aff;
$search-color: #8C939D;
$placeholder-color: rgba(0, 0, 0, 0.5);
$clear-btn-size: 1.8rem;
$suggestion-hover: #f5f5f5;
$scrollbar-thumb: #d1d5db;
$scrollbar-track: #f7f8fa;

.search-bar {
  position: relative;
  width: 100%;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.6rem 2.6rem 0.6rem 3.6rem;
  font-family: 'SF Pro Display', Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1;
  letter-spacing: -0.03125rem;
  color: #000;
  border: 0.0625rem solid $input-border;
  border-radius: $input-radius;
  outline: none;
  transition: border 0.2s;
  background: $input-bg;

  &::placeholder {
    color: $placeholder-color;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }

  &:focus {
    border-color: $input-focus;
  }
}

.search-icon {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  .fa-search {
    font-size: 1.3rem;
    color: $search-color;
  }
}

.clear-btn {
  position: absolute;
  right: 0.8rem;
  background: none;
  border: 0.0625rem solid $search-color;
  font-size: 0.875rem;
  color: $search-color;
  cursor: pointer;
  padding: 0;
  line-height: 0;
  width: $clear-btn-size;
  height: $clear-btn-size;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
  padding-bottom: 0.2rem;

  &:hover,
  &:focus {
    background: $input-bg;
  }
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 0.0625rem solid #eee;
  border-radius: $input-radius;
  margin-top: 0.4rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0,0,0,0.08);
  z-index: 10;
  list-style: none;
  padding: 0;
  max-height: 20rem;
  overflow-y: auto;

  // Modern scrollbar styles
  scrollbar-width: thin;
  scrollbar-color: $scrollbar-thumb $scrollbar-track;

  &::-webkit-scrollbar {
    width: 0.6rem;
    background: $scrollbar-track;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: $scrollbar-thumb;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background: $scrollbar-track;
    border-radius: 1rem;
  }
}

.suggestion-item {
  padding: 1.2rem 1.6rem;
  font-family: 'SF Pro Display', Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: background 0.2s;
  color: #222;

  &:hover {
    background: $suggestion-hover;
  }
  .city {
    font-weight: 500;
  }
  .state-country {
    font-weight: 500;
    color: #888;
    margin-left: 0.125rem;
  }
}
</style> 