<script setup>
import sach from '@/components/sach.vue'
import slider from '@/components/slider.vue'
import { onMounted, computed } from 'vue'
import { useBookStore } from '@/stores/sach.store'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const bookStore = useBookStore()
onMounted(() => {
  bookStore.getAll()
})
const books = computed(() => {
  return bookStore.getBooksFormName(bookStore.searchText)
})
</script>

<template>
  <AppHeader />
  <main class="container mt-5 pt-5">
    <slider />
    <hr class="container mt-5" />
    <h1 class="text-center mb-4">Danh sách sách</h1>

    <div class="container">
      <div class="row">
        <div
          class="col-md-3 mb-4"
          v-for="book in books"
          :key="book.MASACH"
        >
          <sach :book="book" />
        </div>
      </div>
    </div>
  </main>
  <AppFooter />
</template>

<style>
</style>
