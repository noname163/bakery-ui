<template>
  <a-layout-header class="navbar">
    <!-- Logo and Brand Name -->
    <div class="logo">
      <img src="../../assets/logo.svg" alt="Brand Logo" class="logo-image" />
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
          <a-avatar size="large" style="background-color: #87d068">U</a-avatar>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false); // Replace with actual login state logic

const navigateTo = (path) => {
  router.push(path);
};

const logout = () => {
  console.log('User logged out');
  // Perform logout logic here
  isLoggedIn.value = false;
};
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
}

.account-actions {
  display: flex;
  align-items: center;
}
</style>
