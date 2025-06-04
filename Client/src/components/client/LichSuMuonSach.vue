<template>
<div class="container mt-5 pt-5">
    <RouterLink :to="{ name: 'chitietlichsumuonsach', params: { id: borrowBook._id} }" class="text-decoration-none text-dark">
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Tên sách: {{ borrowBook.MASACH.TENSACH }}</h5>
            <p class="card-text mb-1"><strong>Ngày mượn:</strong> {{ borrowBook.NGAYMUON }}</p>
            <p class="card-text mb-1"><strong>Số lượng mượn:</strong> {{ borrowBook.SoLuongMuon }}</p>
            <p class="card-text">
                <strong>Trạng thái: </strong>
                <span :class="{
                    'text-success': borrowBook.TrangThai === 'Đã lấy',
                    'text-info': borrowBook.TrangThai === 'Đã trả',
                    'text-warning': borrowBook.TrangThai === 'Chờ lấy'
                }"> 
                    <el-icon v-if="borrowBook.TrangThai === 'Đã lấy'"> <SuccessFilled /></el-icon>
                    <el-icon v-else-if="borrowBook.TrangThai === 'Chờ lấy'"> <Clock /></el-icon>
                    <el-icon v-else-if="borrowBook.TrangThai === 'Đã trả'"> <Check /></el-icon>
                    {{ trangthai }}
                </span>
            </p>
        </div>
        <div class="card-footer bg-white border-0 text-center">
            <button v-if="borrowBook.TrangThai === 'Đã trả'" class="btn btn-outline-danger btn-sm">
                Xóa
            </button>
            <button v-else-if="borrowBook.TrangThai === 'Chờ lấy'" class="btn btn-outline-danger btn-sm"
            @click = "cancelBorrow">
                Hủy đăng ký mượn
            </button>
            <button v-else-if="borrowBook.TrangThai === 'Đã lấy'" class="btn btn-outline-primary btn-sm"
            @click = "borrowDetail">
                Xem chi tiết
            </button>
        </div>
    </div>
    </RouterLink>
</div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
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
const trangthai = ref('')
onMounted(() => {
    if (props.borrowBook.TrangThai === 'Đã lấy') {
        trangthai.value = 'Đã lấy sách';
    } else if (props.borrowBook.TrangThai === 'Đã trả') {
        trangthai.value = 'Đã trả sách';
    } else if (props.borrowBook.TrangThai === 'Chờ lấy') {
        trangthai.value = 'Chờ lấy sách';
    }
});
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
</style>
