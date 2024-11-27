<script setup>
import LoginComponent from '../components/forms/LoginComponent.vue';
import { loginUser } from '../api/loginApi';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const error = ref(null);

// Function to handle the submitted data
const handleSubmit = async (data) => {
  try {
    // Call the loginUser function from loginApi.js
    const user = await loginUser(data.username, data.password);
    console.log('Logged in user:', user);  // You can display the user info here or take further actions
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.';
  }
};
</script>

<template>
  <div>
    <LoginComponent @submit="handleSubmit" />
    <div v-if="username && password">
      <p>Username: {{ username }}</p>
      <p>Password: {{ password }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
