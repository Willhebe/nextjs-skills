import { quizzes, levelInfo } from "./quizzes";
import { LEVELS, type Level, type QuizResult } from "./types";

export type Stats = {
  totalAttempts: number;
  averagePct: number;
  perfectScores: number;
  perTest: { testId: string; title: string; level: Level; attempts: number; avgPct: number }[];
  perLevel: { level: string; attempts: number; avgPct: number }[];
  scoreDistribution: { label: string; count: number }[];
  last14Days: { day: string; attempts: number }[];
  trickiest: { testTitle: string; question: string; pctCorrect: number; attempts: number }[];
};

const pct = (part: number, whole: number) => (whole === 0 ? 0 : Math.round((part / whole) * 100));

export function computeStats(results: QuizResult[]): Stats {
  const sumScore = results.reduce((sum, r) => sum + r.score, 0);
  const sumTotal = results.reduce((sum, r) => sum + r.total, 0);

  const perTest = quizzes.map((quiz) => {
    const mine = results.filter((r) => r.testId === quiz.id);
    return {
      testId: quiz.id,
      title: quiz.title,
      level: quiz.level,
      attempts: mine.length,
      avgPct: pct(
        mine.reduce((s, r) => s + r.score, 0),
        mine.reduce((s, r) => s + r.total, 0)
      ),
    };
  });

  const perLevel = LEVELS.map((level) => {
    const mine = results.filter((r) => r.level === level);
    return {
      level: levelInfo[level].label,
      attempts: mine.length,
      avgPct: pct(
        mine.reduce((s, r) => s + r.score, 0),
        mine.reduce((s, r) => s + r.total, 0)
      ),
    };
  });

  // How many attempts got 0, 1, 2, 3 or 4 right
  const maxQuestions = Math.max(4, ...quizzes.map((q) => q.questions.length));
  const scoreDistribution = Array.from({ length: maxQuestions + 1 }, (_, n) => ({
    label: `${n} right`,
    count: results.filter((r) => r.score === n).length,
  }));

  // Attempts per day for the last fortnight
  const today = new Date();
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    return {
      day: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      attempts: results.filter((r) => r.createdAt.slice(0, 10) === key).length,
    };
  });

  // Which individual questions catch people out the most?
  const questionStats: Stats["trickiest"] = [];
  for (const quiz of quizzes) {
    const mine = results.filter((r) => r.testId === quiz.id);
    quiz.questions.forEach((question, i) => {
      const answered = mine.filter((r) => r.answers[i] !== undefined);
      if (answered.length === 0) return;
      const right = answered.filter((r) => r.answers[i]).length;
      questionStats.push({
        testTitle: quiz.title,
        question: question.question,
        pctCorrect: pct(right, answered.length),
        attempts: answered.length,
      });
    });
  }
  const trickiest = questionStats
    .sort((a, b) => a.pctCorrect - b.pctCorrect || b.attempts - a.attempts)
    .slice(0, 5);

  return {
    totalAttempts: results.length,
    averagePct: pct(sumScore, sumTotal),
    perfectScores: results.filter((r) => r.score === r.total).length,
    perTest,
    perLevel,
    scoreDistribution,
    last14Days,
    trickiest,
  };
}
