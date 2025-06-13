<template>
  <header class="fixed-top" data-aos="fade-down" data-aos-duration="8000">

  <nav class="navbar navbar-expand-lg bg-light py-3 shadow-sm">
    <div class="container-fluid align-items-center ">

      <!-- Logo -->
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img src="@/assets/logo.jpg" alt="Logo" width="50" height="50" class="me-2 logo-header" />
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
            <router-link 
              :to="{ name: 'trangchu' }" 
              class="nav-link fw-semibold text-primary nav-link-border"
            >
              Trang Chủ
            </router-link>
          </li>
        </ul>

        <!-- Giữa: Thanh tìm kiếm -->
       <form class="d-flex align-items-center mx-auto w-50 gap-2" role="search" @submit.prevent>
              <select v-if="route.name === 'trangchu'" v-model="sachStore.searchMode" class="form-select rounded-pill border-0 shadow-sm px-3" style="max-width: 160px;">
                <option value="" selected>Tất cả</option>
                <option value="author">Tác giả</option>
                <option value="bookName">Tên sách</option>
                <option value="publisherName">Nhà xuất bản</option>
                <option value="publisherYear">Năm xuất bản</option>
              </select>

              <input
                v-if="route.name === 'trangchu'"
                v-model="sachStore.searchText"
                type="search"
                class="form-control rounded-pill px-4 border-0 shadow-sm"
                placeholder="Nhập tên sách, tác giả, nhà xuất bản..."
                aria-label="Search"
              />
        </form>


          <router-link v-if="!userStore.token && !userStore.staffToken" :to="{name: 'dangnhap'}" class="nav-link fw-semibold text-primary nav-link-border">Đăng nhập</router-link>
        
        <!-- Phải: Dropdown menu -->
        <ul v-else class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle fw-semibold text-primary me-4 nav-link-border"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            <span v-if="userStore.token">
              <el-icon><Avatar /></el-icon>
              {{ userStore.userInfo?.TEN || 'Tài khoản' }} 
              <el-icon><ArrowDownBold /></el-icon>
            </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <template v-if="userStore.token">
                  <li><a class="dropdown-item" href="#" @click="handleLogout">Đăng xuất</a></li>
                  <li>
                    <router-link :to="{name: 'lichsumuonsach'}" class="dropdown-item">Lịch sử mượn sách</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'trangcanhan', params: { id: userStore.userInfo?._id}}" class="dropdown-item">Tài khoản</router-link>
                  </li>
              </template>
              
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </header>
</template>

<script setup>
import { useBookStore } from '@/stores/sach.store';
import { useUserStore } from '@/stores/nguoidung.store';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const sachStore = useBookStore();
const route = useRoute()

const handleLogout = () => {
  if(userStore.token){
    userStore.UserLogout();
    sachStore.searchText = ''; 
    router.push({ name: 'trangchu' });// Reset search text on logout
    ElMessage({
      message: 'Đăng xuất thành công!',
      type: 'success',
    });
  } else {
    ElMessage.error('Bạn chưa đăng nhập!');
  }
} 
</script>
<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.navbar-brand span {
  font-size: 1.3rem;
  color: white !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.form-control {
  border: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.9);
}

.form-control:focus {
  box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.25);
  background: rgba(255,255,255,1);
}

.logo-header {
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.logo-header:hover {
  transform: rotate(360deg) scale(1.1);
}

/* Style cho nút Trang Chủ */
.nav-link-border {
  position: relative;
  padding: 10px 20px !important;
  margin: 0 8px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.nav-link-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.6s ease;
}

.nav-link-border:hover {
  color: #2c3e50 !important;
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-shadow: none;
}

.nav-link-border:hover::before {
  left: 100%;
}

.nav-link-border:active {
  transform: translateY(-1px) scale(1.02);
}

/* Style cho Dropdown Menu */
.dropdown-toggle {
  position: relative;
  padding: 10px 20px !important;
  margin: 0 8px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.dropdown-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.6s ease;
}

.dropdown-toggle:hover {
  color: #2c3e50 !important;
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-shadow: none;
}

.dropdown-toggle:hover::before {
  left: 100%;
}

.dropdown-toggle:active {
  transform: translateY(-1px) scale(1.02);
}
/* xóa nút mũi tên ở dropdowns*/ 
.dropdown-toggle::after {
  display: none;
}
/* Style cho Dropdown Menu Items */
.dropdown-menu {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 0;
  margin-top: 10px;
}

.dropdown-item {
  padding: 10px 20px;
  margin: 2px 10px;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  transition: left 0.3s ease;
  z-index: -1;
}

.dropdown-item:hover {
  color: white;
  background: transparent;
  transform: translateX(5px);
}

.dropdown-item:hover::before {
  left: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav-link-border,
  .dropdown-toggle {
    margin: 5px 0;
    padding: 8px 16px !important;
  }
  
  .navbar form {
    justify-content: center;
    margin: 10px 0;
  }
  
  .form-control {
    border-radius: 20px;
  }
}

/* Animation cho navbar khi load */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.navbar {
  animation: slideDown 0.5s ease-out;
}

/* Thêm hiệu ứng ripple khi click */
.nav-link-border,
.dropdown-toggle {
  position: relative;
}

.nav-link-border::after,
.dropdown-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transition: width 0.6s, height 0.6s;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.nav-link-border:active::after,
.dropdown-toggle:active::after {
  width: 200px;
  height: 200px;
}

/* Gradient text effect cho brand */
.navbar-brand span {
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>