<template>
  <div class="d-flex">
    <AdminSidebar />
    <div class="d-flex flex-column min-vh-100 flex-grow-1" style="margin-left: 250px;">
        <AdminHeader/>  
      <main class="container my-4 flex-grow-1">
        <div v-if="route.name === 'trangchuadmin'">
          <h4 class="text-center">Chào mừng bạn đến với trang Admin</h4>
          <AdminDashboard />
        </div>
        
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
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>
