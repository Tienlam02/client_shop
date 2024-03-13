import axios from "axios";
let instance;
if (import.meta.env.MODE === "development") {
  instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_DEV,
  });
} else {
  instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
}

// tu tao ra axios cho app minh dung
// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    // if (import.meta.env.MODE === "development") {
    //   console.log(1);
    // }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response

    return error.response.data;
  }
);

export default instance;
