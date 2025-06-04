<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Đăng ký tài khoản</h2>
    <form @submit.prevent="handleSubmit" class="row g-3">
      <div class="col-md-6">
        <label for="hoLot" class="form-label">Họ lót</label>
        <input type="text" class="form-control" id="hoLot" v-model="form.HOLOT">
      </div>

      <div class="col-md-6">
        <label for="ten" class="form-label">Tên</label>
        <input type="text" class="form-control" id="ten" v-model="form.TEN">
      </div>

      <div class="col-md-6">
        <label for="ngaySinh" class="form-label">Ngày sinh</label>
        <input type="date" class="form-control" id="ngaySinh" v-model="form.NGAYSINH">
      </div>

      <div class="col-md-6">
        <label for="phai" class="form-label">Giới tính</label>
        <select class="form-select" id="phai" v-model="form.PHAI">
          <option disabled value="">Chọn giới tính</option>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </select>
      </div>

      <div class="col-12">
        <label for="diaChi" class="form-label">Địa chỉ</label>
        <input type="text" class="form-control" id="diaChi" v-model="form.DIACHI">
      </div>

      <div class="col-md-6">
        <label for="dienThoai" class="form-label">Điện thoại</label>
        <input
          type="tel"
          class="form-control"
          id="dienThoai"
          v-model="form.DIENTHOAI"
          pattern="^[0-9]{10,11}$"
        >
      </div>

      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.EMAIL"
        >
      </div>
        <div class="col-md-6">
            <label for="password1" class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" id="password1" v-model="form.PASSWORD1">
        </div>
        <div class="col-md-6">
            <label for="password2" class="form-label">Xác nhận mật khẩu</label>
            <input type="password" class="form-control" id="password2" v-model="form.PASSWORD2">
        </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Đăng ký</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/nguoidung.store'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  HOLOT: '',
  TEN: '',
  NGAYSINH: '',
  PHAI: '',
  DIACHI: '',
  DIENTHOAI: '',
  PASSWORD1: '',
  PASSWORD2: '',
  EMAIL: ''
})

const handleSubmit = async () => {
    if (!form.HOLOT || !form.TEN || !form.NGAYSINH || !form.PHAI || !form.DIACHI || !form.DIENTHOAI || !form.EMAIL || !form.PASSWORD1 || !form.PASSWORD2) {
            ElMessage({
                message: 'Vui lòng điền đầy đủ thông tin.',
                type: 'warning',
            });
            return;
        }
    if (form.PASSWORD1 !== form.PASSWORD2) {
        ElMessage({
            message: 'Mật khẩu không khớp. Vui lòng kiểm tra lại.',
            type: 'error',
        });
        return;
    }
    // Gọi API đăng ký tài khoản
    try{
        const result = await userStore.UserRegister({
            HOLOT: form.HOLOT,
            TEN: form.TEN,
            NGAYSINH: form.NGAYSINH,
            PHAI: form.PHAI,
            DIACHI: form.DIACHI,
            DIENTHOAI: form.DIENTHOAI,
            EMAIL: form.EMAIL,
            PASSWORD: form.PASSWORD1,
        });
        if(result === 'Đăng ký tài khoản thành công! Vui lòng đăng nhập để sử dụng.'){
            ElMessage({
                message: result || 'Đăng ký thành công!',
                type: 'success',
            });
            router.push({ name: 'dangnhap' });
        }else{
            ElMessage({
                message: result || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.',
                type: 'error',
            });
        }
        
    }catch(error){
        ElMessage({
            message: result || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.', 
            type: 'error',
        })
    }
}
</script>

<style scoped>
input, select {
  border-radius: 0.375rem;
}
</style>
