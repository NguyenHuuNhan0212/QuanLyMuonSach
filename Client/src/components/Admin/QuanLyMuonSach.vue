<template>
    <div class="borrow-table-container">
        <h1 class="text-center text-2xl font-bold mb-4">Danh Sách Mượn Sách</h1>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="text-center">Mã mượn</th>
                    <th class="text-center">Tên độc giả</th>
                    <th class="text-center">Tên sách</th>
                    <th class="text-center">Ngày mượn</th>
                    <th class="text-center">Đơn giá</th>
                    <th class="text-center">Trạng thái</th>
                    <th class="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, index) in borrowList" :key="item.id">
                    <tr>
                        <td>{{ item.MAMUONSACH }}</td>
                        <td>{{ item.MADOCGIA?.HOLOT }} {{ item.MADOCGIA?.TEN }}</td>
                        <td>{{ item.MASACH?.TENSACH }}</td>
                        <td>{{ formatDate(item.NGAYMUON) || 'Chưa lấy sách' }}</td>
                        <td>{{ item.MASACH?.DONGIA }}</td>
                        <td>
                            <select v-model="item.TrangThai" class="form-select text-center fw-semibold"
                                :class="bgSelect(item.TrangThai)">
                                <option v-if="item.TrangThai !== 'Đã trả'" value="Chờ lấy" class="bg-warning fw-semibold">Chờ lấy sách</option>
                                <option v-if="item.TrangThai !== 'Đã trả'" value="Đã lấy" class="bg-success fw-semibold">Đã lấy sách</option>
                                <option value="Đã trả" class="bg-info fw-semibold">Đã trả sách</option>
                            </select>
                        </td>
                        <td class="text-center align-middle">
                            <div class="d-flex justify-content-center gap-2">
                                <button class="btn btn-sm btn-primary" @click="updateStatus(index)">Cập nhật</button>
                                <button class="btn btn-sm btn-danger" @click="deleteBorrow(index)">Xóa</button>
                                <button class="btn btn-sm btn-secondary" @click="toggleDetail(index)">Chi tiết</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Chi tiết mở rộng -->
                    <tr v-if="expandedRow === index">
                        <td colspan="7">
                            <div class="p-3 bg-light rounded">
                                <div class="row">
                                <!-- Cột bên trái: Thông tin độc giả -->
                                <div class="col-md-6">
                                    <p><strong>Mã mượn:</strong> {{ item.MAMUONSACH }}</p>
                                    <p><strong>Độc giả:</strong> {{ item.MADOCGIA?.HOLOT }} {{ item.MADOCGIA?.TEN }}</p>
                                    <p><strong>Email:</strong> {{ item.MADOCGIA?.EMAIL || 'Không có' }}</p>
                                    <p><strong>Sách:</strong> {{ item.MASACH?.TENSACH }} (Đơn giá: {{ item.MASACH?.DONGIA }} VNĐ)</p>
                                    <p><strong>Số lượng mượn:</strong> {{ item.SoLuongMuon }}</p>
                                    <p><strong>Ngày mượn:</strong> {{ formatDate(item.NGAYMUON) }}</p>
                                    <p v-if="item.TrangThai === 'Đã trả'"><strong>Ngày trả:</strong> {{ formatDate(item.NGAYTRA) }}</p>
                                    <p><strong>Trạng thái:</strong> {{ item.TrangThai }}</p>
                                </div>

                                <!-- Cột bên phải: Thông tin nhân viên -->
                                <div class="col-md-6">
                                    <p><strong>Nhân viên xử lý:</strong> {{ item.MSNV?.HoTenNV || 'Chưa xác định' }}</p>
                                    <p><strong>Số điện thoại nhân viên:</strong> {{ item.MSNV?.SoDienThoai || 'Không có' }}</p>
                                    <p><strong>Địa chỉ:</strong> {{ item.MSNV?.DiaChi || 'Không tìm thấy địa chỉ' }}</p>
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
import { onMounted, ref } from 'vue'
import { useBorrowBookStore } from '@/stores/muonsach.store'
import { ElMessage, ElMessageBox } from 'element-plus'
const borrowStore = useBorrowBookStore()
const borrowList = ref([])
onMounted(async () => {
    await borrowStore.getAllForAdmin()
    borrowList.value = borrowStore.AdminMuon
})
const formatDate = (dateStr) => {
    if (!dateStr) return 'Chưa lấy sách'
    return new Date(dateStr).toLocaleDateString('vi-VN')
}
const updateStatus = (index) => {
    const item = borrowList.value[index]
    const data = ref({
        MAMUONSACH: item.MAMUONSACH,
        MADOCGIA: item.MADOCGIA._id,
        MASACH: item.MASACH._id,
        NGAYMUON: item.NGAYMUON,
        DONGIA: item.MASACH.DONGIA,
        TrangThai: item.TrangThai
    })
    borrowStore.updateBorrowForAdmin(item._id, data.value)
        .then(() => {
            borrowStore.getAllForAdmin() // Refresh the list after update
            ElMessage.success('Cập nhật thành công!')
            console.log('Cập nhật trạng thái:', data.value)
        })
        .catch(error => {
            console.error('Cập nhật thất bại:', error)
            ElMessage.error('Cập nhật thất bại, vui lòng thử lại!')
        })
}
const deleteBorrow = (index) => {
    const item = borrowList.value[index]
    ElMessageBox.confirm(
        `Bạn có chắc chắn muốn xóa phiếu mượn mã ${item.MAMUONSACH} không?`,
        'Xác nhận xóa',
        {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning',
        }
    )
    .then(() => {
         borrowStore.deleteBorrowForAdmin(item._id)
        .then(() => {
            borrowList.value = borrowStore.AdminMuon
            ElMessage.success(`Xóa phiếu mượn mã ${item.MAMUONSACH} thành công`)
        })
        .catch(error => {
            ElMessage.error('Xóa thất bại, vui lòng thử lại!')
        })
    })
    .catch(() => {
        ElMessage.error('Đã hủy thao tác xóa')
    })
   
}
const bgSelect = (status) => {
    switch (status) {
        case 'Chờ lấy':
            return 'bg-warning';
        case 'Đã lấy':
            return 'bg-success';
        case 'Đã trả':
            return 'bg-info';
        default:
            return '';
    }
}
const expandedRow = ref(null)

const toggleDetail = (index) => {
  expandedRow.value = expandedRow.value === index ? null : index
}

</script>

<style scoped>
.borrow-table-container {
    max-width: 100%x;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 10px 12px;
    border: 1px solid #ccc;
    text-align: left;
}

.table th {
    background-color: #f8f9fa;
}

.form-select {
    width: 100%;
    padding: 5px;
    background-color: aliceblue;
}

</style>
