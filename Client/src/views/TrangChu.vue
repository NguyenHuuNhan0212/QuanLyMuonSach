<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import slider from '@/components/client/slider.vue';
import sachAll from '@/components/client/SachAll.vue';
import { RouterView, RouterLink, useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <AppHeader />
  <main class="container mt-5 pt-5">
    <slider />
    <div class="mt-5 tab-wrapper">
      <router-link :to="{name: 'trangchu'}" class="tab-link" :class="{active: route.name === 'trangchu'}">Tất cả sách</router-link>
      <router-link :to="{name: 'sachmoinhat'}" class="tab-link" :class="{active: route.name === 'sachmoinhat'}">Sách mới nhất</router-link>
      <router-link :to="{name: 'sachhot'}" class="tab-link" :class="{active: route.name === 'sachhot'}">Nổi bật</router-link>
    </div>
   
    <hr class="container" />
    <sachAll v-if="route.name === 'trangchu'" />
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.tab-wrapper {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

.tab-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding-bottom: 6px;
  position: relative;
}

.tab-link.active {
  color: #2f6652; /* màu xanh nhẹ giống ảnh */
}

.tab-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: #2f6652;
}

</style>