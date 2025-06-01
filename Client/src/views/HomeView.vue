<script>
import sach from '@/components/sach.vue'
export default {
  components: {
    sach
  },
  data() {
    return  {
      books: [
        {
          id: 1,
          title: 'Sách 1',
          description: 'Mô tả sách 1',
          image: 'https://img.lovepik.com/png/20231113/an-open-book-that-has-cute-drawings-vector-clipart-album_575932_wh860.png'
        },
        {
          id: 2,
          title: 'Sách 2',
          description: 'Mô tả sách 2',
          image: 'https://pdcorel.com/wp-content/uploads/2023/06/27-Hoat-hinh-vector-pdcorel.com_-1.jpg'
        },
        {
          id: 3,
          title: 'Sách 3',
          description: 'Mô tả sách 3',
          image: 'https://nhasachphuongnam.com/images/detailed/217/dac-nhan-tam-bc.jpg'
        },
        {
          id: 4,
          title: 'Sách 4',
          description: 'Mô tả sách 4',
          image: 'https://qtedu.vn/wp-content/uploads/2021/08/dac-nhan-tam-tieng-trung-1.jpg'  
        }
      ]
    }
  }
}
</script>

<template>
  <main>
    <div class="container mt-5">
      <h4 class="text-center">
        Chào mừng bạn đến với hệ thống quản lý thư viện trực tuyến!
      </h4>
      <h4 class="text-center">
        Tại đây, bạn có thể tìm kiếm sách, quản lý thông tin cá nhân và theo dõi lịch sử mượn sách của mình.
      </h4>
    </div>

    <hr class="container" />
    <h1 class="text-center mb-4">Danh sách sách</h1>

    <div class="container">
      <div class="row">
        <div
          class="col-md-4 mb-4"
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
