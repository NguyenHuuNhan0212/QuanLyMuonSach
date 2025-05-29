<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Đăng nhập</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Tên đăng nhập</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Nhập tên đăng nhập"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Xử lý logic đăng nhập tại đây
      console.log('Đăng nhập với:', this.username, this.password);

      // Ví dụ: Kiểm tra đơn giản
      if (this.username === 'admin' && this.password === '123456') {
        alert('Đăng nhập thành công!');
        // Chuyển trang sau khi đăng nhập (nếu cần):
        this.$router.push({ name: 'home' });
      } else {
        alert('Sai tên đăng nhập hoặc mật khẩu');
      }
    },
  },
};
</script>

<style scoped>
.container {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
