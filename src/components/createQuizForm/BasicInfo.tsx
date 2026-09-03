import { useGetCategory } from "@/hooks/useQuiz";
import type { QuizFormData } from "@/schema/quiz.schema";
import type { UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldLabel } from "../ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group";

import { ScrollArea } from "../ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

type BasicInfoProps = {
  form: UseFormReturn<QuizFormData>;
};

const BasicInfo = ({ form }: BasicInfoProps) => {
  const { data: categoryData } = useGetCategory();

  const categories = categoryData?.data?.categories ?? [];
  const [countWords, setCountWords] = useState<string>("");

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <ScrollArea
      data-aos="fade-up"
      data-aos-duration="750"
      className="2xl:h-full h-100 border border-gray-300 rounded-xl"
    >
      <div className="flex flex-col gap-5 p-5 font-Outfit">
        <Field>
          <FieldLabel className="text-base">Quiz Title</FieldLabel>

          <InputGroup>
            <InputGroupInput placeholder="Title..." {...register("title")} />
          </InputGroup>

          <FieldDescription>Give your quiz a catchy name</FieldDescription>

          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </Field>

        <Field className="min-w-0 w-full">
          <FieldLabel className="text-base">Description</FieldLabel>
          <InputGroup className="w-full min-w-0">
            <InputGroupTextarea
              placeholder="Describe what your quiz is about..."
              className="min-h-[100px] min-w-0 w-full max-w-full resize-none wrap-anywhere"
              maxLength={150}
              {...register("description")}
              onChange={(e) => setCountWords(e.target.value)}
            />
            <InputGroupAddon align="block-end">
              {countWords.length}/150
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            Briefly describe what this quiz is about
          </FieldDescription>

          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </Field>

        {/* CATEGORY */}

        <Field>
          <FieldLabel className="text-base">Category</FieldLabel>

          <Select
            value={watch("category") ?? ""}
            onValueChange={(value) =>
              setValue("category", value as QuizFormData["category"], {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>

                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FieldDescription>
            Choose a category that best fits your quiz
          </FieldDescription>

          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </Field>
      </div>
    </ScrollArea>
  );
};

export default BasicInfo;
