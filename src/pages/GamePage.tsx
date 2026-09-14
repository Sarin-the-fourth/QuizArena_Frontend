import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  handleAllPlayerFinished,
  handleGameStarted,
  handlePlayerJoined,
  handlePlayerLeave,
} from "@/helper/socket.functions";

import { useGetOneGame, useLeaveGame, useStartGame } from "@/hooks/useGame";
import { useGetMe } from "@/hooks/useUser";
import { socket } from "@/lib/socket";
import { useGameSessionStore } from "@/stores/useGameStore";
import { useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const GamePage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const setRoomCode = useGameSessionStore((state) => state.setRoomCode);
  setRoomCode(roomCode);
  const { data, isLoading } = useGetOneGame(roomCode);
  const { data: me } = useGetMe();
  const leaveGame = useLeaveGame();
  const startGame = useStartGame();

  const mydata = me?.data?.user;
  const game = data?.data.game;

  const isHost = mydata?._id === game?.hostId?._id;
  const isWaiting = game?.status === "WAITING";

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomCode) return;

    const joinRoom = () => {
      console.log("Joining room:", {
        socketId: socket.id,
        roomCode,
        connected: socket.connected,
      });
      socket.emit("joinGame", roomCode);
    };

    const onPlayerJoined = (data: { userId: string; name: string }) => {
      handlePlayerJoined(data, queryClient, roomCode);
    };

    const onAllPlayerFinished = () => {
      handleAllPlayerFinished(queryClient, roomCode);
    };

    const onGameStarted = () => {
      handleGameStarted(queryClient, roomCode, navigate);
    };

    const onPlayerLeave = () => {
      handlePlayerLeave(queryClient, roomCode);
    };

    const onConnectError = (error: Error) => {
      console.log("Socket error:", error.message);
    };

    socket.on("connect", joinRoom);
    socket.on("playerJoined", onPlayerJoined);
    socket.on("gameStarted", onGameStarted);
    socket.on("playerLeft", onPlayerLeave);
    socket.on("connect_error", onConnectError);
    socket.on("allPlayersFinished", onAllPlayerFinished);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      socket.off("connect", joinRoom);
      socket.off("playerJoined", onPlayerJoined);
      socket.off("gameStarted", onGameStarted);
      socket.off("playerLeft", onPlayerLeave);
      socket.off("connect_error", onConnectError);
      socket.off("allPlayersFinished", onAllPlayerFinished);
    };
  }, [roomCode, queryClient]);

  return (
    <div
      data-aos="fade-up"
      fade-aos-duration="750"
      className="flex flex-col gap-10"
    >
      <div className="flex flex-row justify-between items-center">
        <Heading
          heading="Ready, Set, Quiz!"
          description="Challenge your knowledge, climb the leaderboard, and prove you're the ultimate quiz master."
        />
        <div className="flex flex-col items-end gap-2 font-Outfit">
          <span className="text-gray-500 text-sm">
            Room Code: <strong>{roomCode}</strong>
          </span>

          <Separator />
          {isWaiting &&
            (isHost ? (
              <Button
                onClick={() => startGame.mutate(roomCode)}
                className="w-fit"
              >
                Start Game
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-yellow-500" />
                <span>Waiting for the host to start the game...</span>
              </div>
            ))}
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-10 font-Outfit">
          <div className="grid grid-cols-[30%_70%] gap-5">
            <div className="w-full rounded-xl shadow-lg p-5 flex flex-col gap-5">
              <Skeleton className="h-6 w-36" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
            </div>

            {/* Game area */}
            <div className="w-full rounded-xl">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[30%_68%] gap-6 font-Outfit">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-xl h-fit flex flex-col gap-2 text-start shadow-lg p-5">
              <div className="flex flex-row items-center justify-between">
                <span className="text-xl font-bold">Active Players</span>
                <span className="text-muted-foreground text-xs">
                  Capacity: {game?.players?.length}/4
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {game?.players?.map((player) => (
                  <li
                    key={player.userId?._id}
                    className="flex items-center gap-2"
                  >
                    <span className="size-2 rounded-full bg-green-500" />
                    <span
                      className={`${
                        player.userId?._id === game.hostId._id &&
                        "font-semibold"
                      }`}
                    >
                      {player.userId?.name}
                    </span>
                    {player.userId?._id === game.hostId._id && (
                      <span className="font-semibold">
                        {"("}Host{")"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                if (!roomCode) return;
                socket.emit("leaveGame", roomCode);
                leaveGame.mutate(roomCode, {
                  onSuccess: () => navigate(`/`),
                });
              }}
            >
              Leave Game
            </Button>
          </div>
          <div className="w-full rounded-xl shadow-lg overflow-y-auto p-5">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
