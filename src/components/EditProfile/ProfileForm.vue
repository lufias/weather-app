<template>
  <form class="profile-form">
    <div class="form-group">
      <label>Full name</label>
      <input type="text" :value="user.name" class="form-input" :disabled="disabled" />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" :value="user.email" class="form-input" :disabled="disabled" />
    </div>
    <div class="form-group">
      <label>Phone Number</label>
      <div class="phone-input-wrapper">
        <img class="flag" src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f1f2-1f1fe.svg" alt="Malaysian flag" />
        <span class="country-code">+60</span>
        <input type="text" :value="user.phone" class="form-input phone-input" :disabled="disabled" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({ name: '', email: '', phone: '' })
  },
  disabled: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-input {
  padding: 12px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f8fa;
  color: #232c47;
  outline: none;
  transition: border 0.2s;
}
.form-input:focus {
  border: 1.5px solid #232c47;
}
.phone-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.flag {
  width: 1.5em;
  height: 1.5em;
  margin-left: 8px;
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