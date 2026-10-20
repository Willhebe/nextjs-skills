export type Level = "beginner" | "intermediate" | "advanced";

export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

export type Question = {
  question: string;
  options: string[];
  /** index into options */
  answer: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  level: Level;
  title: string;
  blurb: string;
  questions: Question[];
};

/** One completed attempt at a quiz, as stored in the database */
export type QuizResult = {
  testId: string;
  level: Level;
  score: number;
  total: number;
  /** true/false for each question, in order */
  answers: boolean[];
  createdAt: string;
};
