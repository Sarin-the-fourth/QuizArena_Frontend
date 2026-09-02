import { axiosInstance } from "@/api/axios";
import type {
  GetCategoryResponse,
  GetMyQuizResponse,
  GetQuizResponse,
} from "@/types/quiz.type";
import type { AxiosResponse } from "axios";

export const getQuiz = (): Promise<AxiosResponse<GetQuizResponse>> => {
  return axiosInstance.get(`/quiz`);
};

export const getQuizCategory = (): Promise<
  AxiosResponse<GetCategoryResponse>
> => {
  return axiosInstance.get(`/quiz/category`);
};

export const getMyQuiz = (): Promise<AxiosResponse<GetMyQuizResponse>> => {
  return axiosInstance.get(`/quiz/my`);
};
