type Option = {
  id: string;
  option: string;
};

export type Question = {
  _id: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  timeLimit: number;
};
