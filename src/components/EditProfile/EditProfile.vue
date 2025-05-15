<template>
  <div class="edit-profile-container">
    <div class="title-container">
      <button class="back-btn" @click="handleBack">
        <span>&lt;</span>
      </button>
      <h2 class="title">Edit Profile</h2>
    </div>
    <div class="half-circle-bg"></div>
    <ProfileAvatar 
      :editable="isEditMode" 
      :avatar="user.avatar"
      @update:avatar="handleAvatarUpdate"
    />
    <ProfileForm 
      :user="user" 
      :disabled="!isEditMode" 
      @submit="handleSubmit"
    />
    <button class="action-btn" @click="toggleEditMode">
      {{ isEditMode ? 'SUBMIT' : 'EDIT' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProfileAvatar from './ProfileAvatar.vue';
import ProfileForm from './ProfileForm.vue';
import type { UserProfile } from '../../store/modules/user';

const store = useStore();
const router = useRouter();
const isEditMode = ref(false);

const user = computed<UserProfile>(() => store.getters['user/profile']);

onMounted(async () => {
  await store.dispatch('user/loadProfile');
});

function toggleEditMode() {
  if (isEditMode.value) {
    // If we're in edit mode and clicking the button, trigger form submit
    const form = document.querySelector('form');
    if (form) form.dispatchEvent(new Event('submit'));
  } else {
    // If we're not in edit mode, enter edit mode
    isEditMode.value = true;
  }
}

async function handleAvatarUpdate(base64: string) {
  if (!isEditMode.value) return;
  
  try {
    await store.dispatch('user/updateProfile', { avatar: base64 });
  } catch (error) {
    console.error('Error updating avatar:', error);
  }
}

function handleSubmit() {
  isEditMode.value = false;
}

function handleBack() {
  router.back();
}
</script>

<style scoped>
.edit-profile-container {
  max-width: 25rem;
  margin: 0 auto;
  padding: 2rem 0;
  padding-top: 0;
  background: #fff;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  /* background: rgba(255,0,0,0.2);  */
}
.title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.back-btn {
  position: absolute;
  left: 1rem;
  top: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  visibility: hidden;
}
.action-btn {
  width: calc(100% - 2rem);
  margin: 2rem 1rem;
  padding: 1rem 0;
  background: #232c47;
  color: #fff;
  border: none;
  border-radius: 0.625rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.0625rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #2d3a5f;
}

.half-circle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7.5rem;
  background: linear-gradient(180deg, #f5f8ff 80%, rgba(245,248,255,0) 100%);
  border-bottom-left-radius: 100% 2.8125rem;
  border-bottom-right-radius: 100% 45px;
  z-index: 1;
}

.ProfileAvatar, .profile-avatar, .avatar-wrapper {
  position: relative;
  z-index: 2;
}

@media screen and (max-width: 768px) {
  .edit-profile-container {
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  }
  .back-btn {
    visibility: visible;
  }
}
</style> 