import Api from "hsc-fetch";
import axios, { AxiosError } from "axios";

// hsc-fetch instance
const api = new Api({
  baseUrl: "https://jsonplaceholder.typicode.com",
});

// axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    throw error;
  }
);

export default api;
export { axiosInstance };
