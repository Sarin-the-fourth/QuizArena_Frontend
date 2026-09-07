import type { QueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "@/components/toast";

export const handlePlayerJoined = (
  data: { userId: string },
  queryClient: QueryClient,
  roomCode: string
) => {
  console.log("🔥 playerJoined RECEIVED");
  showSuccessToast(`${data.userId} player has joined!`);
  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });
};

export const handleGameStarted = (
  queryClient: QueryClient,
  roomCode: string
) => {
  console.log("🚀 gameStarted RECEIVED");

  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });

  showSuccessToast("The game has started!");
};

export const handlePlayerLeave = (
  queryClient: QueryClient,
  roomCode: string
) => {
  console.log("👋 playerLeft RECEIVED");

  showSuccessToast("A player has left the game");

  queryClient.invalidateQueries({
    queryKey: ["one-game", roomCode],
  });
};
