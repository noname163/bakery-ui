<template>
  <LoginComponent @submit="handleSubmit" />
</template>

<script setup>
import { loginUser } from '@/api/loginApi';
import LoginComponent from '@/components/forms/LoginComponent.vue';
import router from '@/router';
import { notification } from 'ant-design-vue';
import { jwtDecode } from 'jwt-decode';
import { ref, h } from 'vue';

const error = ref(null);

// Function to handle the submitted data
const handleSubmit = async (data) => {
  try {
    // Call the loginUser function from loginApi.js
    const user = await loginUser(data.username, data.password);
    const tokenData = jwtDecode(user.accessToken)
    console.log('Logged in user:', tokenData);
    router.push('/')
    notification.success({
      message: 'Login Successful',
      description: `Welcome back, ${user.name}!`,
    });

  } catch (err) {
    error.value = 'Login failed. Please check your credentials.';
    console.log("Error ", err);

    // Using Vue's `h` to create a complex VNode
    notification.error({
      message: 'Login Failed',
      description: h('div', [
        h('strong', 'Additional Information:'),
        h('p', 'Please ensure your credentials are correct and try again.'),
      ]),
    });
  }
};
</script>
