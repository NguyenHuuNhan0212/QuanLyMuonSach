<template>
  <div class="form-container">
    <h2 class="text-center mb-4">Thêm Sách Mới</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="tenSach" class="form-label">Tên sách</label>
        <input type="text" class="form-control" id="tenSach" placeholder="Nhập tên sách" v-model="form.tenSach" required>
      </div>
      <div class="mb-3">
        <label for="tacGia" class="form-label">Tác giả</label>
        <input type="text" class="form-control" id="tacGia" placeholder="Nhập tên tác giả" v-model="form.tacGia" required>
      </div>
      <div class="mb-3">
        <label for="soQuyen" class="form-label">Số quyển</label>
        <input type="number" class="form-control" id="soQuyen" placeholder="Nhập số quyển sách nhập vào" v-model="form.soQuyen" required>
      </div>
      <div class="mb-3">
        <label for="donGia" class="form-label">Đơn giá (VND)</label>
        <input type="number" step="any" class="form-control" id="donGia" placeholder="Nhập đơn giá của sách" v-model="form.donGia" required>
      </div>
       <div class="mb-3">
        <label for="namXuatBan" class="form-label">Năm xuất bản</label>
        <input type="number" class="form-control" id="namXuatBan" placeholder="Nhập vào năm xuất bản" v-model="form.namXuatBan" required>
      </div>
      <div class="mb-3">
        <label for="nhaXuatBan" class="form-label">Nhà xuất bản</label>
        <select v-model="form.maNXB" class="form-select" id="nhaXuatBan" aria-label="Default select example" required>
            <option value="" disabled>---Chọn nhà xuất bản---</option>
            <option v-for="(nxb, index) in nxbList" :key="index" :value="nxb._id">
                {{ nxb.TENNXB }}
            </option>
        </select>
      </div>
       <div class="mb-3">
        <label for="image" class="form-label">Hình bìa sách </label>
        <input type="file" class="form-control" id="image" @change="handleImageUpload" accept="image/*" required>
      </div>
      
      <div class="button-group">
  <button type="submit" class="btn btn-primary"><el-icon><Select /></el-icon> Lưu</button>
  <button type="button" class="btn btn-danger" @click="cancelAddBook"><el-icon><CloseBold /></el-icon>Hủy</button>
</div>

    </form>
  </div>
</template>
<script setup>
import { usePublisherStore } from '@/stores/nhaxuatban.store'
import { useBookStore } from '@/stores/sach.store'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const publisherStore = usePublisherStore()
const nxbList = ref([])
const bookStore = useBookStore()
const router = useRouter()

onMounted(async () => {
    await publisherStore.getAll()
    nxbList.value = publisherStore.publishers
})

const form = ref({
    tenSach: '',
    tacGia: '',
    soQuyen:'',
    donGia: '',
    namXuatBan: '',
    maNXB: ''
})
const imageFile = ref('')

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('image', file)
    console.log(formData)
    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      imageFile.value = res.data.imageUrl // => /uploads/xxxx.jpg
      ElMessage.success('Tải ảnh thành công')
    } catch (err) {
      ElMessage.error('Lỗi khi tải ảnh')
    }
  }
}


const submitForm = async () => {
  try {
    const data = {
      TENSACH: form.value.tenSach,
      TACGIA: form.value.tacGia,
      SOQUYEN: form.value.soQuyen,
      DONGIA: form.value.donGia,
      NAMXUATBAN: form.value.namXuatBan,
      MANXB: form.value.maNXB,
      image: imageFile.value // ← URL nhận được sau khi upload
    }
    console.log(data)
    const result = await bookStore.add(data)

    router.push({ name: 'quanlysach' })

    if (result === 'Thêm sách thành công.') {
      ElMessage.success(result)
    } else if (result === 'Sách đã tồn tại.') {
      ElMessage.error('Tên sách đã tồn tại')
    }
  } catch (err) {
    ElMessage.error('Lỗi khi thêm sách')
  }
}

const cancelAddBook = () => {
    router.push({name: 'quanlysach'})
}
</script>
<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form-label {
  font-weight: 600;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: #0d6efd;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>