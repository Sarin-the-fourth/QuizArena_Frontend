import { useSearchParams } from "react-router-dom";
import {
  Controller,
  useFieldArray,
  useWatch,
  type UseFormReturn,
} from "react-hook-form";

import { Plus, X } from "lucide-react";

import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";

import { InputGroup, InputGroupInput } from "../ui/input-group";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";

import type { QuizFormData } from "@/schema/quiz.schema";

type QuestionsProps = {
  form: UseFormReturn<QuizFormData>;
};

const createEmptyQuestion = () => ({
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

const Questions = ({ form }: QuestionsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    control,
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = form;

  console.log("RHF questions:", form.getValues("questions"));

  const { fields, append } = useFieldArray({
    control,
    name: "questions",
  });

  /*
   * URL:
   *
   * ?question=1
   * ?question=2
   * ?question=3
   */

  const questionNumber = Math.max(1, Number(searchParams.get("question")) || 1);

  /*
   * Convert URL number → array index.
   *
   * question=1 → questions[0]
   * question=2 → questions[1]
   */

  const currentQuestion = questionNumber - 1;

  /*
   * Watch all questions.
   *
   * This makes the UI update whenever a question
   * is edited.
   */

  //   const questions = useWatch({
  //     control,
  //     name: "questions",
  //   });

  //   const question = questions?.[currentQuestion];
  const question = getValues(`questions.${currentQuestion}`);

  /*
   * Safety check.
   *
   * If someone manually enters:
   *
   * ?question=999
   *
   * we don't try to access a question that doesn't exist.
   */

  if (!question) {
    return null;
  }

  /*
   * Change the question number in the URL.
   */

  const goToQuestion = (number: number) => {
    setSearchParams({
      question: String(number),
    });
  };

  /*
   * NEXT
   */

  const handleNext = async () => {
    /*
     * Validate the current question first.
     */
    const isValid = await trigger(`questions.${currentQuestion}`);

    if (!isValid) {
      return;
    }

    /*
     * If we're currently on the last question,
     * create a new question.
     */

    if (currentQuestion === fields.length - 1) {
      append(createEmptyQuestion());

      goToQuestion(questionNumber + 1);

      return;
    }

    /*
     * Otherwise just move to the next question.
     */

    goToQuestion(questionNumber + 1);
  };

  /*
   * PREVIOUS
   */

  const handlePrevious = () => {
    if (questionNumber <= 1) {
      return;
    }

    goToQuestion(questionNumber - 1);
  };

  /*
   * ADD OPTION
   */

  const handleAddOption = () => {
    if (question.options.length >= 4) {
      return;
    }

    const optionIds = ["a", "b", "c", "d"];

    /*
     * Find the first unused option ID.
     *
     * This prevents duplicate IDs if an option
     * was previously removed.
     */

    const nextOptionId = optionIds.find(
      (id) => !question.options.some((option) => option.id === id)
    );

    if (!nextOptionId) {
      return;
    }

    setValue(
      `questions.${currentQuestion}.options`,
      [
        ...question.options,
        {
          id: nextOptionId,
          option: "",
        },
      ],
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  /*
   * REMOVE OPTION
   */

  const handleRemoveOption = (index: number) => {
    /*
     * We always need at least two options.
     */

    if (question.options.length <= 2) {
      return;
    }

    const removedOption = question.options[index];

    const newOptions = question.options.filter(
      (_, optionIndex) => optionIndex !== index
    );

    setValue(`questions.${currentQuestion}.options`, newOptions, {
      shouldDirty: true,
      shouldValidate: true,
    });

    /*
     * If the deleted option was the correct answer,
     * clear the correct answer.
     */

    if (question.correctAnswer === removedOption.id) {
      setValue(`questions.${currentQuestion}.correctAnswer`, "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <ScrollArea
      data-aos="fade-up"
      data-aos-duration="750"
      className="2xl:h-120 h-100 font-Outfit border border-gray-300 rounded-xl overflow-y-auto"
    >
      <div className="flex flex-col gap-5 font-Outfit p-5">
        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-400 text-sm">
              Question {questionNumber} of {fields.length}
            </span>

            <ButtonGroup>
              <Button
                type="button"
                size="xs"
                variant="outline"
                className="bg-transparent border-gray-300"
                disabled={questionNumber === 1}
                onClick={handlePrevious}
              >
                Previous
              </Button>

              <Button
                type="button"
                size="xs"
                variant="outline"
                className="bg-transparent border-gray-300"
                onClick={handleNext}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>

          {/* QUESTION */}
          <Field>
            <FieldLabel className="text-base">Question</FieldLabel>

            <InputGroup>
              <Controller
                control={control}
                name={`questions.${currentQuestion}.question`}
                render={({ field }) => (
                  <InputGroupInput
                    placeholder="Ex: What is JavaScript?"
                    {...field}
                  />
                )}
              />
            </InputGroup>

            <FieldDescription>
              Ask something interesting and test your player's knowledge.
            </FieldDescription>

            {errors.questions?.[currentQuestion]?.question && (
              <p className="text-sm text-destructive">
                {errors.questions[currentQuestion]?.question?.message}
              </p>
            )}
          </Field>
        </div>

        {/* OPTIONS */}

        <div>
          <Field>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <FieldLabel className="text-base">Options</FieldLabel>

                <FieldDescription>
                  Choose one option as the correct answer.
                </FieldDescription>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="text-black/70 text-xs"
                disabled={question.options.length >= 4}
                onClick={handleAddOption}
              >
                <Plus />
                Add Option
              </Button>
            </div>

            {/* CORRECT ANSWER */}

            <RadioGroup
              value={question.correctAnswer}
              onValueChange={(value) =>
                setValue(`questions.${currentQuestion}.correctAnswer`, value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              {question.options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-3">
                  <RadioGroupItem value={option.id} />
                  <InputGroup className="w-70">
                    <Controller
                      control={control}
                      name={`questions.${currentQuestion}.options.${index}.option`}
                      render={({ field }) => (
                        <InputGroupInput
                          placeholder={`Option ${index + 1}`}
                          {...field}
                        />
                      )}
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={question.options.length <= 2}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </RadioGroup>

            {/* OPTION ERROR */}

            {errors.questions?.[currentQuestion]?.options && (
              <p className="text-sm text-destructive">
                {errors.questions[currentQuestion].options?.message?.toString()}
              </p>
            )}

            {/* CORRECT ANSWER ERROR */}

            {errors.questions?.[currentQuestion]?.correctAnswer && (
              <p className="text-sm text-destructive">
                {errors.questions[currentQuestion].correctAnswer?.message}
              </p>
            )}
          </Field>
        </div>

        {/* TIME LIMIT */}

        <div>
          <Field orientation="horizontal">
            <FieldLabel>Time per Question:</FieldLabel>

            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name={`questions.${currentQuestion}.timeLimit`}
                render={({ field }) => (
                  <Input
                    type="number"
                    min={5}
                    max={15}
                    step={1}
                    className="w-15!"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                )}
              />

              <span>sec</span>
            </div>
          </Field>

          {errors.questions?.[currentQuestion]?.timeLimit && (
            <p className="text-sm text-destructive">
              {errors.questions[currentQuestion].timeLimit?.message}
            </p>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Questions;
