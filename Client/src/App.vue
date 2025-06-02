<script>
import { RouterView } from 'vue-router';
import HeaderView from './components/AppHeader.vue'
import FooterView from './components/AppFooter.vue'
export default {
  components: {
    RouterView,
    HeaderView,
    FooterView,
  },
}
</script>
<template>
  <div id="app">
    <header class="fixed-top">
       <HeaderView />
    </header>
    <main class="container mt-5 pt-5">
      <RouterView />
    </main>
    <FooterView />
  </div>
</template>
<style>
#app {
  position: relative;
}
</style>