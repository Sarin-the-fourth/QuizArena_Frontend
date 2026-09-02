import { getGame } from "@/services/game.service";
import { useQuery } from "@tanstack/react-query";

export const useGetGame = () => {
  return useQuery({
    queryKey: ["game"],
    queryFn: getGame,
  });
};
