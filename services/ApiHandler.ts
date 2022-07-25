import axios, { AxiosRequestConfig } from "axios";
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
  },
});

AuthAxiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    config.headers = {
      Accept: "application/json",
    };
    config.headers.authorization = `Bearer ${Auth.getToken()}`;
    config.timeout = 120000;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AuthAxiosInstance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error.response?.data?.message);
  }
);
