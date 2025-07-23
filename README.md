# 📚 Library Management System - Hệ Thống Quản Lý Mượn Sách

Hệ thống Quản lý mượn sách giúp quản lý toàn bộ quy trình: sách, người dùng, phiếu mượn/trả, thống kê, và bảo mật. Hệ thống tích hợp xác thực người dùng qua email OTP, giao diện trực quan, dễ sử dụng cho cả quản trị viên và người dùng thông thường.

---

## 🚀 Tính năng nổi bật

- 📖 Quản lý sách (CRUD, thể loại, NXB...)
- 📄 Quản lý phiếu mượn - trả sách
- 🔐 Bảo mật người dùng với JWT & Bcrypt
- 📊 Giao diện trực quan với bảng dữ liệu, bộ lọc, tìm kiếm
- 📆 Thống kê sách mượn, trả sách.

---

## 🛠️ Công nghệ sử dụng

### 💻 Frontend

- Vue.js 3 + Composition API
- Vue Router, Pinia
- Element Plus, Bootstrap, Font Awesome

### 🌐 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (OTP qua email)
- Bcrypt (mã hóa mật khẩu)
- CORS cấu hình bảo mật

---

## 🔐 Phân quyền người dùng

- **Admin**:
  - Toàn quyền quản lý sách, phiếu mượn, nhà xuất bản, và người dùng
- **User**:
  - Đăng ký, đăng nhập
  - Mượn sách, theo dõi tình trạng mượn
  - Cập nhật thông tin cá nhân

---

## ▶️ Cài đặt & chạy local

### 🖥 Backend

```bash
cd Server
npm install
npm start
```

### 🌐 Frontend

```bash
cd Client
npm install
npm run dev
```

### 📁 Cấu trúc thư mục

├── Client/ # Frontend Vue 3
│ ├── src/
│ │ ├── assets/ # Tài nguyên giao diện (ảnh, logo...)
│ │ ├── components/ # Component tái sử dụng (BookCard, Sidebar,...)
│ │ ├── views/ # Các trang chính (Home, Login, Admin,...)
│ │ ├── router/ # Định tuyến Vue Router
│ │ └── stores/ # Pinia store (auth, sách, mượn trả...)
│ └── vite.config.js # Cấu hình dự án

├── Server/ # Backend Express.js
│ ├── src/
│ │ ├── models/ # Schema Mongoose (User, Book, Borrow,...)
│ │ ├── controllers/ # Xử lý logic API
│ │ ├── routes/ # Định tuyến API
│ │ ├── services/ # Gửi email, xử lý OTP...
│ │ └── utils/ # Helper functions, middleware
│ └── server.js # File khởi động server
