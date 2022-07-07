import axios from "axios";
import AxiosInstance from "./ApiHandler";

export const Api = {
  auth: {
    signInEmail: async (data: object) =>
      AxiosInstance.post("/auth/login", data),
    signUpEmail: async (data: object) =>
      AxiosInstance.post("/auth/register", data),
    confirmEmail: async (token: string) =>
      AxiosInstance.post(`/auth/verify-email/${token}`),
    googleAuth: async (data: object) =>
      AxiosInstance.post("/auth/google", data),
    resendEmail: async (email: string) =>
      AxiosInstance.post("/auth/resend-verification-email/" + email),
    forgotPassword: async (email: string) =>
      AxiosInstance.post("/auth/forgot-password/" + email),
    resetPassword: async (token: string, data: object) =>
      AxiosInstance.put("/auth/reset-password/" + token, data),
  },
};
