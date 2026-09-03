import { toast } from "@/components/ui/toast";
import {
  createQuiz,
  deleteQuiz,
  getMyQuiz,
  getQuiz,
  getQuizCategory,
} from "@/services/quiz.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
      toast.add({
        type: "success",
        description: res.data.message,
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.add({
          type: "error",
          description: error.response?.data?.message ?? "Something went wrong!",
        });
      } else {
        toast.add({
          type: "error",
          description: "Something went wrong",
        });
      }
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuiz(id),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["my-quiz"] });
      toast.add({
        type: "success",
        description: res.data.message,
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.add({
          type: "error",
          description: error.response?.data?.message ?? "Something went wrong!",
        });
      } else {
        toast.add({
          type: "error",
          description: "Something went wrong",
        });
      }
    },
  });
};
