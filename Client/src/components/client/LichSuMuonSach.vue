<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <template v-if="borrowHistory.length <= 2">
            <template v-if="borrowHistory.length <= 2">
                <div class="d-flex justify-content-center w-100 mt-4">
                    <div class="alert alert-info text-center w-100" style="max-width: 600px;">
                    Bạn chưa có lịch sử mượn sách nào.
                    </div>
                </div>
            </template>

        </template>
        <template v-else>    
            <div class="col" v-for="item in borrowHistory" :key="item.id">
                <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Tên sách: {{ item.MASACH.TENSACH }}</h5>
                    <p class="card-text mb-1"><strong>Ngày mượn:</strong> {{ item.NGAYMUON }}</p>
                    <p class="card-text mb-1"><strong>Số lượng mượn:</strong> {{ item.SoLuongMuon }}</p>
                    <p class="card-text">
                    <strong>Trạng thái:</strong>
                    <span
                        :class="{
                        'text-success': item.TrangThai === 'Đã lấy',
                        'text-info': item.TrangThai === 'Đã trả',
                        'text-warning': item.TrangThai === 'Chờ lấy'
                        }"
                    >
                        {{ item.TrangThai }}
                    </span>
                    </p>
                </div>
                <div class="card-footer bg-white border-0">
                    <button
                    v-if="item.TrangThai === 'Đã lấy'"
                    class="btn btn-outline-primary btn-sm"
                    >
                    Gia hạn
                    </button>
                </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import router from '@/router';
import { useBorrowBookStore } from '@/stores/muonsach.store';
import { useUserStore } from '@/stores/nguoidung.store';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const userStore = useUserStore();
const borrowBookStore = useBorrowBookStore();

const borrowHistory = ref([]);
onMounted(async () => {
    if(!userStore.token) {
        ElMessage ({
            message: 'Bạn cần đăng nhập để xem lịch sử mượn sách.',
            type: 'warning'
        }); // Không có token, không thực hiện gì
        router.push({ name: 'dangnhap' }); // Chuyển hướng đến trang đăng nhập
    }
    if(userStore.token){
        await borrowBookStore.getAllForUser();
        borrowHistory.value = borrowBookStore.SachMuon
    }})
</script>