<template>
   <div class="container update-container">
      <h1 class="text-center mb-4">Cập nhật thông tin tài khoản</h1>

      <form @submit.prevent="updateStaff" class="update-form">
        <div class="mb-3">
          <label class="form-label">Họ tên nhân viên</label>
          <input type="text" class="form-control" v-model="form.HoTenNV" />
        </div>

        <div class="mb-3">
          <label class="form-label">Chức vụ</label>
          <select class="form-select" v-model="form.ChucVu">
            <option value="" disabled>-- Chọn chức vụ--</option>
            <option value="Nhân viên bình thường">Nhân viên bình thường</option>
            <option value="Nhân viên quản lý">Nhân viên quản lý</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Số điện thoại</label>
          <input type="tel" class="form-control" v-model="form.SoDienThoai" />
        </div>

        <div class="mb-3">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" v-model="form.DiaChi" />
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary"><el-icon><Select /></el-icon> Cập nhật</button>
          <button type="button" class="btn btn-danger" @click="handleCancel"><el-icon><Close /></el-icon> Hủy</button>
        </div>
      </form>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/nguoidung.store';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
const router = useRouter()
const userStore = useUserStore()
const form = ref({
    _id: userStore.staffInfo?._id || '',
    HoTenNV: userStore.staffInfo?.HoTenNV || '',
    ChucVu: userStore.staffInfo?.ChucVu || '',
    SoDienThoai: userStore.staffInfo?.SoDienThoai || '',
    DiaChi: userStore.staffInfo?.DiaChi || ''
})
const updateStaff = async () => {
  const result = await userStore.updateStaff(form.value)
  if (result === 'Cập nhật thành công.') {
    router.push({ name: 'trangcanhanadmin' })
    ElMessage.success('Cập nhật tài khoản thành công.')
    
  } else {
    ElMessage.error('Cập nhật thất bại.')
  }
}
const handleCancel = () => {
   router.push({name: 'trangcanhanadmin'})
}
</script>
<style scoped>
.update-container {
  max-width: 600px;
  margin: 0 auto;
}

.update-form {
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>