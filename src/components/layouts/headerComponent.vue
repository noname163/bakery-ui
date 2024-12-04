<template>
  <a-layout-header class="navbar">
    <!-- Logo and Brand Name -->
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Brand Logo" class="logo-image" />
      <span class="brand-name">My Company</span>
    </div>

    <!-- Navigation Menu -->
    <a-menu mode="horizontal" theme="dark" class="menu">
      <a-menu-item key="employees" @click="navigateTo('/employees')">Employees</a-menu-item>
      <a-menu-item key="materials" @click="navigateTo('/materials')">Materials</a-menu-item>
    </a-menu>

    <!-- Account Actions -->
    <div class="account-actions">
      <template v-if="isLoggedIn">
        <a-dropdown>
          <a-avatar size="large" style="background-color: #87d068">{{ username }}</a-avatar>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item key="profile" @click="navigateTo('/profile')">
                <a>Profile</a>
              </a-menu-item>
              <a-menu-item key="settings" @click="navigateTo('/settings')">
                <a>Settings</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="logout">
                <a>Logout</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <template v-else>
        <a-button type="primary" @click="navigateTo('/login')">Login</a-button>
      </template>
    </div>
  </a-layout-header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineEmits, watch, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const emit = defineEmits(['update:isLoggedIn']);

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
});

const username = ref(''); // To store the decoded username

const navigateTo = (path) => {
  router.push(path);
};

const logout = () => {
  localStorage.removeItem('accessToken');
  emit('update:isLoggedIn', false);
  navigateTo('/login');
};

// Watcher for isLoggedIn
watch(
  () => props.isLoggedIn,
  (newValue) => {
    if (newValue) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          username.value = decoded.username || 'User'; // Adjust based on the token's payload structure
        } catch (err) {
          console.error('Error decoding token:', err);
        }
      }
    } else {
      username.value = ''; // Clear username on logout
    }
  },
  { immediate: true } // Trigger the watcher immediately on component load
);
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.brand-name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.menu {
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.account-actions {
  display: flex;
  align-items: center;
}
</style>
