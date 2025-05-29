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
    <HeaderView />
    <RouterView />
    <FooterView />
  </div>
</template>
<style>
#app {
  position: relative;
}
</style>