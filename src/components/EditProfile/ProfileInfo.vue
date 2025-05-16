<template>
  <div class="profile-info" data-testid="profile-info">
    <div class="profile-name" data-testid="profile-name">{{ user.name }}</div>
    <div class="profile-contact" data-testid="profile-contact">{{ user.email }} | {{ user.phone }}</div>
  </div>
</template>

<script setup lang="ts">
interface User {
  name: string;
  email: string;
  phone: string;
}

defineProps<{
  user: User;
}>();
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