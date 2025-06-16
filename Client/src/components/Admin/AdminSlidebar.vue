<template>
  <div class="sidebar bg-light p-3" data-aos="fade-right">
    <h5 class="mb-4">
      <router-link
        class="nav-link-home"
        :to="{ name: 'trangchuadmin' }"
      >
        <img src="@/assets/logo.jpg" alt="Logo" width="50" height="50" class="me-2 logo" />
        Quản trị
      </router-link>
    </h5>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <router-link
          class="nav-link"
          :to="{ name: 'trangchuadmin' }"
          :class="{ 'router-active': route.name?.includes('trangchuadmin') }"
        >
          <i class="fa-solid fa-chart-simple"></i> Tổng quan
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link
          class="nav-link"
          :to="{ name: 'quanlysach' }"
          :class="{ 'router-active': route.name?.includes('quanlysach')}"
        >
          <i class="fas fa-book me-2"></i> Quản lý sách
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link
          class="nav-link"
          :to="{ name: 'quanlymuonsach' }"
          :class="{ 'router-active': route.name?.includes('quanlymuonsach')  }"
        >
          <i class="fas fa-tasks me-2"></i> Quản lý mượn sách
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link
          class="nav-link"
          :to="{ name: 'quanlynxb' }"
          :class="{ 'router-active': route.name?.includes('quanlynxb') }"
        >
          <i class="fas fa-building me-2"></i> Quản lý nhà xuất bản
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link
          class="nav-link"
          :to="{ name: 'quanlydocgia' }"
          :class="{ 'router-active': route.name?.includes('quanlydocgia')}"
        >
          <i class="fa-solid fa-users"></i> Quản lý độc giả
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link
          class="nav-link"
          :to="{ name: 'trangcanhanadmin' }"
          :class="{ 'router-active': route.name?.includes('trangcanhanadmin') }"
        >
         <i class="fa-solid fa-user me-2"></i> Tài khoản
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  border-right: 1px solid #ddd;
  background-color: #f8f9fa;
  padding: 1rem;
  z-index: 1000;
  overflow-y: auto;
}

.nav-link, .nav-link-home {
  color: #333;
  text-decoration: none;
}
.nav-link:hover {
  color: #007bff;
}
.logo{
  border-radius: 30px;
}
.router-active{
  color: #007bff !important;
  background-color: #e9ecef;
  font-weight: 600
}
</style>

<script setup>
import { useRoute } from 'vue-router';

 
const route = useRoute()
</script>