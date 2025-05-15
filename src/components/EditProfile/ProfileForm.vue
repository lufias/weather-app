<template>
  <form class="profile-form" data-testid="profile-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Full name</label>
      <input 
        type="text" 
        v-model="formData.name" 
        class="form-input" 
        data-testid="name-input"
        :disabled="disabled" 
      />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input 
        type="email" 
        v-model="formData.email" 
        class="form-input" 
        data-testid="email-input"
        :disabled="disabled" 
      />
    </div>
    <div class="form-group">
      <label>Phone Number</label>
      <div class="phone-input-wrapper">
        <img class="flag" src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f1f2-1f1fe.svg" alt="Malaysian flag" />
        <span class="country-code">+60</span>
        <input 
          type="text" 
          v-model="formData.phone" 
          class="form-input phone-input" 
          data-testid="phone-input"
          :disabled="disabled" 
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { useStore } from 'vuex';
import type { UserProfile } from '../../store/modules/user';

const store = useStore();
const emit = defineEmits(['submit']);

const props = defineProps({
  user: {
    type: Object as () => UserProfile,
    required: true,
    default: () => ({ name: '', email: '', phone: '' })
  },
  disabled: {
    type: Boolean,
    default: true
  }
});

const formData = ref<UserProfile>({
  name: props.user.name,
  email: props.user.email,
  phone: props.user.phone,
  avatar: props.user.avatar
});

watch(() => props.user, (newUser) => {
  formData.value = {
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    avatar: newUser.avatar
  };
}, { deep: true });

async function handleSubmit() {
  if (props.disabled) return;
  
  try {
    await store.dispatch('user/updateProfile', formData.value);
    emit('submit');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
</script>

<style scoped>
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.form-input {
  padding: 0.75rem 0.875rem;
  border: 0.09375rem solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f7f8fa;
  color: #232c47;
  outline: none;
  transition: border 0.2s;
}
.form-input:focus {
  border: 0.09375rem solid #232c47;
}
.form-input:disabled {
  background: #f7f8fa;
  cursor: not-allowed;
  opacity: 0.7;
}
.phone-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.flag {
  width: 1.5em;
  height: 1.5em;
  margin-left: 0.5rem;
  vertical-align: middle;
}
.country-code {
  color: #232c47;
  font-weight: 500;
}
.phone-input {
  flex: 1;
}
</style> 