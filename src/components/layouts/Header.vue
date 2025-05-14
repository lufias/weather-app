<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import SearchContainer from '../SearchContainer.vue';

</script>

<template>
  <header class="header">
    <router-link to="/" class="title-link">
      <span class="title">Weather</span>
    </router-link>
    <div class="header-right">
      <SearchContainer />
      <router-link :to="{ name: 'EditProfile' }" class="profile-icon" aria-label="Edit Profile">
        <FontAwesomeIcon :icon="faUserRegular" size="lg" />
      </router-link>
    </div>
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

.header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
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

@media (max-width: 768px) {
  .header {
    padding: 1.5rem 1rem 1rem 1rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
}
</style> 