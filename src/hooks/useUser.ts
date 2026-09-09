import { getMe, getOneUser } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOneUser = (id: string) => {
  return useQuery({
    queryKey: ["oneUser", id],
    queryFn: () => getOneUser(id),
    enabled: !!id,
  });
};

export const useGetMe = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!token,
  });
};
