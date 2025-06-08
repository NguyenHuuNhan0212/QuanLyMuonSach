<template>
    <div class="form-container">
        <h2 class="text-center mb-4">Cập Nhật Nhà Xuất Bản</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="tenNXB" class="form-label">Tên Nhà Xuất Bản</label>
                <input type="text" class="form-control" id="tenNXB" placeholder="Nhập tên nhà xuất bản"
                    v-model=form.tenNXB required>
            </div>
            <div class="mb-3">
                <label for="diaChiNXB" class="form-label">Địa Chỉ</label>
                <input type="text" class="form-control" id="diaChiNXB" placeholder="Nhập địa chỉ nhà xuất bản"
                    v-model="form.diaChiNXB" required>
            </div>
            <div class="button-group">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button type="button" class="btn btn-danger" @click="cancelAddPublisher">Hủy</button>
            </div>

        </form>
    </div>
</template>
<script setup>
import { usePublisherStore } from '../../stores/nhaxuatban.store'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const MANXB = route.params?.MANXB
const publisherStore = usePublisherStore()

const form = ref({
    tenNXB: '',
    diaChiNXB: ''
})

onMounted(async () => {
    await publisherStore.getAll()
    const pub = publisherStore.getPublisher(MANXB)
    if (pub) {
        form.value.tenNXB = pub.TENNXB
        form.value.diaChiNXB = pub.DIACHI
    } else {
        ElMessage.warning('Không tìm thấy nhà xuất bản.')
        router.push({ name: 'quanlynxb' })
    }
})

const submitForm = async () => {
    const data = {
        TENNXB: form.value.tenNXB,
        DIACHI: form.value.diaChiNXB
    }
    const result = await publisherStore.update(MANXB, data)
    if (result === 'Cập nhật nhà xuất bản thành công') {
        ElMessage.success(result)
        router.push({ name: 'quanlynxb' })
    } else if(result === 'Nhà xuất bản tồn tại'){
        ElMessage.error(result)
        router.push({name: 'quanlynxb'})
    }
    else {
        ElMessage.error('Cập nhật thất bại')
        router.push({name: 'quanlynxb'})
    }
}

const cancelAddPublisher = () => {
    router.push({ name: 'quanlynxb' })
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