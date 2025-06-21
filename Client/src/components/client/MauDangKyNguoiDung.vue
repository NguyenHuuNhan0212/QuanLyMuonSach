<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Đăng ký tài khoản</h2>
    <form @submit.prevent="handleSubmit" class="row g-3">
      <div class="col-md-6">
        <label for="hoLot" class="form-label">Họ lót</label>
        <input type="text" class="form-control" id="hoLot" v-model="form.HOLOT" placeholder="Nhập họ lót của bạn">
      </div>

      <div class="col-md-6">
        <label for="ten" class="form-label">Tên</label>
        <input type="text" class="form-control" id="ten" v-model="form.TEN" placeholder="Nhập tên của bạn">
      </div>

      <div class="col-md-6">
        <label for="ngaySinh" class="form-label">Ngày sinh</label>
        <input type="date" class="form-control" id="ngaySinh" v-model="form.NGAYSINH">
      </div>

      <div class="col-md-6">
        <label for="phai" class="form-label">Giới tính</label>
        <select class="form-select" id="phai" v-model="form.PHAI">
          <option disabled value="">---Chọn giới tính---</option>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </select>
      </div>

      <div class="col-12">
        <label for="diaChi" class="form-label">Địa chỉ</label>
        <input type="text" class="form-control" id="diaChi" v-model="form.DIACHI" placeholder="Nhập địa chỉ của bạn">
      </div>

      <div class="col-md-6">
        <label for="dienThoai" class="form-label">Điện thoại</label>
        <input
          type="tel"
          class="form-control"
          id="dienThoai"
          v-model="form.DIENTHOAI"
          :class="{ 'is-invalid': phoneError }"
          placeholder="Nhập số điện thoại đăng ký tài khoản"
        >
        <div class="invalid-feedback" v-if="phoneError">{{ phoneError }}</div>
      </div>

      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.EMAIL"
          :class="{'is-invalid': emailError}"
          placeholder="Nhập email của bạn"
        >
         <div class="invalid-feedback" v-if="emailError">{{ emailError }}</div>
      </div>
        <div class="col-md-6">
            <label for="password1" class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" id="password1"
             v-model="form.PASSWORD1" placeholder="Nhập mật khẩu"
             :class="{'is-invalid': passwordError}">
            <div class="invalid-feedback" v-if="passwordError">{{ passwordError }}</div>
          </div>
        <div class="col-md-6">
            <label for="password2" class="form-label">Xác nhận mật khẩu</label>
            <input type="password" class="form-control" id="password2" 
            v-model="form.PASSWORD2" placeholder="Xác nhận mật khẩu"
            :class="{'is-invalid': passwordConfirmError}">
            <div class="invalid-feedback" v-if="passwordConfirmError">{{ passwordConfirmError }}</div>
        </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Đăng ký</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
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

// Biến lưu lỗi
const emailError = ref('')
const phoneError = ref('')
const passwordError = ref('')
const passwordConfirmError = ref('')

// Watch email
watch(() => form.EMAIL, (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = regex.test(value.trim()) ? '' : 'Email không hợp lệ.'
})

// Watch số điện thoại
watch(() => form.DIENTHOAI, (value) => {
  const regex = /^[0-9]{10,11}$/
  phoneError.value = regex.test(value.trim()) ? '' : 'Số điện thoại phải gồm 10–11 chữ số.'
})

// Watch mật khẩu
watch(() => form.PASSWORD1, (value) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  passwordError.value = regex.test(value) ? '' : 'Mật khẩu phải ≥8 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.'
  passwordConfirmError.value = (form.PASSWORD2 && form.PASSWORD2 !== value) ? 'Mật khẩu xác nhận không khớp.' : ''
})

// Watch xác nhận mật khẩu
watch(() => form.PASSWORD2, (value) => {
  passwordConfirmError.value = value === form.PASSWORD1 ? '' : 'Mật khẩu xác nhận không khớp.'
})

const handleSubmit = async () => {
    if (!form.HOLOT || !form.TEN || !form.NGAYSINH || !form.PHAI || !form.DIACHI || !form.DIENTHOAI || !form.EMAIL || !form.PASSWORD1 || !form.PASSWORD2) {
            ElMessage({
                message: 'Vui lòng điền đầy đủ thông tin.',
                type: 'warning',
            });
            return;
        }
    if (emailError.value || phoneError.value || passwordError.value || passwordConfirmError.value) {
      ElMessage({ message: 'Vui lòng sửa các lỗi trước khi đăng ký.', type: 'error' })
      return
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
.container {
  max-width: 700px;
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

h2 {
  font-weight: bold;
  color: #2c3e50;
}

label {
  font-weight: 500;
  margin-bottom: 5px;
  color: #34495e;
}

input,
select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  padding: 10px 12px;
  font-size: 15px;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  border-color: #409eff; /* Màu chính của Element Plus */
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(64, 158, 255, 0.25);
}

button.btn {
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #409eff;
  border: none;
  transition: background-color 0.3s;
}

button.btn:hover {
  background-color: #66b1ff;
}
.is-invalid {
  border-color: #dc3545;
}
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
}

</style>
