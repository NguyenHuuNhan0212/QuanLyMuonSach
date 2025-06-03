import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "trangchu",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/dang-nhap",
    name: "dangnhap",
    component: () => import("../views/DangNhap.vue"),
  },
  {
    path: "/book/:MaSach",
    name: "chitietsach",
    component: () => import("../views/ChiTietSach.vue"),
    props: true,
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router