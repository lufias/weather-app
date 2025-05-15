<template>
  <div class="profile-info">
    <div class="profile-name">{{ user.name }}</div>
    <div class="profile-contact">{{ user.email }} | {{ user.phone }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({ name: '', email: '', phone: '' })
  }
});
</script>

<style scoped>
.profile-info {
  text-align: center;
  margin-bottom: 1.5rem;
}
.profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.profile-contact {
  color: #555;
  font-size: 1rem;
  letter-spacing: 0.0125rem;
}
</style> 