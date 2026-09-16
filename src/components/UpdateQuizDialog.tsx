import { useEffect, useState } from "react";
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
import { Spinner } from "./ui/spinner";

import UpdateBasicInfo from "./updateQuizForm/UpdateBasicInfo";
import UpdateQuestions from "./updateQuizForm/UpdateQuestions";

import { quizSchema, type QuizFormData } from "@/schema/quiz.schema";

import { useGetOneQuiz, useUpdateQuiz } from "@/hooks/useQuiz";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import EmptyData from "./EmptyData";

interface UpdateQuizDialogProps {
  quizId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateQuizDialog = ({
  quizId,
  open,
  onOpenChange,
}: UpdateQuizDialogProps) => {
  const [step, setStep] = useState(1);

  const { data, isLoading, isError } = useGetOneQuiz(quizId);

  const updateQuiz = useUpdateQuiz();

  const quiz = data?.data.quiz;

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),

    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      questions: [],
    },
  });

  /*
   * Load the existing DB data into the form.
   */
  useEffect(() => {
    if (!quiz) return;

    form.reset({
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      questions: quiz.questions,
    });

    setStep(1);
  }, [quiz, form]);

  /*
   * Reset when dialog closes.
   */
  useEffect(() => {
    if (open) return;

    setStep(1);

    form.reset({
      title: "",
      description: "",
      category: undefined,
      questions: [],
    });
  }, [open, form]);

  const handleNext = async () => {
    if (step !== 1) return;

    const valid = await form.trigger(["title", "description", "category"]);

    if (!valid) return;

    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const onSubmit = (values: QuizFormData) => {
    updateQuiz.mutate(
      {
        quizId,
        data: values,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-190">
        {isLoading ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner />
              </EmptyMedia>
              <EmptyTitle className="font-Outfit">Loading...</EmptyTitle>
            </EmptyHeader>
            <EmptyContent>
              <EmptyDescription className="font-Outfit">
                Please wait, your quiz is loading
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        ) : isError || !quizId ? (
          <EmptyData
            title="Quiz Unavailable"
            description="We could not find your quiz"
          />
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Quiz</DialogTitle>

              <DialogDescription>
                Update your quiz information and questions.
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{step === 1 ? "Basic Information" : "Questions"}</span>

                <span>Step {step} of 2</span>
              </div>

              <Progress value={step === 1 ? 50 : 100} />
            </div>

            {step === 1 ? (
              <UpdateBasicInfo form={form} />
            ) : (
              <UpdateQuestions form={form} />
            )}

            <DialogFooter className="mt-6">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}

              {step === 1 && (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}

              {step === 2 && (
                <Button type="submit" disabled={updateQuiz.isPending}>
                  {updateQuiz.isPending ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuizDialog;
