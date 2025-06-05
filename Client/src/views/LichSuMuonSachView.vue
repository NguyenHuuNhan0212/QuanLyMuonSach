<template>
    <AppHeader />
    <main class="container mt-5 pt-5">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <template v-if="borrowHistory.length === 0 && userStore.token">
                <div class="d-flex justify-content-center w-100 mt-4">
                    <div class="alert alert-info text-center w-100" style="max-width: 600px;">
                        Bạn chưa có lịch sử mượn sách nào.
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="(borrowBook, index) in borrowHistory" :key="index" class="col">
                    <LichSuMuonSach :borrowBook="borrowBook" @cancelBorrow="cancelBorrow(borrowBook._id)"
                    @borrowDetail="borrowDetail(borrowBook._id)"/>
                </div>
            </template>
        </div>
    </main>
    <AppFooter />
</template>
<script setup>
import LichSuMuonSach from '@/components/client/LichSuMuonSach.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

import router from '@/router';
import { useBorrowBookStore } from '@/stores/muonsach.store';
import { useUserStore } from '@/stores/nguoidung.store';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
const userStore = useUserStore();
const borrowBookStore = useBorrowBookStore();

const borrowHistory = ref([]);
onMounted(async () => {
    if (!userStore.token) {
        ElMessage({
            message: 'Bạn cần đăng nhập để xem lịch sử mượn sách.',
            type: 'warning'
        }); // Không có token, không thực hiện gì
        router.push({ name: 'dangnhap' }); // Chuyển hướng đến trang đăng nhập
    }
    if (userStore.token) {
        await borrowBookStore.getAllForUser();
        borrowHistory.value = borrowBookStore.SachMuon
    }
})

const  cancelBorrow = async (id) => {
    try {
        await borrowBookStore.deleteBorrowForUser(id)
        ElMessage({
            message: 'Hủy đăng ký mượn sách thành công.',
            type: 'success'
        });
        router.push({ name: 'lichsumuonsach' });
        // Cập nhật lại danh sách mượn sách
        await borrowBookStore.getAllForUser();
        borrowHistory.value = borrowBookStore.SachMuon;
         
    } catch (error) {
        ElMessage({
            message: 'Hủy đăng ký mượn sách thất bại.',
            type: 'error'
        });
    }
};
const borrowDetail = (id) => {
    router.push({ name: 'chitietlichsumuonsach', params: { id } });
};
</script>