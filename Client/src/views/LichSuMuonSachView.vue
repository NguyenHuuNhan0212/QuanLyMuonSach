<template>
    <AppHeader />
    <main class="container mt-5 pt-5">
        <LichSuMuonSach />
    </main>
    <AppFooter />
</template>
<script setup>
import LichSuMuonSach from '@/components/client/LichSuMuonSach.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>