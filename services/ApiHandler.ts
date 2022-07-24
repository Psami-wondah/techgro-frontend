import axios from "axios";
import { API_URL } from "../utils/constants";
import { Auth } from "./storage";

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

export const AuthAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Auth.getToken()}`,
  },
});

AuthAxiosInstance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error.response?.data?.message);
  }
);
