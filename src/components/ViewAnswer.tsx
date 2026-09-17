import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { Question } from "@/types/question.type";

interface ViewAnswerProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: Question[];
}

const ViewAnswer = ({ open, onOpenChange, questions }: ViewAnswerProp) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Reset to first question whenever dialog opens
  useEffect(() => {
    if (open) {
      setCurrentQuestion(0);
    }
  }, [open]);

  if (!questions.length) {
    return null;
  }

  const question = questions[currentQuestion];

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl font-Outfit">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">
                Question {currentQuestion + 1}
              </DialogTitle>

              <DialogDescription>Review the correct answer</DialogDescription>
            </div>

            <div className="px-3 mr-5 py-1 text-sm font-medium">
              {currentQuestion + 1} / {questions.length}
            </div>
          </div>
        </DialogHeader>

        {/* Question */}
        <div className="mt-4 rounded-xl border bg-muted/30 p-5">
          <p className="text-lg font-semibold leading-relaxed">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="mt-4">
          <RadioGroup value={question.correctAnswer} disabled className="gap-3">
            {question.options.map((option) => {
              const isCorrect = option.id === question.correctAnswer;

              return (
                <div
                  key={option.id}
                  className={`flex items-center gap-3 p-4 transition-colors`}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`question-${currentQuestion}-${option.id}`}
                  />

                  <Label
                    htmlFor={`question-${currentQuestion}-${option.id}`}
                    className="flex-1 cursor-default text-base"
                  >
                    {option.option}
                  </Label>

                  {isCorrect && (
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <Check className="size-4" />
                      Correct Answer
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Navigation */}
        <DialogFooter className="mt-4 flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            <ChevronLeft />
            Previous
          </Button>

          <Button type="button" onClick={handleNext} disabled={isLastQuestion}>
            Next
            <ChevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAnswer;
