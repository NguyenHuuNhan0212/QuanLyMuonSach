<template>
  <footer class="footer text-white pt-5 pb-4 mt-5">
    <div class="container">
      <div class="row">

      
        <div class="col-md-3 mb-4">
          <img src="../assets/logo.jpg" alt="Logo thư viện" class="mb-3" width="200" height="200">
        </div>

       
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold mb-3 border-bottom pb-2">Giới thiệu</h5>
          <ul class="list-unstyled">
            <li>Thư viện trực tuyến giúp kết nối sinh viên và giảng viên với hàng ngàn tài liệu, 
                sách điện tử và các nguồn học thuật chất lượng, hỗ trợ hiệu quả trong học tập và 
                nghiên cứu chuyên sâu.</li>
          </ul>
        </div>

     
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold mb-3 border-bottom pb-2">Giờ làm việc</h5>
          <ul class="list-unstyled">
            <li>Thứ hai: 09:00 - 17:00</li>
            <li>Thứ ba: 09:00 - 17:00</li>
            <li>Thứ tư: 09:00 - 17:00</li>
            <li>thứ năm: 09:00 - 17:00</li>
            <li>Thứ sáu: 09:00 - 17:00</li>
            <li>Thứ bảy: 09:00 - 11:00</li>
            <li>Chủ nhật: Nghỉ</li>
          </ul>
        </div>

       
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold mb-3 border-bottom pb-2">Liên hệ</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <el-icon><House /></el-icon>
              <strong class="ms-2">Địa chỉ:</strong>
              <div class="ms-4">715/25, Đường 3/2, Phường An Bình, Quận Ninh Kiều, TP.Cần Thơ</div>
            </li>
            <li class="mb-2">
              <el-icon><Iphone /></el-icon>
              <strong class="ms-2">Điện thoại:</strong> 0349414282
            </li>
            <li class="mb-2">
              <el-icon><Message /></el-icon>
              <strong class="ms-2">Email:</strong> nhanb2203517@student.ctu.edu.vn
            </li>
          </ul>
          <!-- Social icons -->
          <div class="mt-3">
            <span class="me-3 fw-bold">Social:</span>
            <a href="#" class="text-white me-2"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-white me-2"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-white me-2"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-white me-2"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="text-center border-top pt-3 mt-3">
        <span class="text-white-50">© 2025 LIBRARYBOOK. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #1f1f1f;
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
}

.footer h5 {
  color: #ffffff;
}

.footer a:hover {
  color: #ffc107;
}

.footer i {
  font-size: 16px;
}
</style>
