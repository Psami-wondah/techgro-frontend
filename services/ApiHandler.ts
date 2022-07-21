import axios from "axios";
import { API_URL } from "../utils/constants";

const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error.response?.data?.message);
  }
);

export default AxiosInstance;
