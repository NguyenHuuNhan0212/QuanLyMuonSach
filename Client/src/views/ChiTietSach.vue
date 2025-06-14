<template>
  <AppHeader />
  <main class="mt-5 pt-5">
    <div v-if="book" class="book-detail container py-4">
      <!-- Phần nội dung hiện sách -->
      <button class="btn btn-outline-secondary mb-4" @click="$router.back()">
        <el-icon>
          <Back />
        </el-icon>
      </button>

      <div class="row">
        <div class="col-md-6">
            <div class="image-wrapper" style="min-height: 500px;">
              <img :src="book.image" :alt="book.TENSACH" class="img-fluid rounded shadow" />
            </div>
        </div>
        <div class="col-md-6">
          <h1 class="mb-4">{{ book.TENSACH }}</h1>
          <p class="mb-3 description fst-italic"><strong>Mã sách:</strong> {{ book.MASACH }}</p>
          <p class="mb-3 description"><strong>Tác giả: </strong> {{ book.TACGIA }}</p>
          <p class="description mb-4"><strong>Đơn giá: </strong> {{ book.DONGIA }}</p>
          <p class="description mb-4"><strong>Số lượng còn lại: </strong> {{ soluongConLai }}</p>
          <p class="description mb-4"><strong>Nhà xuất bản: </strong> {{ book.MANXB?.TENNXB || 'Không tìm thấy' }}</p>
          <p class="description mb-4"><strong>Năm xuất bản: </strong> {{ book.NAMXUATBAN }}</p>
          <p class="description mb-4"><strong>Số lượt mượn: </strong> {{ book.SoLuotMuon }}</p>
          <div class="quantity-control mb-4 ">
            <strong>Số lượng: </strong>
            <br />
            <el-input-number class="mt-3" v-model="quantity" :min="1" :max="20" />
          </div>

          <el-button 
              type="primary"
              :loading="isLoading"
              :disabled="isLoading"
              @click="handleBorrowBook">
              Đăng ký mượn
          </el-button>

        </div>
      </div>
    </div>
    <div v-else class="text-center py-5">
      <p>Đang tải dữ liệu sách hoặc không tìm thấy sách...</p>
    </div>
  </main>
  <AppFooter />
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useBookStore } from '@/stores/sach.store';
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { ElMessage } from 'element-plus';
import { useBorrowBookStore } from '@/stores/muonsach.store';
import { useUserStore } from '@/stores/nguoidung.store';
import router from '@/router';
import { ElButton } from 'element-plus';

const isLoading = ref(false);
const props = defineProps({
  MaSach: {
    type: String,
  }
});

const userStore = useUserStore();
const quantity = ref(1);
const route = useRoute()
const id = route.params.MaSach
const bookStore = useBookStore();
const borrowBookStore = useBorrowBookStore();

onMounted(async () => {
  await bookStore.getAll();
});
const book = computed(() => {
  return bookStore.getBook(id);
});

const handleBorrowBook = async () => {
  if (!book.value) {
    ElMessage({
      message: 'Không tìm thấy sách để mượn.',
      type: 'warning',
    });
  }
  if(!userStore.token){
    ElMessage({
      message: 'Vui lòng đăng nhập để mượn sách.',
      type: 'warning',
    });
    router.push({ name: 'dangnhap' });
    return;
  }
  const soluongconlai = book.value.SOQUYEN - book.value.SoLuongDaMuon
  if(quantity.value > soluongconlai){
    ElMessage({
      message: `Số lượng sách còn lại không đủ. Hiện tại chỉ còn ${soluongconlai} quyển.`,
      type: 'warning',
    });
    return;
  }
  const data = {
    MASACH: book.value._id,
    SoLuongMuon: quantity.value,
    MADOCGIA: userStore.userInfo._id,
  }
  isLoading.value = true;
  try{
    const result = await borrowBookStore.addBorrow(data);
  if(result === 'Đăng ký mượn sách thành công!'){
        // Cập nhật trực tiếp trong mảng books
       await bookStore.getAll();
      ElMessage({
        message: result,
        type: 'success',
      });
      router.push({ name: 'lichsumuonsach' });
    } else {
      ElMessage({
        message: result || 'Đăng ký mượn sách thất bại. Vui lòng thử lại.',
        type: 'error',
      });
    }
  }catch(error){
      ElMessage({
        message: 'Đã xảy ra lỗi không xác định.',
        type: 'error',
      });
      console.error(error);
  }finally {
    isLoading.value = false; // Kết thúc loading
  }
}

const soluongConLai = computed(() => {
  if (!book.value) return 0;
  return book.value.SOQUYEN - book.value.SoLuongDaMuon;
});

</script>
<style scoped>

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
