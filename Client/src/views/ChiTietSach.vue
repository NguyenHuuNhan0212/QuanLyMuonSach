<template>
    <div class="book-detail container py-4">
        <button class="btn btn-outline-secondary mb-4" @click="$router.back()"><el-icon>
                <Back />
            </el-icon></button>

        <div class="row">
            <div class="col-md-5">
                <div class="image-wrapper">
                    <img :src="book.image" :alt="book.title" class="img-fluid rounded shadow" />
                </div>
            </div>
            <div class="col-md-7">
                <h2 class="mb-3">{{ book.title }}</h2>
                <h5 class="text-muted mb-3">Tác giả: {{ book.tacgia }}</h5>
                <p class="description mb-4">Mô tả: {{ book.description }}</p>
                <div class="quantity-control mb-4 ">
                    <span>Số lượng: </span>
                    <br>
                    <el-input-number class="mt-3" v-model="quantity" :min="1" :max="10" @change="handleChange" />
                </div>

                <button class="btn btn-primary" @click="borrowBook">Đăng ký mượn</button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: "BookDetail",
  data() {
    return {
      book: null,
      quantity: 1
    };
  },
  created() {
    const id = Number(this.$route.params.id);
    const books = [
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
      ];
    this.book = books.find(b => b.id === id);
    if (!this.book) {
      this.$router.replace('/');
    }
  },
  methods: {
    handleChange(value) {
      this.quantity = value;
    },
    borrowBook() {
      alert(`Bạn đã mượn ${this.quantity} cuốn sách: ${this.book.title}`);
      // Bạn có thể thay alert bằng logic gọi API hoặc xử lý khác
    }
  }
};

</script>


<style scoped>
.image-wrapper {
    width: 100%;
    max-height: 400px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-wrapper img {
    object-fit: cover;
    max-height: 300px;
    max-width: 200px;
    border-radius: 12px;
}

.description {
    font-size: 1rem;
    line-height: 1.6;
}
.quantity-control button {
  width: 35px;
  height: 35px;
  font-size: 1.2rem;
  padding: 0;
  text-align: center;
}

.quantity-control span {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
}

</style>
