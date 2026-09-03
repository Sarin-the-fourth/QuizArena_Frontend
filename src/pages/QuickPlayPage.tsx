import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetGame } from "@/hooks/useGame";
import { CornerDownLeft, LayersPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickPlayPage = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const { data } = useGetGame();
  const navigate = useNavigate();

  const games = data?.data?.games ?? [];

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="750"
      className="flex flex-col gap-10"
    >
      <div className="flex flex-row justify-between items-center px-5">
        <Heading
          heading="Jump In & Play"
          description="Jump into a game, join a hosted match, or enter a room code and
            start playing."
        />

        <div className="w-70 flex flex-row items-center gap-5">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="default" onClick={() => navigate("/quiz")}>
                  <LayersPlus />
                </Button>
              }
            />
            <TooltipContent className="font-Outfit! text-xs">
              Create a new game
            </TooltipContent>
          </Tooltip>

          <InputGroup>
            <InputGroupInput
              placeholder="Room Code..."
              className="font-Outfit"
              value={roomCode}
              onChange={(e) =>
                setRoomCode(e.target.value.toUpperCase().slice(0, 6))
              }
            />
            <InputGroupAddon align="inline-end">
              <Button variant="ghost">
                <CornerDownLeft />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="w-full flex justify-center font-Outfit">
        <div className="w-full max-w-4xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">S.N</TableHead>
                <TableHead className="w-100 truncate">Name</TableHead>
                <TableHead className="truncate">Category</TableHead>
                <TableHead className="w-70 text-center">Host</TableHead>
                <TableHead>Players</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* map */}
              {games.map((game, index) => (
                <TableRow className="text-base">
                  <TableCell className="text-start">{index + 1}</TableCell>
                  <TableCell className="text-start font-semibold">
                    {game.quizId?.title}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {game.quizId?.category}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {game.hostId?.name}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {game.players.length}/4
                  </TableCell>
                  <TableCell>
                    <Button>Join Game</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default QuickPlayPage;
