import { CircleStar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useParams } from "react-router-dom";
import { useGetOneGame } from "@/hooks/useGame";

const ScoreBoard = () => {
  const { roomCode } = useParams();
  const { data } = useGetOneGame(roomCode);
  const playersInfo = data?.data.game.players;

  const sortedPlayer = playersInfo.toSorted((a, b) => b.score - a.score);

  return (
    <div data-aos="fade-up" data-aos-duration="750" className="p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-5 items-center">
          <div className="p-3 rounded-full text-[#fbbb26] bg-[#fceec3a2] w-fit flex items-center">
            <CircleStar className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-black! text-[35px]! font-bold!">
              Game Results!
            </h2>
            <span className="text-muted-foreground text-base">
              See how everyone performed and who came out on top!
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Rank</TableHead>
              <TableHead className="w-80 truncate">Player</TableHead>
              <TableHead className="w-20">Score</TableHead>
              <TableHead className="w-20">Time Taken</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayer.map((player, index) => (
              <TableRow
                key={index}
                className={`font-semibold text-base ${
                  index === 0 && "bg-[#f7e7b6f2] hover:bg-[#f7e7b6f2]!"
                }`}
              >
                <TableCell className="text-start">{index + 1}</TableCell>
                <TableCell className="text-start">
                  {player.userId.name}
                </TableCell>
                <TableCell>{player.score}</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScoreBoard;
