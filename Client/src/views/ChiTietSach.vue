<template>
  <div v-if="book" class="book-detail container py-4">
    <!-- Phần nội dung hiện sách -->
    <button class="btn btn-outline-secondary mb-4" @click="$router.back()">
      <el-icon><Back /></el-icon>
    </button>

    <div class="row">
      <div class="col-md-5">
        <div class="image-wrapper">
          <img :src="book.image" :alt="book.TENSACH" class="img-fluid rounded shadow" />
        </div>
      </div>
      <div class="col-md-7">
        <h1 class="mb-4">Thông tin sách</h1>
        <h4 class="mb-3 text-muted fst-italic">Mã sách: {{ book.MASACH }}</h4>
        <h4 class="mb-3 text-muted">Tên sách: {{ book.TENSACH }}</h4>
        <h5 class="text-muted mb-3">Tác giả: {{ book.TACGIA }}</h5>
        <p class="description mb-4">Đơn giá: {{ book.DONGIA }}</p>
        <p class="description mb-4">Số quyển: {{ book.SOQUYEN }}</p>
        <p class="description mb-4">Nhà xuất bản: {{ book.MANXB?.TENNXB || 'Không tìm thấy' }}</p>
        <p class="description mb-4">Năm xuất bản: {{ book.NAMXUATBAN }}</p>
        <div class="quantity-control mb-4 ">
          <span>Số lượng: </span>
          <br />
          <el-input-number class="mt-3" v-model="quantity" :min="1" :max="10" @change="handleChange" />
        </div>

        <button class="btn btn-primary" @click="borrowBook">Đăng ký mượn</button>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <p>Đang tải dữ liệu sách hoặc không tìm thấy sách...</p>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBookStore } from '@/stores/sach.store';
import { useRoute } from 'vue-router'

const quantity = ref(1);
const route = useRoute()
const id = route.params.MaSach
const bookStore = useBookStore();

onMounted(async () => {
    await bookStore.getAll();
});
const book = computed(() => {
    return bookStore.getBook(id);
});
</script>


<style scoped>
.image-wrapper {
    width: 100%;
    max-height: 400px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-wrapper img {
    object-fit: cover;
    max-height: 300px;
    max-width: 200px;
    border-radius: 12px;
}

.description {
    font-size: 1rem;
    line-height: 1.6;
}
.quantity-control button {
  width: 35px;
  height: 35px;
  font-size: 1.2rem;
  padding: 0;
  text-align: center;
}

.quantity-control span {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
}
/* thêm hiệu ứng cho hình ảnh */
.image-wrapper {
  perspective: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
  width: 200px;
  height: auto;
  transform-origin: left center;
  transform: rotateY(0deg);
  transition: transform 0.6s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.image-wrapper:hover img {
  transform: rotateY(-25deg);
}

</style>
