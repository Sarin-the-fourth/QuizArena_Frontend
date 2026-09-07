import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useGetMe } from "@/hooks/useUser";
import { useGetOneGame } from "@/hooks/useGame";
import { Play } from "lucide-react";
import { useParams } from "react-router-dom";

const WaitingPage = () => {
  const { roomCode } = useParams();

  const { data: gameData } = useGetOneGame(roomCode);
  const { data: meData } = useGetMe();

  const game = gameData?.data.game;
  const me = meData?.data.user;

  const isHost = me?._id === game?.hostId?._id;

  return (
    <div className="flex justify-center h-full w-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            {isHost ? (
              <div className="justify-center flex bg-primary/30 p-3 rounded-full">
                <Play className="text-primary" />
              </div>
            ) : (
              <Spinner className="w-5 h-5" />
            )}
          </EmptyMedia>

          <EmptyTitle className="font-Outfit!">
            {isHost
              ? "Everyone's ready! Start the game to begin the quiz."
              : "Waiting for the Host"}
          </EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default WaitingPage;
