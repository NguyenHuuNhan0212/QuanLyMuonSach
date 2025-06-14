# 📚 Quản Lý Mượn Sách - Library Management System

Hệ thống quản lý mượn sách giúp quản lý sách, người dùng, phiếu mượn/trả, thống kê và bảo mật bằng xác thực người dùng qua email (OTP). Giao diện dễ sử dụng và tích hợp bảng dữ liệu trực quan.

---

## 🚀 Demo

- 🌐 **Frontend** (Vercel): [https://quan-ly-muon-sach.vercel.app](https://quan-ly-muon-sach.vercel.app)
- 🔧 **Backend** (Render): [https://quanlymuonsach.onrender.com](https://quanlymuonsach.onrender.com)

---

## 🛠️ Công nghệ sử dụng

### 💻 Frontend
- Vue.js 3 + Composition API
- Vue Router
- Pinia
- Element Plus, Bootstrap, Font Awesome

### 🌐 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (Email OTP)
- Bcrypt (Mã hóa mật khẩu)
- CORS

### ▶️ Cài đặt & chạy local
🖥 Backend
- cd Server
- npm install
- npm start

🌐 Frontend
- cd Client
- npm install
- npm run dev
---
### 🔐 Phân quyền người dùng
- Admin: Toàn quyền quản lý sách, phiếu mượn, tài khoản cá nhân, nhà xuất bản
- User: Chỉ được xem, mượn sách, và thay đổi thông tin cá nhân
## 📁 Cấu trúc thư mục
```bash
├── Client/              # Frontend Vue 3
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   └── stores/
│   └── vite.config.js

├── Server/              # Backend Express.js
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── server.js

