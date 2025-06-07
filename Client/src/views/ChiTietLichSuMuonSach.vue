<template>
    <AppHeader />
    <main class="container mt-5 pt-5">
        <div class="mt-5">
            <button class="btn btn-outline-secondary mb-4" @click="$router.back()">
                <el-icon>
                <Back />
                </el-icon>
            </button>
        </div>
        <div class="row mb-4">
            <div class="col-md-6">
                <div class= "image-wrapper" >
                    <img v-if="borrowedBook && borrowedBook.MASACH.image" 
                     :src="borrowedBook.MASACH.image" 
                     alt="Hình ảnh sách" 
                     class="img-fluid rounded shadow mb-3"> 
                </div>
            </div>
            <div class="col-md-6">   
                <h1>Chi tiết mượn sách</h1>
                <div v-if="borrowedBook">
                    <p><strong>Mã sách:</strong> {{ borrowedBook.MASACH.MASACH }}</p>
                <p><strong>Tên sách:</strong> {{ borrowedBook.MASACH.TENSACH }}</p>
                <p><strong>Tác giả:</strong> {{ borrowedBook.MASACH.TACGIA }}</p>
                <p><strong>Ngày mượn:</strong>
                    <span v-if="borrowedBook.TrangThai === 'Đã lấy' || borrowedBook.TrangThai === 'Đã trả'">
                        {{ formatDate(borrowedBook.NGAYMUON) }}
                    </span>
                    <span v-else> Bạn chưa đến lấy sách </span>
                </p>
                    <p><strong>Số lượng mượn:</strong> {{ borrowedBook.SoLuongMuon }}</p>
                <p><strong>Ngày trả:</strong> 
                    <span v-if="borrowedBook.TrangThai === 'Đã trả'">
                        {{ formatDate(borrowedBook.NGAYTRA) }}
                    </span>
                    <span v-else> Bạn chưa trả sách</span></p>
                <p><strong>Trạng thái:</strong>
                    <span :class="{
                                'text-success': borrowedBook.TrangThai === 'Đã lấy',
                                'text-info': borrowedBook.TrangThai === 'Đã trả',
                                'text-warning': borrowedBook.TrangThai === 'Chờ lấy'
                            }"> 
                                <el-icon v-if="borrowedBook.TrangThai === 'Đã lấy'"> <SuccessFilled /></el-icon>
                                <el-icon v-else-if="borrowedBook.TrangThai === 'Chờ lấy'"> <Clock /></el-icon>
                                <el-icon v-else-if="borrowedBook.TrangThai === 'Đã trả'"> <Check /></el-icon>
                            {{ borrowedBook.TrangThai }}
                    </span>
                    </p>
                </div>
                <div v-else>
                    <p>Không có thông tin mượn sách.</p>
                </div>
            </div>
        </div>
    </main>
    <AppFooter />
</template>
<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useBorrowBookStore } from '@/stores/muonsach.store';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const route = useRoute();
const id = route.params.id;
onMounted(async () => {
    await useBorrowBookStore().getAllForUser()
})
const borrowedBook = computed(() => {
    return useBorrowBookStore().getBorrowById(id)
})
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN');
};
</script>
<style scoped>

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