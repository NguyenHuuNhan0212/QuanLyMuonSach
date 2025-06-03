<template>
  <div class="container mt-5" style="max-width: 400px; max-height: 400px;">
    <h2 class="mb-4 text-center">Đăng nhập</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="SoDienThoai" class="form-label">Số điện thoại</label>
        <input
          v-model="SoDienThoai"
          type="text"
          class="form-control"
          id="SoDienThoai"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100 mt-3" @click="handleSubmit">Đăng nhập</button>
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
  const handleSubmit = async () => {
  if (!SoDienThoai.value || !password.value) {
    ElMessage({
      message: 'Vui lòng nhập đầy đủ thông tin đăng nhập.',
      type: 'warning',
    });
    return;
  }
  try {
    const result = await userStore.UserLogin({
      DIENTHOAI: SoDienThoai.value,
      PASSWORD: password.value,
    });

    if (result && userStore.token) {
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
      message: error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
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
</style>
