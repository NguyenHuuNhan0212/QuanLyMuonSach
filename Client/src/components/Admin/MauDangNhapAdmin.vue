<template>
    <header class="admin-header">
        <div class="container d-flex align-items-center px-4 py-2   ">
            <img src="@/assets/logo.jpg" alt="Admin Icon" class="me-2 img-logo" height="50px" />
            <h5 class="mb-0 fw-bold text-white">Thư viện trực tuyến</h5>
        </div>
        
    </header>
    <main>
        <div class="admin-login d-flex justify-content-center align-items-center">
            <div class="login-form p-4 shadow rounded bg-white">
                 <div class="d-flex justify-content-center align-items-center">
                    <img src="@/assets/logo.jpg" class="img-logo" height="100px" alt="Logo thư viện">
                </div>
                <h4 class="mb-3 text-center">Đăng nhập</h4>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                    <label for="SoDienThoai" class="form-label"><strong>Số điện thoại</strong></label>
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
                    <label for="password" class="form-label"><strong>Mật khẩu</strong></label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        required
                    />
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mt-3">Đăng nhập</button>
                </form>
            </div>
        </div>
    </main> 
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/nguoidung.store';

const router = useRouter();
const userStore = useUserStore();
const SoDienThoai = ref('');
const password = ref('');

const handleSubmit = async () => {
  if (!SoDienThoai.value || !password.value) {
    ElMessage({ message: 'Vui lòng nhập đầy đủ thông tin.', type: 'warning' });
    return;
  }

  try {
    const result = await userStore.StaffLogin({
      SoDienThoai: SoDienThoai.value,
      Password: password.value
    });

    const token = userStore.staffToken;
    if (result && token) {
      ElMessage({ message: 'Đăng nhập thành công!', type: 'success' });
      router.push({ name: 'trangchuadmin' });
    } else {
      ElMessage({ message: result || 'Đăng nhập thất bại.', type: 'error' });
    }
  } catch (error) {
    ElMessage({
      message: 'Lỗi máy chủ khi đăng nhập',
      type: 'error',
    });
  }
};
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-form {
  width: 100%;
  max-width: 400px;
}
.admin-header {
  background-color: #6699CC; 
  height: 80px;
  color: white;
}

.admin-header h5 {
  color: white;
  margin-left: 10px;
  font-size: 20px;
}

.img-logo{
  border-radius: 50%;
}

</style>
