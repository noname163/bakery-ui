<template>
  <LoginComponent @submit="handleSubmit" />
</template>
<script setup>
import { loginUser } from '@/api/loginApi';
import LoginComponent from '@/components/forms/LoginComponent.vue';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const error = ref(null);

// Function to handle the submitted data
const handleSubmit = async (data) => {
  try {
    // Call the loginUser function from loginApi.js
    const user = await loginUser(data.username, data.password);
    console.log('Logged in user:', user);
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.';
  }
};
</script>
