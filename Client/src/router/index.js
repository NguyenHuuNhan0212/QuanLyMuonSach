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
    path: "/user/book/:MaSach",
    name: "chitietsach",
    component: () => import("../views/ChiTietSach.vue"),
    props: true,
  },
  {
    path: "/user/dang-ky",
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
    path: "/user/trang-ca-nhan/:id",
    name: "trangcanhan",
    component: () => import("../components/client/TrangCaNhan.vue"),
    props: true,
  },
  {
    path: "/user/update/trang-ca-nhan/:id",
    name: "capnhatthongtindocgia",
    component: () => import("../components/client/CapNhatThongTin.vue"),
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
      {
          path: "/quan-ly-nha-xuat-ban",
          name: "quanlynxb",
          component: () => import("../components/Admin/QuanLyNXB.vue"),
      },
      {
          path: "/quan-ly-nha-xuat-ban/them-nha-xuat-ban",
          name: "themnxb",
          component: () => import("../components/Admin/ThemNXB.vue"),
      },
      {
          path: "/quan-ly-nha-xuat-ban/cap-nhat-nha-xuat-ban/:MANXB",
          name: "capnhatnxb",
          component: () => import("../components/Admin/CapNhatNXB.vue"),
          props: true
      },
      {
          path: "/quan-ly-sach",
          name: "quanlysach",
          component: () => import("../components/Admin/QuanLySach.vue"),
      },
      {
          path: "/quan-ly-sach/them-sach",
          name: "themsach",
          component: () => import("../components/Admin/ThemSach.vue"),
      },
      {
          path: "/quan-ly-sach/cap-nhat-sach/:MASACH",
          name: "capnhatsach",
          component: () => import("../components/Admin/CapNhatSach.vue"),
          props:true
      },
      
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router