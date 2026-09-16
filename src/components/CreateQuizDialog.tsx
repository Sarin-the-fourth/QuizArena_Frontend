import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

import BasicInfo from "./createQuizForm/BasicInfo";
import Questions from "./createQuizForm/Questions";

import { quizSchema, type QuizFormData } from "@/schema/quiz.schema";
import { useCreateQuiz } from "@/hooks/useQuiz";
import { Spinner } from "./ui/spinner";

type CreateQuizDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const createEmptyQuestion = () => ({
  question: "",
  options: [
    { id: "a", option: "" },
    { id: "b", option: "" },
    { id: "c", option: "" },
    { id: "d", option: "" },
  ],
  correctAnswer: "",
  timeLimit: 15,
});

const CreateQuizDialog = ({ open, onOpenChange }: CreateQuizDialogProps) => {
  const [step, setStep] = useState(1);
  const createQuiz = useCreateQuiz();
  const [, setSearchParams] = useSearchParams();

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),

    shouldUnregister: false,

    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      questions: [createEmptyQuestion()],
    },
  });

  useEffect(() => {
    if (!open) {
      setStep(1);

      setSearchParams({});

      form.reset({
        title: "",
        description: "",
        category: undefined,
        questions: [createEmptyQuestion()],
      });
    }
  }, [open, form, setSearchParams]);

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await form.trigger(["title", "description", "category"]);

      if (!isValid) return;

      setSearchParams({
        question: "1",
      });

      setStep(2);
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
      setSearchParams({});
    }
  };

  const onSubmit = (data: QuizFormData) => {
    createQuiz.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-190">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="font-Outfit">Create Quiz</DialogTitle>

            <DialogDescription className="font-Outfit">
              Create your quiz and challenge your players.
            </DialogDescription>
          </DialogHeader>

          {/* PROGRESS */}

          <div className="mt-5">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground font-Outfit">
                Step {step} of 2
              </span>

              <span className="text-sm text-muted-foreground font-Outfit">
                {step === 1 ? "Basic Information" : "Questions"}
              </span>
            </div>

            <Progress value={step === 1 ? 50 : 100} />
          </div>

          {/* CONTENT */}

          <div className="mt-5">
            {step === 1 ? <BasicInfo form={form} /> : <Questions form={form} />}
          </div>

          {/* FOOTER */}

          <DialogFooter className="mt-5 font-Outfit">
            {step === 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>

                <Button type="submit" disabled={createQuiz.isPending}>
                  {createQuiz.isPending && <Spinner data-icon="inline-start" />}
                  {createQuiz.isPending ? "Creating..." : "Create Quiz"}
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizDialog;
