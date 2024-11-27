<template>
  <a-form layout="vertical">
    <a-form-item name="username" label="Username">
      <a-input v-model:value="username" placeholder="Enter your username" />
      <span v-if="usernameError" class="error-message">{{ usernameError }}</span>
    </a-form-item>

    <a-form-item name="password" label="Password">
      <a-input-password v-model:value="password" placeholder="Enter your password" />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" block @click="validateForm">
        Login
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');

// Define the emit
const emit = defineEmits(['submit']);

const validateForm = () => {
  usernameError.value = username.value ? '' : 'Username is required!';
  passwordError.value = password.value ? '' : 'Password is required!';

  if (!usernameError.value && !passwordError.value) {
    emit('submit', { username: username.value, password: password.value });
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
</style>
