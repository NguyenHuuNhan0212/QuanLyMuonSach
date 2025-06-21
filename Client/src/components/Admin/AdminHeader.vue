<template>
  <header class="container-fluid bg-white border-bottom shadow-sm" data-aos="fade-down" data-aos-duration="800">
    <div class="container d-flex justify-content-between align-items-center p-3">
      <h4 class="mb-0" v-if="route.name === 'trangchuadmin'"><i class="fa-solid fa-chart-simple"></i> Trang tổng quan</h4>
      <h4 v-else-if="route.name.includes('quanlysach')"> <i class="fas fa-book me-2"></i>Trang quản lý sách</h4>
      <h4 v-else-if="route.name.includes('quanlynxb')"> <i class="fas fa-building me-2"></i>Trang quản lý nhà xuất bản</h4>
      <h4 v-else-if="route.name === 'quanlymuonsach'"><i class="fas fa-tasks me-2"></i>Trang quản lý mượn sách</h4>
      <h4 v-else-if="route.name.includes('trangcanhanadmin')"><i class="fa-solid fa-user me-2"></i>Trang cá nhân</h4>
       <h4 v-else-if="route.name.includes('quanlydocgia')"><i class="fa-solid fa-users-line me-2"></i>Quản lý độc giả</h4>
      <div>
        <span class="me-3"><i class="fas fa-user-circle me-1"></i> {{ userStore.staffInfo?.HoTenNV || 'Admin' }}</span>
        <button class="btn btn-outline-danger btn-sm" @click="handelLogout">
          <i class="fas fa-sign-out-alt"></i> Đăng xuất
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useUserStore } from '@/stores/nguoidung.store';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore();

const handelLogout = () => {
    if (userStore.staffToken) {
        userStore.StaffLogout()
        ElMessage({
            message: 'Đăng xuất thành công!',
            type: 'success',
        });
        router.push({name: 'admindangnhap'})
    }else {
        ElMessage.error('Bạn chưa đăng nhập!');
        router.push({name: 'dangnhap'})
    }
    
};
</script>
