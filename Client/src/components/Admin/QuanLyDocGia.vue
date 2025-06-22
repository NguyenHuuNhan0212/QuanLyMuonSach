<template>
    <div class="borrow-table-container mb-5" data-aos="fade-up" data-aos-duration="1000">
        <h1 class="text-center text-2xl font-bold mb-4">Quản lý độc giả</h1>
        <div class="button-container mb-3 d-flex justify-content-end" >
            <form class="d-flex mx-auto w-50" role="search" @submit.prevent>
                <input
                    class="form-control rounded-pill px-4"
                    type="search"
                    placeholder="Nhập tên độc giả để tìm kiếm phiếu mượn"
                    aria-label="Search"
                    v-model="readerStore.searchText"
                />
            </form>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="text-center">STT</th>
                    <th class="text-center">Mã độc giả</th>
                    <th class="text-center">Tên độc giả</th>
                    <th class="text-center">Ngày sinh</th>
                    <th class="text-center">Giới tính</th>
                    <th class="text-center">Địa chỉ</th>
                    <th class="text-center">Điện thoại</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, index) in readerList" :key="item._id">
                     <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.MADOCGIA }}</td>
                        <td>{{ item.HOLOT }} {{ item.TEN }}</td>
                        <td>{{ frmNgaySinh(item.NGAYSINH) }}</td>
                        <td>{{ item.PHAI}}</td>
                        <td>{{ item.DIACHI }}</td>
                        <td>{{ item.DIENTHOAI }}</td>
                        <td>{{ item.EMAIL }}</td>
                        <td class="text-center align-middle">
                            <div class="d-flex justify-content-center gap-2">
                                <button class="btn btn-sm btn-secondary" @click="toggleDetail(index)"><el-icon><More /></el-icon> Chi tiết</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="detail===index">
                        <td colspan="9">
                             <div class="p-3 bg-light rounded">
                                <div class="col-md-6">
                                    <p><strong>Mã độc giả:</strong> {{ item.MADOCGIA }}</p>
                                    <p><strong>Tên độc giả:</strong> {{ item.HOLOT }} {{ item.TEN }}</p>
                                    <p><strong>Ngày sinh:</strong> {{ frmNgaySinh(item.NGAYSINH) }}</p>
                                    <p><strong>Giới tính:</strong> {{ item.PHAI }}</p>
                                    <p><strong>Số điện thoại:</strong> {{ item.DIENTHOAI }}</p>
                                    <p><strong>Email:</strong>{{ item.EMAIL }}</p>
                                    <p><strong>Địa chỉ:</strong> {{ item.DIACHI }}</p>
                                   <p><strong>Ngày tạo tài khoản:</strong> {{ frmNgaySinh(item.createdAt) }}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
                   
            </tbody>
        </table>
    </div>
</template>
<script setup> 
import { useReaderStore } from '@/stores/docgia.store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
const readerStore= useReaderStore()
onMounted(async() => {
    await readerStore.getAll()
})

const readerList = computed(()=>{
    return readerStore.getAllReaderFromName(readerStore.searchText)
})
function frmNgaySinh(ngaySinh) {
  if (!ngaySinh) return '';
  return ngaySinh.slice(0, 10).split('-').reverse().join('/');
}
const detail = ref(null)
const toggleDetail = (index) => {
    detail.value = detail.value === null ? index : null
}
</script>