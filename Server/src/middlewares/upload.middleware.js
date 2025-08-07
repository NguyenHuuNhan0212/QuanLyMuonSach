const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Đường dẫn thư mục uploads tuyệt đối
const uploadDir = path.join(__dirname, "../../uploads"); // hoặc '../uploads' tùy theo vị trí file này

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
//cau hinh noi luu tru
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(file.mimetype);
  if (isValid) cb(null, true);
  else cb(new Error("Chỉ cho phép file ảnh."));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
