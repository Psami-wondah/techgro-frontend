import axios from "axios";
import AxiosInstance, { AuthAxiosInstance } from "./ApiHandler";

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
    verifyToken: async (data: object) =>
      AxiosInstance.post("/auth/verify-token", data),
  },
  farm: {
    addFarm: async (data: object) => AuthAxiosInstance.post("/farm/add", data),
    getFarms: async () => AuthAxiosInstance.get("/farm/all"),
    getFarmData: async (farm_short_id: string) =>
      AuthAxiosInstance.post("/farm/farm-data/" + farm_short_id),
  },
};
