import { showErrorToast, showSuccessToast } from "@/components/Toast";
import {
  createGame,
  getGame,
  getOneGame,
  joinGame,
  leaveGame,
  startGame,
} from "@/services/game.service";
import { useGameSessionStore } from "@/stores/useGameStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useGetGame = () => {
  return useQuery({
    queryKey: ["game"],
    queryFn: getGame,
  });
};

export const useGetOneGame = (roomCode?: string) => {
  return useQuery({
    queryKey: ["one-game", roomCode],
    queryFn: () => getOneGame(roomCode!),
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveGame,
    onSuccess: (res) => {
      showSuccessToast(res.data.message);
      useGameSessionStore.getState().clearRoomCode();
      queryClient.invalidateQueries({ queryKey: ["game"] });
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

export const useStartGame = () => {
  return useMutation({
    mutationFn: startGame,
    onError: (error) => showErrorToast(error),
  });
};
