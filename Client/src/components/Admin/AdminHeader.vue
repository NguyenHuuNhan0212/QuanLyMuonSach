<template>
  <div class="d-flex justify-content-between align-items-center p-3 bg-white border-bottom shadow-sm" data-aos="fade-down" data-aos-duration="800">
    <h4 class="mb-0">📊 Bảng điều khiển</h4>
    <div>
      <span class="me-3"><i class="fas fa-user-circle me-1"></i> {{ userStore.staffInfo?.HoTenNV || 'Admin' }}</span>
      <button class="btn btn-outline-danger btn-sm" @click="handelLogout">
        <i class="fas fa-sign-out-alt"></i> Đăng xuất
      </button>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/nguoidung.store';
import { ElMessage } from 'element-plus';
const userStore = useUserStore();

const handelLogout = () => {
    if (userStore.staffToken) {
        userStore.StaffLogout()
        ElMessage({
            message: 'Đăng xuất thành công!',
            type: 'success',
        });
    }else {
        ElMessage.error('Bạn chưa đăng nhập!');
    }
    
};
</script>
