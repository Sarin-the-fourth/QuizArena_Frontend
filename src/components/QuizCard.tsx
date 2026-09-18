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
import {
  EllipsisVertical,
  Pencil,
  Sparkle,
  Star,
  Target,
  Trash2,
  Trophy,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
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
import { type CreateGameForm } from "@/schema/game.schema";
import { useCreateGame } from "@/hooks/useGame";
import gsap from "gsap";
import UpdateQuizDialog from "./UpdateQuizDialog";

interface QuizCardProps {
  quiz: Quiz;
  loading: boolean;
  isMyQuiz?: boolean;
}

const decorations = [
  {
    symbol: "?",
    top: "15%",
    right: "36%",
    color: "#E0A83F",
    rotate: "-8deg",
    size: "text-xl",
  },
  {
    symbol: "!",
    top: "32%",
    right: "52%",
    color: "#C0392B",
    rotate: "6deg",
    size: "text-lg",
  },
  {
    Icon: Sparkle,
    top: "48%",
    right: "28%",
    color: "#3A6B4A",
    rotate: "0deg",
    size: 16,
  },
  {
    symbol: "x",
    top: "62%",
    right: "44%",
    color: "#1B1F3B",
    rotate: "-4deg",
    size: "text-base",
  },
  {
    Icon: Star,
    top: "20%",
    right: "16%",
    color: "#E0A83F",
    rotate: "10deg",
    size: 14,
  },
  {
    Icon: Zap,
    top: "58%",
    right: "12%",
    color: "#C0392B",
    rotate: "-10deg",
    size: 16,
  },
  {
    Icon: Target,
    top: "40%",
    right: "60%",
    color: "#3A6B4A",
    rotate: "5deg",
    size: 14,
  },
  {
    Icon: Trophy,
    top: "10%",
    right: "58%",
    color: "#1B1F3B",
    rotate: "-6deg",
    size: 16,
  },
];

const QuizCard = ({ quiz, loading, isMyQuiz = false }: QuizCardProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const { mutate: deleteQuiz, isPending } = useDeleteQuiz();
  const createGame = useCreateGame();
  const { data, isLoading } = useGetOneUser(quiz.createdBy);
  const user = data?.data?.user;
  const decorRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleCardEnter = () => {
    gsap.to(decorRefs.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "bounce.out",
      stagger: 0.05,
      overwrite: true,
    });
  };

  const handleCardLeave = () => {
    gsap.to(decorRefs.current, {
      opacity: 0,
      y: 8,
      scale: 0.8,
      duration: 0.2,
      ease: "power1.in",
      overwrite: true,
    });
  };

  const form = useForm<CreateGameForm>({
    defaultValues: {
      mode: "SINGLE",
      visibility: "PUBLIC",
    },
  });

  const { setValue, watch } = form;

  const handleDelete = (id: string) => {
    deleteQuiz(id);
  };

  const handleSubmit = (id: string) => {
    createGame.mutate({
      quizId: id,
      gameMode: watch("mode"),
      gameVisibility: watch("visibility"),
    });
  };

  return (
    <>
      {isLoading || loading ? (
        <Card className=" flex text-start w-full max-w-sm hover:shadow-lg duration-300 transition-shadow font-Outfit">
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
        <Card
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
          className="relative group flex text-start w-full max-w-sm hover:shadow-lg hover:-translate-y-1 duration-300 transition-all font-Outfit"
        >
          {/* accent bar */}
          <div className="absolute left-0 top-0 h-0 w-1.5 bg-primary rounded-r-full transition-all duration-300 group-hover:h-full" />

          {decorations.map((d, i) => (
            <span
              ref={(el) => {
                decorRefs.current[i] = el;
              }}
              key={i}
              className={`font-ComicRelief absolute font-bold pointer-events-none ${
                d.size ?? ""
              }`}
              style={{
                top: d.top,
                right: d.right,
                color: `${d.color}50`,
                transform: `rotate(${d.rotate})`,
                opacity: 0,
              }}
            >
              {d.Icon ? <d.Icon size={d.size} /> : d.symbol}
            </span>
          ))}

          <CardHeader>
            <CardTitle className="font-Outfit text-lg">{quiz.title}</CardTitle>

            {quiz.createdBy && (
              <CardDescription>Created By: {user?.name}</CardDescription>
            )}

            {isMyQuiz && (
              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        className="rounded-full!"
                        size="xs"
                      >
                        <EllipsisVertical />
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenUpdateDialog(true);
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
                disabled={!localStorage.getItem("accessToken")}
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

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold">Mode:</span>
                <Select
                  value={watch("mode") ?? ""}
                  onValueChange={(value) => {
                    setValue("mode", value as CreateGameForm["mode"], {
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

              <div className="flex flex-row items-center gap-2">
                <span className="font-bold">Visibility:</span>
                <Select
                  value={watch("visibility") ?? ""}
                  onValueChange={(value) => {
                    setValue(
                      "visibility",
                      value as CreateGameForm["visibility"],
                      {
                        shouldDirty: true,
                        shouldValidate: true,
                      }
                    );
                  }}
                >
                  <SelectTrigger size="sm">
                    <SelectValue
                      placeholder="Select Mode"
                      className="font-Outfit"
                    />
                  </SelectTrigger>
                  <SelectContent className="font-Outfit">
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="font-Outfit"
              onClick={() => {
                handleSubmit(quiz._id);
              }}
              disabled={createGame.isPending}
            >
              {createGame.isPending && <Spinner data-icon="inline-start" />}
              {createGame.isPending ? "Creating..." : "Create & Play"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateQuizDialog
        quizId={quiz?._id}
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
      />
    </>
  );
};

export default QuizCard;
