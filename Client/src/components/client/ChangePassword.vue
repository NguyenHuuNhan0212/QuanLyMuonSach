<template>
  <AppHeader />
  <main class="mt-5 pt-5" data-aos="fade-up" data-aos-duration="1000">
    <div class="container update-container">
      <h1 class="text-center mb-4">Đổi mật khẩu</h1>

      <form @submit.prevent="changePassword" class="update-form">
        <div class="mb-3">
          <label class="form-label">Mật khẩu hiện tại</label>
          <input type="password" class="form-control" v-model="form.password" placeholder="Nhập mật khẩu hiện tại của bạn" required/>
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu mới</label>
          <input type="password" class="form-control" v-model="form.newPassword" placeholder="Nhập mật khẩu mới" required/>
        </div>

        <div class="mb-3">
          <label class="form-label">Nhập lại mật khẩu</label>
          <input type="password" class="form-control" v-model="form.validationPassword" placeholder="Nhập lại mật khẩu" required/>
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary"><el-icon><Lock /></el-icon> Đổi mật khẩu</button>
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
    password: '',
    newPassword: '',
    validationPassword:''

})

const changePassword = async () =>{
    try{
        if(form.value.newPassword !== form.value.validationPassword){
            ElMessage.error('Xác nhận mật khẩu không đúng.')
            return 
        }
        if(form.value.newPassword.length < 6){
            ElMessage.warning('Mật khẩu mới phải có ít nhất 6 ký tự.')
            return
        }

        const data = {
            password: form.value.password,
            newPassword: form.value.newPassword
        }
        const result = await userStore.changePassword(data)
        if(result === 'Đổi mật khẩu thành công.'){
            ElMessage.success(result)
            router.push({name: 'trangcanhan', params: {id: userStore.userInfo?._id}})
        }else{
            ElMessage.error(result)
        }
    }catch(err){
        ElMessage.error('Lỗi khi đổi mật khẩu.')
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
