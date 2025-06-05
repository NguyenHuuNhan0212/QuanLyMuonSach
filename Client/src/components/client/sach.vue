<template>
  <RouterLink :to="{ name: 'chitietsach', params: { MaSach: book.MASACH }}" class="book-link">
    <div class="card text-center book-card" data-aos="fade-up" data-aos-duration="500">
      <div class="image-wrapper-home">
        <img :src="book.image" class="card-img-top book-image" :alt="book.TENSACH" />
      </div>
      <br>
      <br>
      <div class="card-body">
        <h5 class="card-title">{{ book.TENSACH }}</h5>
        <p><i>{{ book.TACGIA }}</i></p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

</script>

<style scoped>
.book-link {
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-link:hover .book-card {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.03);
}

.book-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  transition: inherit;
}

/* Ảnh */
.image-wrapper-home {
  width: 100%;
  height: 250px; /* Cố định chiều cao ảnh */
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-image {
  width: 100%;
  height: 100%;
  padding: 10px;
  object-fit: cover;
  transition: 0.3s;
}

/* Tiêu đề */
.card-body {
  padding: 1rem;
  flex-grow: 1;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
</style>
