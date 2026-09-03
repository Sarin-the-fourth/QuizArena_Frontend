type Option = {
  id: string;
  option: string;
};

export type Question = {
  question: string;
  options: Option[];
  correctAnswer: string;
  timeLimit: number;
};
