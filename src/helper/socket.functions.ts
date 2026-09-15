import { QueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "@/components/Toast";
import { type NavigateFunction } from "react-router-dom";

export const handlePlayerJoined = (
  data: { userId: string; name: string },
  queryClient: QueryClient,
  roomCode: string
) => {
  showSuccessToast(`${data.name} player has joined!`);
  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });
};

export const handleGameStarted = (
  queryClient: QueryClient,
  roomCode: string,
  navigate: NavigateFunction
) => {
  // make an error if someone else tries to enter the room which in on progress from the url
  navigate(`/game/${roomCode}/play`);
  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });

  showSuccessToast("The game has started!");
};

export const handlePlayerLeave = (
  queryClient: QueryClient,
  roomCode: string
) => {
  showSuccessToast("A player has left the game");

  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });
};

export const handleAllPlayerFinished = (
  queryClient: QueryClient,
  roomCode: string
) => {
  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });
};
