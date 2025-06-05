<template>
  <div class="sidebar bg-light p-3" data-aos="fade-right" style="width: 250px; height: 100vh;">
    <h5 class="mb-4">📚 Quản trị</h5>
    <ul class="nav flex-column">
      <li class="nav-item mb-2">
        <router-link class="nav-link" :to="{name: 'quanlymuonsach'}">
          <i class="fas fa-tasks me-2"></i> Quản lý mượn sách
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link class="nav-link" to="/admin/books">
          <i class="fas fa-book me-2"></i> Sách
        </router-link>
      </li>
      <li class="nav-item mb-2">
        <router-link class="nav-link" to="/admin/users">
          <i class="fas fa-users me-2"></i> Người dùng
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
}
.nav-link {
  color: #333;
}
.nav-link:hover {
  color: #007bff;
}
</style>
<script setup> 

</script>