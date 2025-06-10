<template>
  <div class="sidebar bg-light p-3" data-aos="fade-right">
    <h5 class="mb-4"><router-link class="nav-link-home" :to="{name: 'trangchuadmin'}" >📚 Quản trị</router-link></h5>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <router-link class="nav-link" :to="{name: 'quanlymuonsach'}">
          <i class="fas fa-tasks me-2"></i> Quản lý mượn sách
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link class="nav-link" :to="{name: 'quanlynxb'}">
          <i class="fas fa-building me-2"></i> Quản lý nhà xuất bản
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link class="nav-link" :to="{name: 'quanlysach'}">
          <i class="fas fa-book me-2"></i> Quản lý sách
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link class="nav-link" :to="{name: 'trangcanhanadmin'}">
          <i class="fas fa-users me-2"></i> Tài khoản
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  border-right: 1px solid #ddd;
  background-color: #f8f9fa;
  padding: 1rem;
  z-index: 1000;
  overflow-y: auto;
}

.nav-link, .nav-link-home {
  color: #333;
  text-decoration: none;
}
.nav-link:hover {
  color: #007bff;
}
</style>

<script setup> 

</script>