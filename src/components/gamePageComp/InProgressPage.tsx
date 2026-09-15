import { useGetOneGame } from "@/hooks/useGame";
import { useNavigate, useParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { FieldDescription, FieldSet } from "../ui/field";
import { useGetOneQuiz, useSubmitQuiz } from "@/hooks/useQuiz";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef, useState } from "react";
import type { Answer } from "@/types/quiz.type";
import gsap from "gsap";

const InProgressPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  const submitMutation = useSubmitQuiz();
  const { roomCode } = useParams<{ roomCode: string }>();
  const { data } = useGetOneGame(roomCode);
  const game = data?.data?.game;
  const { data: quiz, isLoading } = useGetOneQuiz(game?.quizId._id);
  const questions = quiz?.data.quiz.questions;
  const question = questions?.[currentQuestion];
  const [timeLeft, setTimeLeft] = useState<number>(question?.timeLimit ?? 0);
  const isLastQuestion = currentQuestion === (questions?.length ?? 0) - 1;
  const timerRef = useRef<HTMLSpanElement | null>(null);
  const selectedItemRef = useRef("");

  useEffect(() => {
    selectedItemRef.current = selectedItem;
  }, [selectedItem]);

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
        moveToNextQuestion();
        return;
      }
      setTimeLeft(remaining);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [currentQuestion, question?.timeLimit, isLastQuestion]);

  useEffect(() => {
    if (!timerRef.current) return;
    if (timeLeft <= 5) {
      gsap.fromTo(
        timerRef.current,
        {
          scale: 1,
          y: 0,
        },
        {
          scale: 1.1,
          y: -5,
          duration: 0.2,
          ease: "bounce.out",
          yoyo: true,
          repeat: 1,
        }
      );
    } else {
      return;
    }
  }, [timeLeft]);

  const getCurrentAnswer = (): Answer | null => {
    if (!selectedItemRef.current || !question) {
      return null;
    }

    return {
      questionId: question?._id!,
      answer: selectedItemRef.current,
    };
  };

  const moveToNextQuestion = () => {
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
          onSuccess: () => navigate(`/game/${roomCode}/scoreboard`),
        }
      );

      return;
    }

    setSelectedItem("");
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full rounded-xl">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-10 overflow-y-hidden overflow-x-hidden">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col text-start">
              <h2 className="text-black!">{game?.quizId.title}</h2>
              <span className="text-muted-foreground text-sm! ">
                Category: {game?.quizId.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-start">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold w-[80%] whitespace-pre-line">
                Question {currentQuestion + 1}: {question?.question}?
              </div>
              <span
                ref={timerRef}
                className={`text-muted-foreground text-sm mr-5 ${
                  timeLeft <= 5 && `text-red-500! font-semibold! overflow-none`
                }`}
              >
                Time: {timeLeft} sec
              </span>
            </div>
            <FieldSet>
              <RadioGroup
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
                onClick={moveToNextQuestion}
                disabled={submitMutation.isPending}
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
