import { useGetOneGame } from "@/hooks/useGame";
import { useNavigate, useParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { FieldDescription, FieldSet } from "../ui/field";
import { useGetOneQuiz, useSubmitQuiz } from "@/hooks/useQuiz";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import type { Answer } from "@/types/quiz.type";

const InProgressPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [disable, setDisable] = useState<boolean>(false);
  const navigate = useNavigate();
  const submitMutation = useSubmitQuiz();
  const { roomCode } = useParams();
  const { data } = useGetOneGame(roomCode);
  const game = data?.data?.game;
  const { data: quiz, isLoading } = useGetOneQuiz(game?.quizId._id);
  const questions = quiz?.data.quiz.questions;
  const question = questions?.[currentQuestion];
  const [timeLeft, setTimeLeft] = useState<number>(question?.timeLimit ?? 0);
  const isLastQuestion = currentQuestion === (questions?.length ?? 0) - 1;

  useEffect(() => {
    if (!question) return;
    let remaining = question.timeLimit;
    setTimeLeft(remaining);
    const timer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = 0;
        setTimeLeft(0);
        clearInterval(timer);
        if (!isLastQuestion) {
          setCurrentQuestion((current) => current + 1);
        } else {
          setDisable(true);
        }
        return;
      }
      setTimeLeft(remaining);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [currentQuestion, question?.timeLimit, isLastQuestion]);

  const getCurrentAnswer = (): Answer | null => {
    if (!selectedItem || !question) {
      return null;
    }
    return {
      questionId: question._id,
      answer: selectedItem,
    };
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full rounded-xl">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-10 overflow-y-auto">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col text-start">
              <h2 className="text-black!">{game?.quizId.title}</h2>
              <span className="text-muted-foreground text-sm!">
                Category: {game?.quizId.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-start">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold w-[80%]">
                Question {currentQuestion + 1}: {question?.question}?
              </span>
              <span
                className={`text-muted-foreground text-sm ${
                  timeLeft <= 5 && `text-red-500! font-semibold!`
                }`}
              >
                Time: {timeLeft} sec
              </span>
            </div>
            <FieldSet>
              <RadioGroup
                disabled={disable}
                value={selectedItem}
                onValueChange={setSelectedItem}
                className="flex! flex-col! gap-5"
              >
                {question?.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-3">
                    <RadioGroupItem value={option.id} />
                    <Label className="text-base! font-light!">
                      {option.option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <FieldDescription className="font-semibold mt-2!">
                Choose wisely! Once you move on, there's no going back.
              </FieldDescription>
            </FieldSet>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  const currentAnswer = getCurrentAnswer();
                  if (currentAnswer) {
                    setAnswers((prev) => [...prev, currentAnswer]);
                  }
                  if (isLastQuestion) {
                    const finalAnswers = currentAnswer
                      ? [...answers, currentAnswer]
                      : answers;
                    submitMutation.mutate(
                      {
                        roomCode: roomCode!,
                        data: {
                          answers: finalAnswers,
                        },
                      },
                      {
                        onSuccess: () =>
                          navigate(`/game/${roomCode}/scoreboard`),
                      }
                    );
                    return;
                  }
                  setSelectedItem("");
                  setCurrentQuestion((prev) => prev + 1);
                }}
              >
                {isLastQuestion ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InProgressPage;
