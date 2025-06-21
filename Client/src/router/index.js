import { compile } from "vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "trangchu",
    component: () => import("../views/TrangChu.vue"),
    children: [
      {
        path: "/sach-moi-nhat",
        name: 'sachmoinhat',
        component: () => import('../components/client/SachMoiNhat.vue')
      },
      {
        path: "/sach-muon-nhieu-nhat",
        name: 'sachhot',
        component: () => import('../components/client/SachHot.vue')
      }
    ]
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
  
    path: "/user/trang-ca-nhan/doi-mat-khau/:id",
    name: "doimatkhau",
    component: () => import("../components/client/ChangePassword.vue"),
    props: true,
  },
  {
    path: "/admin-dang-nhap",
    name: "admindangnhap",
    component: () => import("../components/Admin/MauDangNhapAdmin.vue")
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
          name: "quanlynxb-themnxb",
          component: () => import("../components/Admin/ThemNXB.vue"),
      },
      {
          path: "/quan-ly-nha-xuat-ban/cap-nhat-nha-xuat-ban/:MANXB",
          name: "quanlynxb-capnhatnxb",
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
          name: "quanlysach-themsach",
          component: () => import("../components/Admin/ThemSach.vue"),
      },
      {
          path: "/quan-ly-sach/cap-nhat-sach/:MASACH",
          name: "quanlysach-capnhatsach",
          component: () => import("../components/Admin/CapNhatSach.vue"),
          props:true
      },
       {
          path: "/trang-ca-nhan",
          name: "trangcanhanadmin",
          component: () => import("../components/Admin/ThongTinCaNhan.vue"),
      },
      {
          path: "/trang-ca-nhan/cap-nhat/:MSNV",
          name: "trangcanhanadmin-updateProfileAdmin",
          component: () => import("../components/Admin/CapNhatProfile.vue"),
      },
      {
          path: "/trang-ca-nhan/cap-nhat-password/:id",
          name: "trangcanhanadmin-changepassword",
          component: () => import("../components/Admin/ChangePasswordAdmin.vue"),
      },
      {
          path: "/quan-ly-doc-gia",
          name: "quanlydocgia",
          component: () => import("../components/Admin/QuanLyDocGia.vue"),
      },
      
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router