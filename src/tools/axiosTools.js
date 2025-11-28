import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetrackerapi-zlhw.onrender.com/api",
  withCredentials: true, // ส่ง cookie token อัตโนมัติ
});

// Interceptor → handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data?.message || "Something went wrong"
    );
  }
);

export default api;
