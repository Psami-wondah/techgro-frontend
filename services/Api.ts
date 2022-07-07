import axios from "axios";
import AxiosInstance from "./ApiHandler";

export const Api = {
  auth: {
    signInEmail: async (data: object) =>
      AxiosInstance.post("/auth/login", data),
    signUpEmail: async (data: object) =>
      AxiosInstance.post("/auth/register", data),
    confirmEmail: async (uid: string, token: string) =>
      AxiosInstance.post(`/auth/verify-email/${token}`),
    googleAuth: async (data: object) =>
      AxiosInstance.post("/auth/google", data),
  },
};
