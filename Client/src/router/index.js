import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "trangchu",
    component: () => import("../views/TrangChu.vue"),
  },
  {
    path: "/dang-nhap",
    name: "dangnhap",
    component: () => import("../views/DangNhapView.vue"),
  },
  {
    path: "/book/:MaSach",
    name: "chitietsach",
    component: () => import("../views/ChiTietSach.vue"),
    props: true,
  },
  {
    path: "/dang-ky",
    name: "dangky",
    component: () => import("../views/DangKyView.vue"),
  },
  {
    path: "/user/lich-su-muon-sach",
    name: "lichsumuonsach",
    component: () => import("../views/LichSuMuonSachView.vue"),
  },
  {
    path: "/user/lich-su-muon-sach/:id",
    name: "chitietlichsumuonsach",
    component: () => import("../views/ChiTietLichSuMuonSach.vue"),
    props: true,
  },
  {
    path: "/admin/dashboard",
    name: "trangchuadmin",
    component: () => import("../views/AdminDashboard.vue"),
    children: [
      {
          path: "/quan-ly-muon-sach",
          name: "quanlymuonsach",
          component: () => import("../components/Admin/QuanLyMuonSach.vue"),
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router