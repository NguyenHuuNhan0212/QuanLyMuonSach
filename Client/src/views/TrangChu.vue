<script setup>
import sach from '@/components/client/sach.vue'
import slider from '@/components/client/slider.vue'
import { onMounted, computed, onUnmounted } from 'vue'
import { useBookStore } from '@/stores/sach.store'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const bookStore = useBookStore()
onMounted(() => {
  bookStore.getAll()
})
onUnmounted(() => {
  bookStore.searchMode=''
  bookStore.searchText = ''
})
const books = computed(() => {
  if(bookStore.searchMode === 'author'){
    return bookStore.getBooksFormAuthor(bookStore.searchText)
  }
  else if(bookStore.searchMode === 'bookName'){
    return bookStore.getBooksFormName(bookStore.searchText)
  }
  else if(bookStore.searchMode === 'publisherName'){
    return bookStore.getBooksFormPublisher(bookStore.searchText)
  }
  else if(bookStore.searchMode === 'publisherYear'){
    return bookStore.getBooksFormPublisherYear(bookStore.searchText)
  }
  else{
    return bookStore.getBooksFormAll(bookStore.searchText)
  }
})
</script>

<template>
  <AppHeader />
  <main class="container mt-5 pt-5">
    <slider />
    <hr class="container mt-5" />
    <h1 class="text-center mb-4">Danh sách sách</h1>

    <div class="container">
      <div class="row  g-4">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3"
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

<style scoped>


</style>