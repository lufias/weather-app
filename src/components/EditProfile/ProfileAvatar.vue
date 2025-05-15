<template>
  <div class="avatar-wrapper">
    <img :src="avatar || defaultAvatar" class="avatar-img" alt="Profile avatar" />
    <span v-if="editable" class="edit-icon">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#fff"/>
        <path d="M16.5 7.5l-1-1a1.414 1.414 0 0 0-2 0l-6 6V16h3.5l6-6a1.414 1.414 0 0 0 0-2z" stroke="#232c47" stroke-width="1.5"/>
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const defaultAvatar = 'https://i.imgur.com/1Q9Z1Zm.png'; // Placeholder avatar
const props = defineProps({
  avatar: { type: String, default: '' },
  editable: { type: Boolean, default: false }
});
</script>

<style scoped>
.avatar-wrapper {
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto 12px auto;
}
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.edit-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.10);
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 