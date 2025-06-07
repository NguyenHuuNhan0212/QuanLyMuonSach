<template>
    <div class="d-flex">
        <AdminSidebar />
        <div class="flex-grow-1">
            <AdminHeader />
            <div class="container mt-4">
                <h4 class="text-center">Chào mừng bạn đến với trang Admin</h4>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminSidebar from '../components/Admin/AdminSlidebar.vue'
import AdminHeader from '../components/Admin/AdminHeader.vue'
import { RouterView } from 'vue-router'
</script>
