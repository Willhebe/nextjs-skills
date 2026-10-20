// Each visitor's personal best scores live in their own browser (localStorage).
// Everyone's results also go to the database for the Stats page.

const KEY = "nextjs-quiz-best-scores";

export type BestScores = Record<string, number>;

export function readBestScores(): BestScores {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as BestScores;
  } catch {
    return {};
  }
}

export function saveBestScore(testId: string, score: number): void {
  try {
    const scores = readBestScores();
    if (scores[testId] === undefined || score > scores[testId]) {
      scores[testId] = score;
      localStorage.setItem(KEY, JSON.stringify(scores));
    }
  } catch {
    // private browsing or storage blocked - not the end of the world
  }
}
