import { axiosInstance } from "@/api/axios";
import type {
  CreateQuizDTO,
  CreateQuizResponse,
  DeleteQuizResponse,
  GetCategoryResponse,
  GetMyQuizResponse,
  GetOneQuizResponse,
  GetQuizResponse,
  SubmitQuizDTO,
  SubmitQuizResponse,
} from "@/types/quiz.type";
import type { AxiosResponse } from "axios";

export const getQuiz = (): Promise<AxiosResponse<GetQuizResponse>> => {
  return axiosInstance.get(`/quiz`);
};

export const getOneQuiz = (
  id: string
): Promise<AxiosResponse<GetOneQuizResponse>> => {
  return axiosInstance.get(`/quiz/${id}`);
};

export const getQuizCategory = (): Promise<
  AxiosResponse<GetCategoryResponse>
> => {
  return axiosInstance.get(`/quiz/category`);
};

export const getMyQuiz = (): Promise<AxiosResponse<GetMyQuizResponse>> => {
  return axiosInstance.get(`/quiz/my`);
};

export const createQuiz = (
  data: CreateQuizDTO
): Promise<AxiosResponse<CreateQuizResponse>> => {
  return axiosInstance.post(`/quiz/create`, data);
};

export const deleteQuiz = (
  id: string
): Promise<AxiosResponse<DeleteQuizResponse>> => {
  return axiosInstance.delete(`/quiz/${id}`);
};

export const submitQuiz = ({
  roomCode,
  data,
}: {
  roomCode: string;
  data: SubmitQuizDTO;
}) => {
  return axiosInstance.post<SubmitQuizResponse>(
    `/quiz/${roomCode}/submit`,
    data
  );
};
