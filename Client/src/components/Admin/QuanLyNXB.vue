<template>
    <div class="quan-ly-nxb container mb-5" data-aos="fade-up" data-aos-duration="1000">
        <h1 class="text-center text-2xl font-bold">Quản Lý Nhà Xuất Bản</h1>
        <div class="button-container mb-3 d-flex justify-content-end" >
            <form class="d-flex mx-auto w-50" role="search" @submit.prevent>
                <input
                    class="form-control rounded-pill px-4"
                    type="search"
                    placeholder="Nhập tên nhà xuất bản để tìm kiếm"
                    aria-label="Search"
                    v-model="publisherStore.searchText"
                />
            </form>
            <button class="btn btn-primary" @click="gotoAddPublisher"><el-icon><Plus /></el-icon> Thêm Nhà Xuất Bản</button>
        </div>
        <table class="w-full table-auto border-collapse">
            <thead>
                <tr>
                    <th class="text-center">STT</th>
                    <th class="text-center">Mã NXB</th>
                    <th class="text-center">Tên NXB</th>
                    <th class="text-center">Địa chỉ</th>
                    <th class="text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(nxb, index) in nxbList" :key="index">
                    <td>
                        {{ index + 1 }}
                    </td>
                    <td>
                        {{ nxb.MANXB }}
                    </td>
                    <td>
                        {{ nxb.TENNXB }}
                    </td>
                    <td>
                        {{ nxb.DIACHI }}
                    </td>
                    <td class="text-center align-middle">
                            <div class="d-flex justify-content-center gap-2">
                                <button class="btn btn-sm btn-primary" @click="updatePublisher(index)"><el-icon><Edit /></el-icon> Cập nhật</button>
                                <button class="btn btn-sm btn-danger" @click="deletePublisher(index)"><el-icon><Delete /></el-icon> Xóa</button>
                            </div>
                        </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { usePublisherStore } from '@/stores/nhaxuatban.store';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus';

const router = useRouter()
const  publisherStore = usePublisherStore();
onMounted( async () => {
    await publisherStore.getAll();
})
const nxbList = computed(() => {

    return publisherStore.getPublishersFromName(publisherStore.searchText)
})
const updatePublisher = (index) => {
    const publisher = nxbList.value[index]
    router.push({ name: 'quanlynxb-capnhatnxb', params: { MANXB: publisher.MANXB}})
}
const deletePublisher = (index) => {
    const publisher = nxbList.value[index]
    ElMessageBox.confirm(
        `Bạn có chắc chắn muốn xóa nhà xuất bản mã ${publisher.MANXB} không?`,
        'Xác nhận xóa',
        {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        type: 'warning',
        }
    )
    .then(() => {
        publisherStore.delete(publisher.MANXB)
        .then(() => {
            ElMessage.success(`Xóa nhà xuất bản mã ${publisher.MANXB} thành công.`)

        })
        .catch((err) => {
            ElMessage.error('Lỗi khi xóa nhà xuất bản')
        })

    })
    .catch(() => {
        ElMessage.error('Đã hủy thao tác xóa')
    })
}
const gotoAddPublisher = () => {
    publisherStore.searchText = ''
    router.push({name: 'quanlynxb-themnxb'})
}
onUnmounted(() => {
    publisherStore.searchText = ''
})
</script>
<style scoped>
.quan-ly-nxb {
    max-width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.quan-ly-nxb table {
    width: 100%;
    border-collapse: collapse;
}

.quan-ly-nxb th,
.quan-ly-nxb td {
    padding: 10px 12px;
    border: 1px solid #ccc;
    text-align: left;
}

.quan-ly-nxb th {
    background-color: #f8f9fa;
}

</style>