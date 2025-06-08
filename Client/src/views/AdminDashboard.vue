<template>
  <div class="d-flex">
    <AdminSidebar />
    <div class="d-flex flex-column min-vh-100 flex-grow-1">
      <AdminHeader />
      <main class="container my-4 flex-grow-1">
        <h4 class="text-center">Chào mừng bạn đến với trang Admin</h4>
        <RouterView />
      </main>
      <AdminFooter />
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/Admin/AdminSlidebar.vue'
import AdminHeader from '../components/Admin/AdminHeader.vue'
import AdminFooter from '@/components/Admin/AdminFooter.vue'
import { RouterView } from 'vue-router'
</script>
