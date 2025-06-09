<template>
  <div class="container mt-5" data-aos="fade-up" data-aos-duration="1000">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3 text-center">
            <el-icon><Collection /></el-icon>
            {{ borrowBook.MASACH?.TENSACH || 'Sách không còn'}}
          </h5>
          <p v-if="borrowBook.TrangThai === 'Đã lấy' || borrowBook.TrangThai === 'Đã trả'" class="card-text mb-1">
            <strong>Ngày mượn:</strong> {{ formatDate(borrowBook.NGAYMUON) }}
          </p>
          <p v-else class="card-text mb-1">
            <strong>Ngày mượn:</strong> Bạn chưa đến lấy sách
          </p>
          <p class="card-text mb-1"><strong>Số lượng mượn:</strong> {{ borrowBook.SoLuongMuon }}</p>
          <p class="card-text">
            <strong>Trạng thái: </strong>
            <span class="badge" :class="{
              'bg-success': borrowBook.TrangThai === 'Đã lấy',
              'bg-info': borrowBook.TrangThai === 'Đã trả',
              'bg-warning text-dark': borrowBook.TrangThai === 'Chờ lấy'
            }">
              <el-icon v-if="borrowBook.TrangThai === 'Đã lấy'"><SuccessFilled /></el-icon>
              <el-icon v-else-if="borrowBook.TrangThai === 'Chờ lấy'"><Clock /></el-icon>
              <el-icon v-else-if="borrowBook.TrangThai === 'Đã trả'"><Check /></el-icon>
              {{ trangthai }}
            </span>
          </p>
        </div>
        <div
            class="card-footer bg-white border-0 text-center"
            style="display: flex; justify-content: center; gap: 10px;"
            >
            <button
                class="btn btn-outline-primary btn-sm"
                @click="borrowDetail"
            >
                Xem chi tiết
            </button>
            <button
                v-if="borrowBook.TrangThai === 'Chờ lấy'"
                class="btn btn-outline-danger btn-sm"
                @click="cancelBorrow"
            >
                Hủy đăng ký mượn
            </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { SuccessFilled, Clock, Check, Collection } from '@element-plus/icons-vue';

const props = defineProps({
  borrowBook: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(['cancelBorrow', 'borrowDetail']);

const cancelBorrow = () => {
  emits('cancelBorrow', props.borrowBook._id);
};
const borrowDetail = () => {
  emits('borrowDetail', props.borrowBook._id);
};
const trangthai = ref('');
onMounted(() => {
  if (props.borrowBook.TrangThai === 'Đã lấy') {
    trangthai.value = 'Đã lấy sách';
  } else if (props.borrowBook.TrangThai === 'Đã trả') {
    trangthai.value = 'Đã trả sách';
  } else if (props.borrowBook.TrangThai === 'Chờ lấy') {
    trangthai.value = 'Chờ lấy sách';
  }
});

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN');
};

</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.015);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-footer button {
  margin: 0 5px;
}
</style>
