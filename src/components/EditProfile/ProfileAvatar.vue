<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';
import defaultAvatarImg from '../../assets/avatar.png';

const props = defineProps({
  avatar: { 
    type: String, 
    default: '' 
  },
  editable: { 
    type: Boolean, 
    default: false 
  }
});

const emit = defineEmits(['update:avatar']);
const fileInput = ref<HTMLInputElement | null>(null);

const displayAvatar = computed(() => {
  return props.avatar || defaultAvatarImg;
});

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  if (!file.type.startsWith('image/')) {
    console.error('Please select an image file');
    return;
  }

  try {
    const base64 = await convertToBase64(file);
    emit('update:avatar', base64);
  } catch (error) {
    console.error('Error processing image:', error);
  }

  // Clear the input so the same file can be selected again
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
</script>

<template>
  <div class="avatar-wrapper" data-testid="avatar-wrapper">
    <img :src="displayAvatar" class="avatar-img" data-testid="avatar-image" alt="Profile avatar" />
    <input 
      v-if="editable"
      type="file"
      accept="image/*"
      class="file-input"
      data-testid="avatar-input"
      ref="fileInput"
      @change="handleFileChange"
    />
    <button v-if="editable" class="edit-icon" data-testid="edit-avatar-button" @click="triggerFileInput">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#fff"/>
        <path d="M16.5 7.5l-1-1a1.414 1.414 0 0 0-2 0l-6 6V16h3.5l6-6a1.414 1.414 0 0 0 0-2z" stroke="#232c47" stroke-width="1.5"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.avatar-wrapper {
  position: relative;
  width: 6.875rem;
  height: 6.875rem;
  margin: 0 auto 0.75rem auto;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 0.25rem solid #fff;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.07);
}

.file-input {
  display: none;
}

.edit-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0.0625rem 0.25rem rgba(0,0,0,0.10);
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: transform 0.2s ease;
}

.edit-icon:hover {
  transform: scale(1.1);
}
</style> 