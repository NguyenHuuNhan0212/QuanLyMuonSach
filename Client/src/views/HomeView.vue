<script>
import sach from '@/components/sach.vue'
import slider from '@/components/slider.vue'
export default {
  components: {
    sach,
    slider
  },
  data() {
    return  {
      books: [
        {
          id: 1,
          title: 'Sách 1',
          description: 'Mô tả sách 1',
          tacgia: 'Tác giả 1',
          image: 'https://img.lovepik.com/png/20231113/an-open-book-that-has-cute-drawings-vector-clipart-album_575932_wh860.png'
        },
        {
          id: 2,
          title: 'Sách 2',
          description: 'Mô tả sách 2',
          tacgia: 'Tác giả 2',
          image: 'https://pdcorel.com/wp-content/uploads/2023/06/27-Hoat-hinh-vector-pdcorel.com_-1.jpg'
        },
        {
          id: 3,
          title: 'Sách 3',
          description: 'Mô tả sách 3',
          tacgia: 'Tác giả 3',
          image: 'https://nhasachphuongnam.com/images/detailed/256/toan-lop-4-tap-1-ket-noi-tri-thuc-voi-cuoc-song.jpg'
        },
        {
          id: 4,
          title: 'Sách 4',
          description: 'Mô tả sách 4',
          tacgia: 'Tác giả 4',
          image: 'https://qtedu.vn/wp-content/uploads/2021/08/dac-nhan-tam-tieng-trung-1.jpg'  
        },
        {
          id: 5,
          title: 'Sách 5',
          description: 'Mô tả sách 5',
          tacgia: 'Tác giả 5',
          image: 'https://pdcorel.com/wp-content/uploads/2023/06/27-Hoat-hinh-vector-pdcorel.com_-1.jpg'
        },
        {
          id: 6,
          title: 'Sách 6',
          description: 'Mô tả sách 6',
          tacgia: 'Tác giả 6',
          image: 'https://nhasachphuongnam.com/images/detailed/256/toan-lop-4-tap-1-ket-noi-tri-thuc-voi-cuoc-song.jpg'
        },
        {
          id: 7,
          title: 'Sách 7',
          description: 'Mô tả sách 7',
          tacgia: 'Tác giả 7',
          image: 'https://qtedu.vn/wp-content/uploads/2021/08/dac-nhan-tam-tieng-trung-1.jpg'  
        }
      ]
    }
  }
}
</script>

<template>
  <main>
    <!-- <div class="container mt-5">
      <h4 class="text-center">
        Chào mừng bạn đến với hệ thống quản lý thư viện trực tuyến!
      </h4>
      <h4 class="text-center">
        Tại đây, bạn có thể tìm kiếm sách, quản lý thông tin cá nhân và theo dõi lịch sử mượn sách của mình.
      </h4>
    </div> -->
    <slider />
    <hr class="container mt-5" />
    <h1 class="text-center mb-4">Danh sách sách</h1>

    <div class="container">
      <div class="row">
        <div
          class="col-md-3 mb-4"
          v-for="book in books"
          :key="book.id"
        >
          <sach :book="book" />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
</style>
