import type { Quiz } from "@/types/quiz.type";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useGetOneUser } from "@/hooks/useUser";
import { Skeleton } from "./ui/skeleton";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDeleteQuiz } from "@/hooks/useQuiz";
import { Spinner } from "./ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { modeSchema, type GameMode } from "@/schema/game.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGame } from "@/hooks/useGame";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  quiz: Quiz;
  loading: boolean;
  isMyQuiz?: boolean;
}

const QuizCard = ({ quiz, loading, isMyQuiz = false }: QuizCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { mutate: deleteQuiz, isPending } = useDeleteQuiz();
  const createGame = useCreateGame();
  const { data, isLoading } = useGetOneUser(quiz.createdBy);
  const user = data?.data?.user;
  const navigate = useNavigate();

  const form = useForm<GameMode>({
    resolver: zodResolver(modeSchema),
    defaultValues: {
      mode: "SINGLE",
    },
  });

  const { setValue, watch } = form;

  const handleDelete = (id: string) => {
    deleteQuiz(id);
  };

  const handleSubmit = (id: string, gameMode: string) => {
    createGame.mutate({
      quizId: id,
      gameMode: gameMode,
    });
  };

  return (
    <>
      {isLoading || loading ? (
        <Card className="flex text-start w-full max-w-sm hover:shadow-lg duration-300 transition-shadow font-Outfit">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-63" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-6 w-50" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CardDescription className="flex flex-wrap!">
              <Skeleton className="h-6 w-125" />
            </CardDescription>
          </CardContent>

          <CardFooter>
            <CardDescription>
              <Skeleton className="h-6 w-38" />
            </CardDescription>
          </CardFooter>
        </Card>
      ) : (
        <Card className="flex text-start w-full max-w-sm hover:shadow-lg duration-300 transition-shadow font-Outfit">
          <CardHeader>
            <CardTitle className="font-Outfit text-lg">{quiz.title}</CardTitle>

            {quiz.createdBy && (
              <CardDescription>Created By: {user?.name}</CardDescription>
            )}

            {isMyQuiz && (
              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="rounded-full!" size="xs">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        console.log("Edit quiz:", quiz._id);
                        navigate(`/under-construction`);
                      }}
                    >
                      <Pencil />
                      Edit Quiz
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDelete(quiz._id)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Spinner data-icon="inline-start" />
                      ) : (
                        <Trash2 />
                      )}
                      {isPending ? "Deleting..." : "Delete Quiz"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            )}
          </CardHeader>

          <CardContent>
            <CardDescription>{quiz.description}</CardDescription>
          </CardContent>

          <CardFooter className="flex! flex-row! justify-between!">
            <CardDescription>
              Category: <strong className="text-black">{quiz.category}</strong>
            </CardDescription>

            <CardAction className="flex! flex-row! justify-end!">
              <Button
                className="bg-black! text-white! hover:bg-primary! hover:text-black!"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Play Now
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Game</DialogTitle>

            <DialogDescription className="font-Outfit">
              Set up a game room and get ready to compete
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 font-Outfit">
            <div className="flex flex-row items-center gap-2">
              <span className="font-bold">Quiz Name:</span>
              <span>{quiz.title}</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="font-bold">Category:</span>
              <span>{quiz.category}</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="font-bold">Created By:</span>
              <span>{user?.name}</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="font-bold">Mode:</span>
              <Select
                value={watch("mode") ?? ""}
                onValueChange={(value) => {
                  setValue("mode", value as GameMode["mode"], {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger size="sm">
                  <SelectValue
                    placeholder="Select Mode"
                    className="font-Outfit"
                  />
                </SelectTrigger>
                <SelectContent className="font-Outfit">
                  <SelectItem value="SINGLE">Single Player</SelectItem>
                  <SelectItem value="MULTIPLAYER">Multiplayer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="font-Outfit"
              onClick={() => {
                handleSubmit(quiz._id, watch("mode"));
              }}
              disabled={createGame.isPending}
            >
              {createGame.isPending && <Spinner data-icon="inline-start" />}
              {createGame.isPending ? "Creating..." : "Create & Play"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizCard;
