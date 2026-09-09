import { showErrorToast, showSuccessToast } from "@/components/toast";
import {
  createQuiz,
  deleteQuiz,
  getMyQuiz,
  getOneQuiz,
  getQuiz,
  getQuizCategory,
  submitQuiz,
} from "@/services/quiz.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getQuizCategory,
  });
};

export const useGetQuiz = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: getQuiz,
  });
};

export const useGetOneQuiz = (id: string) => {
  return useQuery({
    queryKey: ["one-quiz"],
    queryFn: () => getOneQuiz(id),
    enabled: !!id,
  });
};

export const useGetMyQuiz = () => {
  return useQuery({
    queryKey: ["my-quiz"],
    queryFn: getMyQuiz,
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuiz,
    mutationKey: ["create-quiz"],
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["my-quiz"] });
      showSuccessToast(res.data.message);
    },
    onError: (error) => showErrorToast(error),
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuiz(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["my-quiz"] });

      showSuccessToast(res.data.message);
    },
    onError: (error) => showErrorToast(error),
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: submitQuiz,
    onSuccess: (res) => {
      showSuccessToast(res.data.message);
    },
    onError: (error) => showErrorToast(error),
  });
};
