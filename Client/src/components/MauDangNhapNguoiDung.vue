<template>
    <div class="container mt-5 pt-5" style="max-width: 400px; max-height: 600px;">
      <h2 class="mb-4 text-center">Đăng nhập</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="SoDienThoai" class="form-label">Số điện thoại</label>
          <input v-model="SoDienThoai" type="text" class="form-control" id="SoDienThoai" placeholder="Nhập số điện thoại"
            required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Nhập mật khẩu"
            required />
        </div>
        <div class="form-check mb-3">
            <input v-model="isAdmin" class="form-check-input" type="checkbox" id="adminCheckbox">
            <label class="form-check-label" for="adminCheckbox">
            Đăng nhập với vai trò admin
            </label>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3" @click="handleSubmit">Đăng nhập</button>
        <div class="text-center mt-3">
          <p>Chưa có tài khoản? <router-link :to="{name: 'dangky'}" class="register-link">Đăng ký ngay</router-link></p>
        </div>
      </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/nguoidung.store';

const router = useRouter();
const userStore = useUserStore();
const password = ref('');
const SoDienThoai = ref('');
const isAdmin = ref(false);


const handleSubmit = async () => {
  if (!SoDienThoai.value || !password.value) {
    ElMessage({
      message: 'Vui lòng nhập đầy đủ thông tin đăng nhập.',
      type: 'warning',
    });
    return;
  }
  try {
    const result = isAdmin.value ?
        await userStore.StaffLogin({SoDienThoai: SoDienThoai.value,Password: password.value,}) :
        await userStore.UserLogin({DIENTHOAI: SoDienThoai.value,PASSWORD: password.value,});

    const token = isAdmin.value ? userStore.staffToken : userStore.token;
    if (result && token) {
      ElMessage({
        message: 'Đăng nhập thành công!',
        type: 'success',
      });
      router.push({ name: 'trangchu' });
    } else {
      ElMessage({
        message: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
        type: 'error',
      });
    }
  } catch (error) {
    ElMessage({
      message: error.response?.data?.message || 'Lỗi',
      type: 'error',
    });
  }
};
</script>
<style scoped>
.container {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.register-link {
  color: #007bff;
  text-decoration: none;
}
</style>
