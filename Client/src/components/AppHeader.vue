<template>
  <nav class="navbar navbar-expand-lg bg-light py-3 shadow-sm">
    <div class="container-fluid align-items-center">

      <!-- Logo -->
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img src="@/assets/logo.jpg" alt="Logo" width="50" height="50" class="me-2" />
        <span class="fs-5 fw-bold text-dark">Thư viện trực tuyến</span>
      </router-link>

      <!-- Nút hamburger khi thu nhỏ màn hình -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Nội dung navbar -->
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <!-- Trái: Trang chủ -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link fw-semibold text-primary">Trang Chủ</router-link>
          </li>
        </ul>

        <!-- Giữa: Thanh tìm kiếm -->
        <form class="d-flex mx-auto w-50" role="search" @submit.prevent>
          <input
            class="form-control rounded-pill px-4"
            type="search"
            placeholder="Nhập tên sách để tìm kiếm"
            aria-label="Search"
            v-model="searchQuery"
            @keyup.enter="onSearch"
          />
        </form>

        <!-- Phải: Dropdown menu -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle fw-semibold text-primary me-4"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link :to="{name: 'login'}" class="dropdown-item">Đăng nhập</router-link>
              </li>
              <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
              <li><a class="dropdown-item" href="#">Lịch sử mượn sách</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      // Xử lý khi nhấn Enter tìm kiếm
      alert(`Tìm kiếm: ${this.searchQuery}`);
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #eaf4ff; /* Màu nền nhạt */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar-brand span {
  font-size: 1.3rem;
}

.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
/* @media (max-width: 768px) {
  .navbar form {
    justify-content: center;
  }
} */

</style>
