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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { useState } from "react";
import ViewAnswer from "../ViewAnswer";
import { useGetQuestionsAnswer } from "@/hooks/useQuiz";

const ScoreBoard = () => {
  const { roomCode } = useParams();
  const { data } = useGetOneGame(roomCode);
  const [open, setOpen] = useState<boolean>(false);
  const playersInfo = data?.data.game.players;
  const quizId = data?.data.game.quizId._id;
  const isFinished = data?.data.game.status === "FINISHED";
  const { data: quiz } = useGetQuestionsAnswer(quizId);

  const questions = quiz?.data.quiz.questions;
  console.log(questions);

  const sortedPlayer = playersInfo?.toSorted((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.timeTaken - b.timeTaken;
  });

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

        {!isFinished ? (
          <div className="flex min-h-100 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Spinner className="h-5 w-5" />
                </EmptyMedia>

                <EmptyTitle>Calculating Results...</EmptyTitle>

                <EmptyDescription>
                  Hang tight while the other players finish the quiz.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 text-start">Rank</TableHead>
                  <TableHead className="w-80 truncate">Player</TableHead>
                  <TableHead className="w-20 text-center">Score</TableHead>
                  <TableHead className="w-20 text-center">Time Taken</TableHead>
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
                    <TableCell>
                      {player.score}/{questions?.length ?? 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {player.timeTaken}s
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="ghost"
              className="flex justify-end underline text-sm cursor-pointer"
              onClick={() => setOpen(true)}
            >
              View Answers
            </Button>
            <ViewAnswer
              open={open}
              onOpenChange={setOpen}
              questions={questions ?? []}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard;
