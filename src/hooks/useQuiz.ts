import { showErrorToast, showSuccessToast } from "@/components/Toast";
import {
  createQuiz,
  deleteQuiz,
  getMyQuiz,
  getOneQuiz,
  getQuestionsAnswer,
  getQuiz,
  getQuizCategory,
  submitQuiz,
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

export const useGetOneQuiz = (id?: string) => {
  return useQuery({
    queryKey: ["one-quiz"],
    queryFn: () => getOneQuiz(id!),
    enabled: !!id,
  });
};

export const useGetQuestionsAnswer = (id?: string) => {
  return useQuery({
    queryKey: ["quiz-answer", id],
    queryFn: () => getQuestionsAnswer(id!),
    enabled: !!id,
  });
};

export const useGetMyQuiz = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["my-quiz"],
    queryFn: getMyQuiz,
    enabled: !!token,
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
