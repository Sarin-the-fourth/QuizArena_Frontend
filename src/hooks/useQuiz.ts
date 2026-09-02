import { getMyQuiz, getQuiz, getQuizCategory } from "@/services/quiz.service";
import { useQuery } from "@tanstack/react-query";

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
