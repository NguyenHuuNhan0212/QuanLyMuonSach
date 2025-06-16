<template>
    <h1 class="mb-4"><i class="fa-solid fa-book"></i> Sách mới nhất</h1>
    <div class="container">
        <div v-if="books.length > 0" class="row  g-4">
            <div
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            v-for="book in books"
            :key="book.MASACH"
            >
            <Sach :book="{...book, isNew: true}" />
            </div>
        </div>
        <div v-else class="alert alert-info text-center w-100" >
             Hiện tại thư viện không có quyển sách phù hợp với nhu cầu tìm kiếm của bạn.
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed, onUnmounted } from 'vue';
import Sach from './sach.vue';
import { useBookStore } from '@/stores/sach.store';
const bookStore = useBookStore()

onMounted(async () => {
    await bookStore.getAll()
})
onUnmounted(() => {
    bookStore.searchMode = ''
    bookStore.searchText = ''
})
const books = computed(() => {
    const newBooks = bookStore.getBookNew
    const text = bookStore.searchText.toLowerCase().trim()
    if(!text) return newBooks
    if(bookStore.searchMode === 'author'){
        return newBooks.filter(book => book.TACGIA?.toLowerCase().includes(text))
    }else if(bookStore.searchMode === 'bookName'){
        return newBooks.filter(book => book.TENSACH?.toLowerCase().includes(text))
    }else if(bookStore.searchMode === 'publisherName'){
        return newBooks.filter(book => book.MANXB?.TENNXB.toLowerCase().includes(text))
    }else if(bookStore.searchMode === 'publisherYear'){
        return newBooks.filter(book => String(book.NAMXUATBAN) === text)
    }else {
        return newBooks.filter(book =>
            book.TENSACH?.toLowerCase().includes(text) ||
            book.TACGIA?.toLowerCase().includes(text) ||
            book.MANXB?.TENNXB.toLowerCase().includes(text) ||
            book.NAMXUATBAN?.toString().includes(text)
            )
    }
})
</script>