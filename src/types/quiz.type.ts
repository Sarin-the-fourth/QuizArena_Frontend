import type { Question } from "./question.type";

export interface GetCategoryResponse {
  categories: [string];
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  category: string;
  createdBy?: string;
}

export interface GetQuizResponse {
  quiz: Quiz[];
}

export interface GetMyQuizResponse {
  quiz: Quiz[];
}

export interface CreateQuizDTO {
  title: string;
  description: string;
  category: string;
  questions: Question[];
}

export interface CreateQuizResponse {
  message: string;
  quiz: CreateQuizDTO;
}

export interface DeleteQuizResponse {
  message: string;
}
