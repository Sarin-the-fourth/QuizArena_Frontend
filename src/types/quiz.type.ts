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

export interface PopulateQuestions extends Quiz {
  questions: Question[];
}

export interface GetOneQuizResponse {
  quiz: PopulateQuestions;
}

export interface SubmitQuizQuestion {
  id: string;
  answer: string;
}

export interface SubmitQuizResponse {
  roomCode: string;
  answers: SubmitQuizQuestion[];
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface SubmitQuizDTO {
  answers: Answer[];
}

export interface SubmitQuizResponse {
  message: string;
  submit: {
    correctAnswer: number;
    totalAnswer: number;
    scoreAdded: number;
    roomCode: string;
  };
}

export interface GetQuestionsAnswerResponse {
  quiz: {
    _id: string;
    questions: Question[];
  };
}
