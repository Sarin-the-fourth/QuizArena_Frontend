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
