<template>
    <AppHeader />
    <main class="mt-5 pt-5">
        <MauDangKyNguoiDung />
    </main>
    <AppFooter />
</template>
<script setup>  
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import MauDangKyNguoiDung from '@/components/MauDangKyNguoiDung.vue';
</script>