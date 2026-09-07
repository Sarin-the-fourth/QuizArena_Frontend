import { axiosInstance } from "@/api/axios";
import type {
  loginDTO,
  loginResponse,
  signupDTO,
  signupResponse,
} from "@/types/auth.type";
import type { AxiosResponse } from "axios";

export const signUp = (
  data: signupDTO
): Promise<AxiosResponse<signupResponse>> => {
  return axiosInstance.post("/auth/signup", data);
};

export const login = (
  data: loginDTO
): Promise<AxiosResponse<loginResponse>> => {
  return axiosInstance.post("/auth/login", data);
};

export const logout = () => {
  return axiosInstance.post("/auth/logout");
};
