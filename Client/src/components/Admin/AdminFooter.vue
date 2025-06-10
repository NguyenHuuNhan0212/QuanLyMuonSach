<template>
    <div class="fixed-bottom" style="margin-left: 250px">
        <footer class="admin-footer bg-light text-center py-3 border-top"  >
            <span>© 2025 Quản lý thư viện</span>
            <img
                src="../../assets//moveUp.jpg" 
                alt="Scroll to top"
                class="scroll-top-icon position-absolute"
                @click="scrollToTop"
                />
        </footer>
    </div>
  
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>


.scroll-top-icon {
  width: 32px;
  height: 32px;
  bottom: 10px;
  right: 20px;
  cursor: pointer;
  position: absolute;
  border-radius: 50%; /* Làm ảnh tròn */
  object-fit: cover;   /* Đảm bảo không bị méo hình */
  border: 1px solid #ccc; /* (tuỳ chọn) đường viền nhẹ nếu bạn muốn đẹp hơn */
}

@media (min-width: 768px) {
  .scroll-top-icon {
    position: absolute;
  }
}
</style>
