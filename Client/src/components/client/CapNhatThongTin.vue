<template>
  <AppHeader />
  <main class="mt-5 pt-5" data-aos="fade-up" data-aos-duration="1000">
    <div class="container update-container">
      <h1 class="text-center mb-4">Cập nhật thông tin tài khoản</h1>

      <form @submit.prevent="updateUser" class="update-form">
        <div class="mb-3">
          <label class="form-label">Họ lót</label>
          <input type="text" class="form-control" v-model="form.HOLOT" />
        </div>

        <div class="mb-3">
          <label class="form-label">Tên</label>
          <input type="text" class="form-control" v-model="form.TEN" />
        </div>

        <div class="mb-3">
          <label class="form-label">Ngày sinh</label>
          <input type="date" class="form-control" v-model="formattedNgaySinh" />
        </div>

        <div class="mb-3">
          <label class="form-label">Giới tính</label>
          <select class="form-select" v-model="form.PHAI">
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">SĐT</label>
          <input type="text" class="form-control" v-model="form.DIENTHOAI" />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" v-model="form.EMAIL" />
        </div>

        <div class="mb-3">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" v-model="form.DIACHI" />
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary"><el-icon><Select /></el-icon> Cập nhật</button>
          <button type="button" class="btn btn-danger" @click="handleCancel"><el-icon><Close /></el-icon> Hủy</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import AppHeader from '../AppHeader.vue'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/nguoidung.store'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  id: {
    type: String,
  },
})

const userStore = useUserStore()

const form = ref({
  _id: userStore.userInfo?._id || '',
  HOLOT: userStore.userInfo?.HOLOT || '',
  TEN: userStore.userInfo?.TEN || '',
  NGAYSINH: userStore.userInfo?.NGAYSINH || '',
  PHAI: userStore.userInfo?.PHAI || '',
  DIENTHOAI: userStore.userInfo?.DIENTHOAI || '',
  EMAIL: userStore.userInfo?.EMAIL || '',
  DIACHI: userStore.userInfo?.DIACHI || '',
})
const formattedNgaySinh = computed({
  get(){
    return form.value.NGAYSINH?.substring(0, 10) || ''
  },
  set(value) {
    form.value.NGAYSINH = value
  }
})

const updateUser = async () => {
  try{
    const result = await userStore.UserUpdate(form.value)
    router.push({ name: 'trangcanhan', params: { id: userStore.userInfo?.MADOCGIA } })
    if(result === 'Cập nhật thông tin thành công!'){
       ElMessage.success(result)
    }else{
      ElMessage.error(result)
    }
   
  }catch(err){
    ElMessage.error('Lỗi khi cập nhật.')
  }
  
}

const handleCancel = () => {
  router.push({name: 'trangcanhan', params: {id: userStore.userInfo?._id}})
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
