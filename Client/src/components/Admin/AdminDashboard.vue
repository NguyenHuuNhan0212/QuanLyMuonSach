<template>
  <div class="container my-4" data-aos="fade-up" data-aos-duration="1000">
    <h4 class="mb-4 text-center" >Dashboard</h4>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card text-white text-center" :style="{ backgroundColor: '#17a2b8' }">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="fw-bold">{{ bookCount }}</h2>
                <p class="mb-1">Tổng số sách trong thư viện</p>
              </div>
              <i class="fa-solid fa-book big-icon"></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <router-link class="nav-link" :to="{name: 'quanlysach'}"><small>Xem thêm <i class="fas fa-arrow-circle-right"></i></small></router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-white text-center" :style="{backgroundColor: '#28a745' }">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="fw-bold">{{ publisherCount }}</h2>
                <p class="mb-1">Tổng số nhà xuất bản</p>
              </div>
              <i class="fa-solid fa-print big-icon"></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <router-link class="nav-link" :to="{name: 'quanlynxb'}"> <small>Xem thêm <i class="fas fa-arrow-circle-right"></i></small></router-link>
           
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-white text-center" :style="{backgroundColor: '#fd7e14' }">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="fw-bold">{{ borrowCount }}</h2>
                <p class="mb-1">Tổng số phiếu mượn</p>
              </div>
            <i class="fa-solid fa-file-pen big-icon"></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <router-link class="nav-link" :to="{name: 'quanlymuonsach'}"><small>Xem thêm <i class="fas fa-arrow-circle-right"></i></small></router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white text-center" :style="{backgroundColor: '#6f42c1' }">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="fw-bold">{{ borrowStore.sachDangLay || '0' }}</h2>
                <p class="mb-1">Tổng số lượng sách đang mượn</p>
              </div>
              <i class="fa-solid fa-book big-icon"></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <router-link class="nav-link" :to="{name: 'quanlymuonsach'}"><small>Xem thêm <i class="fas fa-arrow-circle-right"></i></small></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from '@/stores/sach.store';
import { usePublisherStore } from '@/stores/nhaxuatban.store';
import { useBorrowBookStore } from '@/stores/muonsach.store';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const publisherStore = usePublisherStore()
const borrowStore = useBorrowBookStore()
const bookStore = useBookStore()
const bookCount = ref('')
const borrowCount = ref('')
const publisherCount = ref('')
onMounted(async ()=> {
    await bookStore.getAll()
    await publisherStore.getAll()
    await borrowStore.getAllForAdmin()
    bookCount.value = bookStore.count
    publisherCount.value = publisherStore.count
    borrowCount.value = borrowStore.count
})
</script>

<style scoped>
.card {
  border-radius: 0.75rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.card-footer {
  color: white;
  cursor: pointer;
}
.card-footer:hover {
  text-decoration: underline;
}
.big-icon {
  font-size: 3rem;
}
.nav-link{
    color: white;
    text-decoration: none;
}
</style>