<template>
  <div id="carouselExample" class="carousel slide container mt-5" data-bs-ride="carousel">
    <div class="carousel-inner rounded shadow">
      <div class="carousel-item active">
        <img src="@/assets/slider_book.jfif" class="d-block w-100" alt="Thư viện 1">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h5>Chào mừng bạn đến với thư viện!</h5>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/slider_book2.jfif" class="d-block w-100" alt="Thư viện 2">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h5>Khám phá kho sách phong phú</h5>
        </div>
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'slider'
}
</script>

<style scoped>
.carousel-inner img {
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
