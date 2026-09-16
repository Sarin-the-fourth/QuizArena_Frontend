import type { UseFormReturn } from "react-hook-form";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import type { QuizFormData } from "@/schema/quiz.schema";

interface UpdateBasicInfoProps {
  form: UseFormReturn<QuizFormData>;
}

const categories = [
  "IT",
  "Automobiles",
  "Science",
  "History",
  "Geography",
  "Sports",
  "Entertainment",
  "General Knowledge",
] as const;

const UpdateBasicInfo = ({ form }: UpdateBasicInfoProps) => {
  const title = form.watch("title");
  const description = form.watch("description");
  const category = form.watch("category");

  const errors = form.formState.errors;

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div className="space-y-2">
        <label htmlFor="update-title" className="text-sm font-medium">
          Quiz Title
        </label>

        <Input
          id="update-title"
          value={title}
          placeholder="Enter quiz title"
          {...form.register("title")}
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <label htmlFor="update-description" className="text-sm font-medium">
          Description
        </label>

        <Textarea
          id="update-description"
          value={description}
          placeholder="Describe your quiz"
          className="min-h-30 resize-none"
          {...form.register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>

        <Select
          value={category}
          onValueChange={(value) => {
            form.setValue("category", value as QuizFormData["category"], {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>
    </div>
  );
};

export default UpdateBasicInfo;
