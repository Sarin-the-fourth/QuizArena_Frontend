import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import type { QuizFormData } from "@/schema/quiz.schema";

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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-Outfit text-lg font-semibold">
            Question {currentQuestion + 1} of {fields.length}
          </h3>

          <p className="text-sm text-muted-foreground">Edit this question.</p>
        </div>

        <Button type="button" variant="outline" onClick={addQuestion}>
          <Plus />
          Add Question
        </Button>
      </div>

      {/* QUESTION NAVIGATION */}
      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <Button
            key={field.id}
            type="button"
            size="sm"
            variant={currentQuestion === index ? "default" : "outline"}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* QUESTION */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Question</label>

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
          <p className="text-sm text-destructive">{errors.question.message}</p>
        )}
      </div>

      {/* OPTIONS */}
      <div className="space-y-4">
        <h4 className="font-Outfit font-semibold">Options</h4>

        {question.options.map((option, optionIndex) => {
          const optionError = errors?.options?.[optionIndex];

          return (
            <div key={option.id} className="space-y-2">
              <label className="text-sm font-medium">
                Option {String.fromCharCode(65 + optionIndex)}
              </label>

              <Input
                value={option.option}
                onChange={(event) => {
                  form.setValue(
                    `questions.${currentQuestion}.options.${optionIndex}.option`,
                    event.target.value,
                    {
                      shouldDirty: true,
                    }
                  );
                }}
                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
              />

              {optionError?.option && (
                <p className="text-sm text-destructive">
                  {optionError.option.message}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* CORRECT ANSWER */}
      <div className="space-y-3">
        <h4 className="font-Outfit font-semibold">Correct Answer</h4>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {question.options.map((option, index) => {
            const selected = question.correctAnswer === option.id;

            return (
              <Button
                key={option.id}
                type="button"
                variant={selected ? "default" : "outline"}
                onClick={() => {
                  form.setValue(
                    `questions.${currentQuestion}.correctAnswer`,
                    option.id,
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  );
                }}
              >
                Option {String.fromCharCode(65 + index)}
              </Button>
            );
          })}
        </div>

        {errors?.correctAnswer && (
          <p className="text-sm text-destructive">
            {errors.correctAnswer.message}
          </p>
        )}
      </div>

      {/* TIME LIMIT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Time Limit</label>

        <Input
          type="number"
          min={5}
          max={15}
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

        {errors?.timeLimit && (
          <p className="text-sm text-destructive">{errors.timeLimit.message}</p>
        )}
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

      {/* NAVIGATION */}
      <div className="flex justify-between border-t pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={currentQuestion === 0}
          onClick={() => goToQuestion(currentQuestion - 1)}
        >
          Previous
        </Button>

        <Button
          type="button"
          disabled={currentQuestion === fields.length - 1}
          onClick={() => goToQuestion(currentQuestion + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UpdateQuestions;
