import { z } from "zod";

const optionSchema = z.object({
  id: z.string(),
  option: z.string().trim().min(1, "Option cannot be empty"),
});

const questionSchema = z
  .object({
    question: z.string().trim().min(1, "Question cannot be empty"),

    options: z
      .array(optionSchema)
      .min(2, "A question must have at least 2 options")
      .max(4, "A question cannot have more than 4 options"),

    correctAnswer: z.string().min(1, "Please select the correct answer"),

    timeLimit: z
      .number()
      .min(5, "Time limit must be at least 5 seconds")
      .max(15, "Time limit cannot exceed 15 seconds"),
  })
  .superRefine((data, ctx) => {
    const answerExists = data.options.some(
      (option) => option.id === data.correctAnswer
    );

    if (!answerExists) {
      ctx.addIssue({
        code: "custom",
        path: ["correctAnswer"],
        message: "Selected answer is not one of the options",
      });
    }
  });

export const categorySchema = z.enum(
  [
    "IT",
    "Automobiles",
    "Science",
    "History",
    "Geography",
    "Sports",
    "Entertainment",
    "General Knowledge",
  ],
  "Please select a category"
);

export const quizSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Quiz title is required")
    .max(100, "Quiz title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Quiz description is required")
    .max(500, "Quiz description cannot exceed 500 characters"),

  category: categorySchema,

  quizType: z.enum(["PUBLIC", "PRIVATE"]),

  questions: z.array(questionSchema).min(1, "Add at least one question"),
});

export type QuizFormData = z.infer<typeof quizSchema>;

export type QuizCategory = z.infer<typeof categorySchema>;
