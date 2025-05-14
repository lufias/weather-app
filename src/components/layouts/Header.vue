<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
</script>

<template>
  <header class="header">
    <div class="header-row">
      <router-link to="/" class="title-link">
        <span class="title">Weather</span>
      </router-link>
      <div class="header-actions">
        <router-link :to="{ name: 'EditProfile' }" class="profile-icon profile-icon-desktop" aria-label="Edit Profile">
          <FontAwesomeIcon :icon="faUserRegular" size="lg" />
        </router-link>
      </div>
    </div>
    <!-- Mobile user icon -->
    <router-link
      :to="{ name: 'EditProfile' }"
      class="profile-icon profile-icon-mobile"
      aria-label="Edit Profile"
    >
      <FontAwesomeIcon :icon="faUserRegular" size="lg" />
    </router-link>
  </header>
</template>

<style scoped>
.header {
  padding: 1rem;
  background: #f8fafc;
  box-shadow: 0 0.125rem 0.5rem 0 rgba(0,0,0,0.04);
  position: relative;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: flex-end;
}

.header-actions :deep(.search-container) {
  flex: 1;
  min-width: 12.5rem;
  max-width: 18.75rem;
}

.profile-icon-desktop {
  margin-left: 0.9375rem;
  display: flex;
}

.profile-icon-mobile {
  display: none;
}

.title-link {
  text-decoration: none;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
}

@media (max-width: 48rem) {
  .header {
    padding: 1.5rem 1rem 1rem 1rem;
    background: white;
    box-shadow: none;
  }
  .header-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  .header-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    width: 100%;
  }
  .profile-icon-desktop {
    display: none;
  }
  .profile-icon-mobile {
    display: flex;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    z-index: 10;
  }
  .header-actions :deep(.search-container) {
    width: 100% !important;
    max-width: none !important;
  }
  .title {
    font-size: 1.8rem;
  }
  :deep(.search-container) {
    display: block !important;
    width: 100% !important;
    max-width: none !important;
  }
}
</style> 