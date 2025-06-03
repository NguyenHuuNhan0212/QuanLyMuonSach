<script setup>
import sach from '@/components/sach.vue'
import slider from '@/components/slider.vue'
import { onMounted, computed } from 'vue'
import { useBookStore } from '@/stores/sach.store'

const bookStore = useBookStore()
onMounted(() => {
  bookStore.getAll()
})
const books = computed(() => {
  return bookStore.getBooksFormName(bookStore.searchText)
})
</script>

<template>
  <main>
    <!-- <div class="container mt-5">
      <h4 class="text-center">
        Chào mừng bạn đến với hệ thống quản lý thư viện trực tuyến!
      </h4>
      <h4 class="text-center">
        Tại đây, bạn có thể tìm kiếm sách, quản lý thông tin cá nhân và theo dõi lịch sử mượn sách của mình.
      </h4>
    </div> -->
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
</template>

<style>
</style>
