<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
</script>

<template>
  <header class="header">
    <router-link to="/" class="title-link">
      <span class="title">Weather</span>
    </router-link>
    <router-link :to="{ name: 'EditProfile' }" class="profile-icon" aria-label="Edit Profile">
      <FontAwesomeIcon :icon="faUserRegular" size="lg" />
    </router-link>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 1rem 1.5rem;
  background: white;
}

.title-link {
  text-decoration: none;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
}

.profile-icon {
  display: flex;
  align-items: center;
  color: #2c3e50;
  text-decoration: none;
}

.profile-icon:visited,
.profile-icon:active {
  color: #2c3e50;
}
</style> 