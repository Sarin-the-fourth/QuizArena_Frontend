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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface QuizCardProps {
  quiz: Quiz;
  loading: boolean;
  isMyQuiz?: boolean;
}

const QuizCard = ({ quiz, loading, isMyQuiz = false }: QuizCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data, isLoading } = useGetOneUser(quiz.createdBy);
  const user = data?.data?.user;

  return (
    <>
      {isLoading || loading ? (
        <Card className="flex text-start w-full max-w-sm hover:shadow-lg duration-300 transition-shadow font-Outfit">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-[250px]" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-6 w-[200px]" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CardDescription className="flex flex-wrap!">
              <Skeleton className="h-6 w-[500px]" />
            </CardDescription>
          </CardContent>

          <CardFooter>
            <CardDescription>
              <Skeleton className="h-6 w-[150px]" />
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
                      }}
                    >
                      <Pencil />
                      Edit Quiz
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        // Open delete confirmation
                        console.log("Delete quiz:", quiz._id);
                      }}
                    >
                      <Trash2 />
                      Delete Quiz
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

            <DialogDescription>
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
          </div>

          <DialogFooter>
            <Button className="font-Outfit">Create & Play</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizCard;
