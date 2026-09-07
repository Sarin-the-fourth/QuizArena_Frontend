import { toast } from "@/components/ui/toast";
import axios from "axios";

export const showSuccessToast = (message: string) => {
  toast.add({
    type: "success",
    description: message,
  });
};

export const showErrorToast = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.add({
      type: "error",
      description: error.response?.data?.message ?? "Something went wrong!",
    });
  } else {
    toast.add({
      type: "error",
      description: "Something went wrong!",
    });
  }
};
