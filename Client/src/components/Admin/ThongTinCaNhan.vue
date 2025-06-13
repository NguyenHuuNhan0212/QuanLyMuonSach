<template>
    <main class="mt-5" data-aos="fade-up" data-aos-duration="1000">
        <div class="container profile-container">
            <h1 class="text-center mb-4">Thông tin tài khoản</h1>
            <div class="profile-card">
            <h2 class="text-center mb-3">
                {{ userStore.staffInfo?.HoTenNV }}
            </h2>
            <p>
                <el-icon><UserFilled /></el-icon>
                <strong>Mã nhân viên:</strong> {{ userStore.staffInfo?.MSNV }}
            </p>
             <p>
                <el-icon><Tools /></el-icon>
                <strong>Chức vụ:</strong> {{ userStore.staffInfo?.ChucVu }}
            </p>
            <p>
                <el-icon><Iphone /></el-icon>
                <strong>Số điện thoại:</strong> {{ userStore.staffInfo?.SoDienThoai }}
            </p>
            <p>
                <el-icon><AddLocation /></el-icon>
                <strong>Địa chỉ:</strong> {{ userStore.staffInfo?.DiaChi }}
            </p>
            
            <div class="button-wrapper">
                <button class="btn btn-primary" @click="handleUpdateAccount"><el-icon><Edit /></el-icon> Chỉnh sửa tài khoản</button>
            </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/nguoidung.store'
const userStore = useUserStore()
const handleUpdateAccount = () => {
    // Redirect to the account update page
    router.push({ name: 'trangcanhanadmin-updateProfileAdmin', params: { MSNV: userStore.staffInfo?.MSNV} });
}

</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.profile-card {
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-card h2 {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.profile-card p {
  font-size: 16px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

</style>
