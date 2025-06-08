<template>
    <div class="quan-ly-sach container mb-5" data-aos="fade-up" data-aos-duration="1000">
        <h1 class="text-center text-2xl font-bold">Quản Lý Sách</h1>
        <div class="button-container mb-3 d-flex justify-content-end" >
            <form class="d-flex mx-auto w-50" role="search" @submit.prevent>
                <input
                    class="form-control rounded-pill px-4"
                    type="search"
                    placeholder="Nhập tên sách để tìm kiếm"
                    aria-label="Search"
                    v-model="bookStore.searchText"
                />
            </form>
            <button class="btn btn-primary" @click="gotoAddBook">Thêm sách</button>
        </div>
        <table class="w-full table-auto border-collapse">
            <thead>
                <tr>
                    <th class="border px-4 py-2 text-center">Mã sách</th>
                    <th class="border px-4 py-2 text-center">Tên sách</th>
                    <th class="border px-4 py-2 text-center">Tác giả</th>
                    <th class="border px-4 py-2 text-center">Đơn giá</th>
                    <th class="border px-4 py-2 text-center">Số lượng trong kho</th>
                    <th class="border px-4 py-2 text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(book, index) in bookList" :key="index">
                    <tr>
                        <td>{{ book.MASACH }}</td>
                        <td>{{ book.TENSACH }}</td>
                        <td>{{ book.TACGIA }}</td>
                        <td>{{ book.DONGIA }}</td>
                        <td>{{ book.SOQUYEN - book.SoLuongDaMuon }}</td>
                        <td class="text-center align-middle">
                            <div class="d-flex justify-content-center gap-2">
                                <button class="btn btn-sm btn-primary" @click="updateBook(index)">Cập nhật</button>
                                <button class="btn btn-sm btn-danger" @click="deleteBook(index)">Xóa</button>
                                <button class="btn btn-sm btn-secondary" @click="toggleDetail(index)">Chi tiết</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="expandedRow === index">
                        <td colspan="6">
                            <div class="p-3 bg-light rounded">
                                <div class="row">
                                <!-- Cột bên trái: Thông tin sách -->
                                <div class="col-md-6">
                                    <p><strong>Mã sách:</strong> {{ book.MASACH }}</p>
                                    <p><strong>Tên sách:</strong> {{ book.TENSACH }}</p>
                                    <p><strong>Đơn giá:</strong> {{ book.DONGIA }} (VND)</p>
                                    <p><strong>Số sách trong kho:</strong> {{ book.SOQUYEN - book.SoLuongDaMuon}}</p>
                                    <p><strong>Năm xuất bản:</strong> {{ book.NAMXUATBAN }}</p>
                                    <p><strong>Tác giả:</strong> {{ book.TACGIA }}</p>
                                </div>

                                <!-- Cột bên phải: Thông tin NXB -->
                                <div class="col-md-6">
                                    <p><strong>Mã nhà xuất bản:</strong> {{ book.MANXB?.MANXB || 'Không tồn tại' }}</p>
                                    <p><strong>Tên nhà xuất bản:</strong> {{ book.MANXB?.TENNXB || 'Không có dữ liệu' }}</p>
                                    <p><strong>Địa chỉ:</strong> {{ book.MANXB?.DIACHI || 'Không tìm thấy địa chỉ' }}</p>
                                </div>
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
import { useBookStore } from '@/stores/sach.store';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus';

const router = useRouter()
const bookStore = useBookStore()
onMounted(async() => {
    await bookStore.getAll()
})
const bookList = computed(() => {
    return bookStore.getBooksFormName(bookStore.searchText)
})

const expandedRow = ref(null)
const toggleDetail = (index) => {
    expandedRow.value = expandedRow.value === index ? null : index
}
const gotoAddBook = () => {
    bookStore.searchText = ''
    router.push({name: 'themsach'})
}
const deleteBook = (index) => {
    const bookDelete = bookList.value[index]
    ElMessageBox.confirm(
        `Bạn có chắc chắn xóa sách tên ${bookDelete.TENSACH} không?`,
        'Xác nhận xóa',
        {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    )
    .then(async () => {
        await bookStore.delete(bookDelete.MASACH)
        .then(() => {
            ElMessage.success(`Bạn đã xóa quyển sách ${bookDelete.TENSACH} thành công.`)
        })
        .catch((error) => {
            ElMessage.error('Lỗi khi xóa sách.')
        })
    })
    .catch(() => {
        ElMessage.error('Đã hủy thao tác xóa')
    })
    
}
const updateBook = (index) => {
    router.push({name: 'capnhatsach', params: { MASACH: bookList.value[index].MASACH}})
}
</script>
<style scoped>
.quan-ly-sach {
    max-width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.quan-ly-sach table {
    width: 100%;
    border-collapse: collapse;
}

.quan-ly-sach th,
.quan-ly-sach td {
    padding: 10px 12px;
    border: 1px solid #ccc;
    text-align: left;
}

.quan-ly-sach th {
    background-color: #f8f9fa;
}

</style>