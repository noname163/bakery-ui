<template>
  <a-layout>
    <a-header class="header">
      <HeaderComponent :isLoggedIn="isLogin" />
    </a-header>

    <!-- Dynamic Body -->
    <a-layout-content class="content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </a-layout-content>

    <!-- Footer -->
    <a-layout-footer class="footer">
      ©2024 My Company. All rights reserved.
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import HeaderComponent from '@/components/layouts/headerComponent.vue';
import { ref, onMounted } from 'vue';
const isLogin = ref(false);

const checkLoginStatus = () => {
  console.log("Check login")
  const token = localStorage.getItem('accessToken');
  console.log("Token ", token)
  if (token != null && token.length > 0) {
    isLogin.value = true;
  }
  console.log("IsLogin ", isLogin.value)
};

// Run the function on component creation
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
/* Global Layout Styling */
a-layout {
  min-height: 100%;
}

/* Header Styling */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001529;
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
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.menu {
  flex-grow: 1;
  justify-content: flex-end;
}

/* Content Styling */
.content {
  padding: 24px;
  background-color: #f0f2f5;
}

/* Footer Styling */
.footer {
  text-align: center;
  background-color: #001529;
  color: #fff;
  padding: 12px 20px;
}
</style>
