<template>
  <div class="search-bar" ref="searchBarRef">
    <div class="search-input-wrapper">
      <input
        v-model="inputValue"
        @input="onInput"
        @focus="showSuggestions = true"
        type="text"
        class="search-input"
        :placeholder="placeholder"
      />
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
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  suggestions: string[];
  placeholder?: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'select', value: string): void;
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

function selectSuggestion(suggestion: string) {
  inputValue.value = suggestion;
  emit('select', suggestion);
  showSuggestions.value = false;
}

function clearInput() {
  inputValue.value = '';
  emit('update:modelValue', '');
  showSuggestions.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (searchBarRef.value && !searchBarRef.value.contains(event.target as Node)) {
    showSuggestions.value = false;
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

watch(() => props.suggestions, (newVal) => {
  if (!newVal.length) showSuggestions.value = false;
});
</script>

<style lang="scss" scoped>
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
  padding: 1rem 2.5rem 1rem 1rem;
  font-family: 'SF Pro Display', Arial, sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1;
  letter-spacing: 0.03em;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  outline: none;
  transition: border 0.2s;
  background: #f7f8fa;
}

.search-input:focus {
  border-color: #007aff;
}

.clear-btn {
  position: absolute;
  right: 0.8rem;
  background: none;
  border: 0.2rem solid #d1d5db;
  font-size: 1.6rem;
  color: #d1d5db;
  cursor: pointer;
  padding: 0;
  line-height: 0;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
  padding-bottom: 0.2rem;
}

.clear-btn:hover, .clear-btn:focus {
  background: #f7f8fa;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.6rem;
  margin-top: 0.4rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0,0,0,0.08);
  z-index: 10;
  list-style: none;
  padding: 0;
  max-height: 20rem;
  overflow-y: auto;

  /* Modern scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f7f8fa;
}

.suggestions-list::-webkit-scrollbar {
  width: 0.6rem;
  background: #f7f8fa;
  border-radius: 1rem;
}

.suggestions-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 1rem;
}

.suggestions-list::-webkit-scrollbar-track {
  background: #f7f8fa;
  border-radius: 1rem;
}

.suggestion-item {
  padding: 1.2rem 1.6rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-item:hover {
  background: #f5f5f5;
}

.search-input::placeholder {
  color: rgba(0, 0, 0, 0.5);
  font-family: 'SF Pro Display', Arial, sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1;
  letter-spacing: 0.03em;
}
</style> 