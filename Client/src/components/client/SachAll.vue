<template>
    <h1 class="mb-4"><i class="fa-solid fa-book"></i> Sách</h1>
    <div class="container">
      <div v-if="books.length > 0" class="row  g-4">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3"
          v-for="book in books"
          :key="book.MASACH"
        >
          <sach :book="book" />
        </div>
      </div>
      <div v-else  class="row  g-4">
        <div class="alert alert-info text-center w-100" >
            Hiện tại thư viện không có quyển sách phù hợp với nhu cầu tìm kiếm của bạn.
        </div>
      </div>
    </div>
</template>
<script setup>
import sach from '@/components/client/Sach.vue'
import { onMounted, computed, onUnmounted } from 'vue'
import { useBookStore } from '@/stores/sach.store'

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