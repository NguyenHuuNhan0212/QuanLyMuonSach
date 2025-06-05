<template>
    <div class="container mt-4" data-aos="fade-up" data-aos-duration="1000">
        <h4 class="mb-3 text-center">Quản lý mượn sách</h4>

        <el-table :data="borrowStore.AdminMuon" border stripe style="width: 100%">
            <el-table-column label="Người mượn">
                <template #default="{ row }">
                    {{ row.MADOCGIA?.HOLOT }} {{ row.MADOCGIA?.TEN }}
                </template>
            </el-table-column>

            <el-table-column label="Tên sách">
                <template #default="{ row }">
                    {{ row.MASACH?.TENSACH }}
                </template>
            </el-table-column>

            <el-table-column label="Ngày mượn">
                <template #default="{ row }">
                    {{ formatDate(row.NGAYMUON) }}
                </template>
            </el-table-column>

            <el-table-column label="Trạng thái">
                <template #default="{ row }">
                    <el-tag :type="tagType(row.TrangThai)">
                        {{ row.TrangThai }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Hành động" width="300">
                <template #default="{ row }">
                    <el-button type="info" size="small" @click="viewDetail(row)">
                        Chi tiết
                    </el-button>
                    <el-button v-if="row.TrangThai === 'Chờ lấy'" type="primary" size="small" @click="markAsTaken(row)">
                        Đã lấy
                    </el-button>
                    <el-button v-else-if="row.TrangThai === 'Đã lấy'" type="success" size="small"
                        @click="markReturned(row)">
                        Đã trả
                    </el-button>
                    <el-button v-else-if="row.TrangThai === 'Đã trả'" type="danger" size="small"
                        @click="deleteBorrow(row)">
                        Xóa
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Dialog chi tiết -->
        <el-dialog v-model="detailDialogVisible" width="500px" append-to-body>
            <template #header>
                <div style="text-align: center;">
                    <span style="font-weight: bold;">📋 Chi tiết phiếu mượn</span>
                </div>
            </template>
            <template #default>
                <p><strong>📗 Mã sách:</strong> {{ selected?.MASACH?.MASACH || 'Không rõ' }}</p>
                <p><strong>📕 Tên sách:</strong> {{ selected?.MASACH?.TENSACH || 'Không rõ' }}</p>
                <p><strong>🗓️ Ngày mượn:</strong> {{ formatDate(selected?.NGAYMUON) }}</p>
                <p v-if="selected?.TrangThai === 'Đã trả'"><strong>🗓️ Ngày trả:</strong> {{ formatDate(selected?.NGAYTRA) }}</p>
                <p><strong>📌 Trạng thái:</strong> {{ selected?.TrangThai }}</p>
                <p><strong>🔢 Số lượng mượn:</strong> {{ selected?.SoLuongMuon }}</p>
                <p><strong>🙋‍♂️ Độc giả:</strong> {{ selected?.MADOCGIA?.HOLOT }} {{ selected?.MADOCGIA?.TEN }}</p>
                <p><strong>📞 SĐT độc giả:</strong> {{ selected?.MADOCGIA?.DIENTHOAI }}</p>
                <p><strong>📧 Email độc giả:</strong> {{ selected?.MADOCGIA?.EMAIL || 'Không có địa chỉ email hợp lệ' }}
                </p>
                <p><strong>🏡 Địa chỉ độc giả:</strong> {{ selected?.MADOCGIA?.DIACHI || 'Không tìm thấy địa chỉ' }}</p>
                <p><strong>🧑‍💼 Nhân viên duyệt:</strong> {{ selected?.MSNV?.HoTenNV || 'Chưa có' }}</p>
                <p><strong>📱 SĐT nhân viên:</strong> {{ selected?.MSNV?.SoDienThoai || 'Chưa có' }}</p>
            </template>
            <template #footer>
                <el-button @click="detailDialogVisible = false">Đóng</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useBorrowBookStore } from '../../stores/muonsach.store';

const borrowStore = useBorrowBookStore();

onMounted(() => {
    borrowStore.getAllForAdmin();
});

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
        ? 'Không xác định'
        : date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
};

const tagType = (status) => {
    switch (status) {
        case 'Đã trả':
            return 'success';
        case 'Đã lấy':
            return 'primary';
        case 'Chờ lấy':
            return 'warning';
        default:
            return 'info';
    }
};

// Dialog & dữ liệu chi tiết
const detailDialogVisible = ref(false);
const selected = ref(null);

const viewDetail = (row) => {
    selected.value = row;
    detailDialogVisible.value = true;
};

// Đánh dấu là đã lấy
const markAsTaken = async (row) => {
    const success = await borrowStore.updateBorrowForAdmin(row._id, {
        TrangThai: 'Đã lấy',
    });
    if (success) {
        ElMessage.success('Đã cập nhật trạng thái: Đã lấy');
    } else {
        ElMessage.error('Không thể cập nhật trạng thái');
    }
};

// Đánh dấu đã trả sách
const markReturned = async (row) => {
    const success = await borrowStore.updateBorrowForAdmin(row._id, {
        TrangThai: 'Đã trả',
    });
    if (success) {
        ElMessage.success('Đã cập nhật trạng thái: Đã trả');
    } else {
        ElMessage.error('Không thể cập nhật trạng thái');
    }
};

// Xóa phiếu mượn
const deleteBorrow = (row) => {
    ElMessageBox.confirm(
        `Bạn có chắc muốn xóa phiếu mượn "${row.MASACH?.TENSACH}" của ${row.MADOCGIA?.HOLOT} ${row.MADOCGIA?.TEN}?`,
        'Xác nhận',
        {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    ).then(async () => {
        const success = await borrowStore.deleteBorrowForAdmin(row._id);
        if (success) {
            ElMessage.success('Đã xóa phiếu mượn');
        } else {
            ElMessage.error('Không thể xóa');
        }
    });
};
</script>

<style scoped>
.container {
    max-width: 1000px;
}
</style>
