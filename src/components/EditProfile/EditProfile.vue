<template>
  <div class="edit-profile-container">
    <div class="title-container">
      <button class="back-btn"> <!-- Placeholder for back navigation -->
        <span>&lt;</span>
      </button>
      <h2 class="title">Edit Profile</h2>
    </div>
    <ProfileAvatar :editable="isEditMode" />
    <ProfileForm :user="user" :disabled="!isEditMode" />
    <button class="action-btn" @click="toggleEditMode">
      {{ isEditMode ? 'SUBMIT' : 'EDIT' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfileAvatar from './ProfileAvatar.vue';
import ProfileForm from './ProfileForm.vue';

const isEditMode = ref(false);
const user = ref({
  name: 'Jane Doe',
  email: 'jane@gmail.com',
  phone: '+01 234 567 89',
  avatar: '',
});

function toggleEditMode() {
  isEditMode.value = !isEditMode.value;
}
</script>

<style scoped>
.edit-profile-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 32px 16px;
  background: #fff;
  border-radius: 16px;
  position: relative;
}



.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 24px;
}
.back-btn {
  position: absolute;
  left: 16px;
  top: 32px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  visibility: hidden;
}
.action-btn {
  width: 100%;
  margin-top: 32px;
  padding: 16px 0;
  background: #232c47;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
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