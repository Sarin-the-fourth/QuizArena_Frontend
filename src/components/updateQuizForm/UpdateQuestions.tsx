import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import type { QuizFormData } from "@/schema/quiz.schema";
import { ScrollArea } from "../ui/scroll-area";
import { Field, FieldDescription, FieldLabel, FieldTitle } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface UpdateQuestionsProps {
  form: UseFormReturn<QuizFormData>;
}

const createEmptyQuestion = () => ({
  question: "",
  options: [
    {
      id: "a",
      option: "",
    },
    {
      id: "b",
      option: "",
    },
  ],
  correctAnswer: "a",
  timeLimit: 15,
});

const UpdateQuestions = ({ form }: UpdateQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const question = form.watch(`questions.${currentQuestion}`);
  const errors = form.formState.errors.questions?.[currentQuestion];

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= fields.length) {
      return;
    }
    setCurrentQuestion(index);
  };

  const addQuestion = () => {
    append(createEmptyQuestion());

    setCurrentQuestion(fields.length);
  };

  const deleteQuestion = () => {
    if (fields.length <= 1) return;

    remove(currentQuestion);

    setCurrentQuestion((previous) => Math.min(previous, fields.length - 2));
  };

  if (!question) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <p className="text-sm text-muted-foreground">No questions available.</p>

        <Button type="button" onClick={addQuestion}>
          <Plus />
          Add Question
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea
      // data-aos="fade-up"
      // data-aos-duration="750"
      className="2xl:h-120 h-100 font-Outfit border border-gray-300 rounded-xl overflow-y-auto p-5"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <Field className="gap-0!">
              <FieldTitle className="font-Outfit text-lg font-semibold">
                Question {currentQuestion + 1} of {fields.length}
              </FieldTitle>

              <FieldDescription className="text-sm text-muted-foreground">
                Edit this question.
              </FieldDescription>
            </Field>

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addQuestion}
              >
                <Plus />
                Add Question
              </Button>
              {/* QUESTION NAVIGATION */}
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <Button
                    key={field.id}
                    type="button"
                    size="xs"
                    variant={currentQuestion === index ? "default" : "ghost"}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QUESTION */}
        <Field className="gap-0">
          <FieldLabel className="text-base font-medium">Question</FieldLabel>
          <Input
            value={question.question}
            onChange={(event) => {
              form.setValue(
                `questions.${currentQuestion}.question`,
                event.target.value,
                {
                  shouldDirty: true,
                }
              );
            }}
            placeholder="Enter your question"
          />

          {errors?.question && (
            <p className="text-sm text-destructive">
              {errors.question.message}
            </p>
          )}
        </Field>

        {/* OPTIONS */}
        <Field className="gap-1">
          <FieldTitle className="font-Outfit text-base">Options</FieldTitle>
          <FieldDescription>Please select the correct answer</FieldDescription>

          <RadioGroup
            value={question.correctAnswer}
            onValueChange={(value) => {
              form.setValue(
                `questions.${currentQuestion}.correctAnswer`,
                value as "a" | "b" | "c" | "d",
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              );
            }}
            className="space-y-3"
          >
            {question.options.map((option, optionIndex) => {
              const optionError = errors?.options?.[optionIndex];

              return (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={option.id}
                      id={`option-${option.id}`}
                    />

                    <Input
                      value={option.option}
                      className="w-[450px]"
                      onChange={(event) => {
                        form.setValue(
                          `questions.${currentQuestion}.options.${optionIndex}.option`,
                          event.target.value,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      placeholder={`Option ${String.fromCharCode(
                        65 + optionIndex
                      )}`}
                    />
                  </div>

                  {optionError?.option && (
                    <p className="text-sm text-destructive">
                      {optionError.option.message}
                    </p>
                  )}
                </div>
              );
            })}
          </RadioGroup>
        </Field>

        {/* TIME LIMIT */}
        <Field className="flex flex-row justify-between items-center px-2">
          <div className="flex flex-col gap-2">
            <FieldLabel className="text-sm font-medium">Time Limit</FieldLabel>

            <Input
              type="number"
              className="w-fit!"
              min={5}
              max={60}
              value={question.timeLimit}
              onChange={(event) => {
                form.setValue(
                  `questions.${currentQuestion}.timeLimit`,
                  Number(event.target.value),
                  {
                    shouldDirty: true,
                  }
                );
              }}
            />
          </div>

          {/* DELETE */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="destructive"
              disabled={fields.length <= 1}
              onClick={deleteQuestion}
            >
              <Trash2 />
              Delete Question
            </Button>
          </div>
        </Field>
        {errors?.timeLimit && (
          <p className="text-sm text-destructive">{errors.timeLimit.message}</p>
        )}
      </div>
    </ScrollArea>
  );
};

export default UpdateQuestions;
