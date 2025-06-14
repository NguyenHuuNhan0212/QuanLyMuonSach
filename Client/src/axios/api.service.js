// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // ✅ lấy từ biến môi trường
  headers: {
    'Content-Type': 'application/json',
  },
});
