<!-- <template>
    <div class="container mt-5 pt-5"  style="max-width: 400px; max-height: 600px;">
      <h2 class="mb-4 text-center">Đăng nhập</h2>
      <form @submit.prevent="handleSubmit">
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
        <button type="submit" class="btn btn-primary w-100 mt-3">Đăng nhập</button>
        <div class="text-center mt-3">
          <p>Chưa có tài khoản? <router-link :to="{name: 'dangky'}" class="register-link">Đăng ký ngay</router-link></p>
        </div>
      </form>
    </div>
</template> -->
<template>
  <div class="login-page d-flex justify-content-center align-items-center py-5">
    <div class="login-box d-flex shadow rounded overflow-hidden">
      <!-- Bên trái: hình ảnh -->
      <div class="left-side d-none d-md-flex flex-column justify-content-center align-items-center text-white">
        <h6 class="display-6 fw-bold">Thư viện trực tuyến</h6>
        <p class="text-center px-4">Chào mừng bạn đã đến với thư viện của chúng tôi.</p>
      </div>

      <!-- Bên phải: form đăng nhập -->
      <div class="right-side d-flex flex-column justify-content-center align-items-center p-5">
        <div class="form-container w-100" style="max-width: 400px;">
          <h2 class="mb-4 text-white text-center">Đăng nhập</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input v-model="SoDienThoai" type="text" class="form-control custom-input" placeholder="Số điện thoại" required />
            </div>

            <div class="mb-3">
              <input v-model="password" type="password" class="form-control custom-input" placeholder="Mật khẩu" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3">Đăng nhập</button>

            <div class="text-center mt-3 text-white">
              <p>Chưa có tài khoản?
                <router-link :to="{ name: 'dangky' }" class="register-link">Đăng ký ngay</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
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
    const result = await userStore.UserLogin({DIENTHOAI: SoDienThoai.value,PASSWORD: password.value,});
    const token = userStore.token;
    if (result && token) {
      ElMessage({
        message: 'Đăng nhập thành công!',
        type: 'success',
      });
      router.push({ name: 'trangchu' });
    }else {
      ElMessage({
        message: result,
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
.login-page {
  min-height: 100vh;
  background-color: #e3f2fd;
}

.login-box {
  width: 90%;
  max-width: 900px;
  background-color: #2c2c2c;
  display: flex;
}

.left-side {
  flex: 6; /* Chiếm 60% */
  min-width: 360px; /* hoặc bạn có thể tăng lên nếu cần */
  background-image: url('@/assets/image-login.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right-side {
  flex: 4; /* Chiếm 40% */
  min-width: 300px;
  background-color: #2c2c2c;
  padding: 3rem;
}


.custom-input {
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffffff;
  border-radius: 0;
  color: #fff;
}

.custom-input::placeholder {
  color: #bbb;
}

.custom-input:focus {
  outline: none;
  box-shadow: none;
  border-bottom-color: #007bff;
}

.register-link {
  color: #0d6efd;
  text-decoration: underline;
}

</style>
