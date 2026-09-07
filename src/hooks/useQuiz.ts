import { showErrorToast, showSuccessToast } from "@/components/toast";
import {
  createQuiz,
  deleteQuiz,
  getMyQuiz,
  getQuiz,
  getQuizCategory,
} from "@/services/quiz.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
