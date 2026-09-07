import { showErrorToast, showSuccessToast } from "@/components/toast";
import {
  createGame,
  getGame,
  getOneGame,
  joinGame,
  leaveGame,
  startGame,
} from "@/services/game.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useGetGame = () => {
  return useQuery({
    queryKey: ["game"],
    queryFn: getGame,
  });
};

export const useGetOneGame = (roomCode: string) => {
  return useQuery({
    queryKey: ["one-game", roomCode],
    queryFn: () => getOneGame(roomCode),
    enabled: !!roomCode,
  });
};

export const useCreateGame = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGame,
    mutationKey: ["create-game"],

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["game"] });
      showSuccessToast(res.data.message);
      navigate(`/game/${res.data.game.roomCode}`);
    },

    onError: (error) => showErrorToast(error),
  });
};

export const useJoinGame = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: joinGame,

    onSuccess: (res) => {
      showSuccessToast(res.data.message);
      navigate(`/game/${res.data.game.roomCode}`);
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

export const useLeaveGame = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: leaveGame,
    onSuccess: (res) => {
      showSuccessToast(res.data.message);
      navigate(`/`);
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

export const useStartGame = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: startGame,
    onSuccess: (res) => {
      navigate(`/game/${res.data.game.roomCode}/play`);
    },
    onError: (error) => showErrorToast(error),
  });
};
