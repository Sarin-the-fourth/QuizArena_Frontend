import { axiosInstance } from "@/api/axios";
import type { GetMeResponse, GetOneUserResponse } from "@/types/user.type";
import type { AxiosResponse } from "axios";

export const getOneUser = (
  id: string
): Promise<AxiosResponse<GetOneUserResponse>> => {
  return axiosInstance.get(`/user/${id}`);
};

export const getMe = (): Promise<AxiosResponse<GetMeResponse>> => {
  return axiosInstance.get(`/user/me`);
};
