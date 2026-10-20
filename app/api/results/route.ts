import { NextResponse } from "next/server";
import { getResults, saveResult } from "@/lib/db";
import { getQuiz } from "@/lib/quizzes";
import { computeStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

// GET /api/results -> the summary stats as JSON (the Stats page reads the DB directly, but this is handy too)
export async function GET() {
  try {
    const results = await getResults();
    return NextResponse.json(computeStats(results));
  } catch (err) {
    console.error("Failed to load results", err);
    return NextResponse.json({ error: "Couldn't load results" }, { status: 500 });
  }
}

// POST /api/results  { testId: "styling", choices: [1, 0, 3, 1] }
// The server does the marking, so nobody can just post "I got 4/4"
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const { testId, choices } = (body ?? {}) as { testId?: unknown; choices?: unknown };
  const quiz = typeof testId === "string" ? getQuiz(testId) : undefined;
  if (!quiz) {
    return NextResponse.json({ error: "Unknown test" }, { status: 400 });
  }

  const validChoices =
    Array.isArray(choices) &&
    choices.length === quiz.questions.length &&
    choices.every((c, i) => Number.isInteger(c) && c >= 0 && c < quiz.questions[i].options.length);
  if (!validChoices) {
    return NextResponse.json({ error: "Choices don't match the test" }, { status: 400 });
  }

  const answers = quiz.questions.map((question, i) => (choices as number[])[i] === question.answer);
  const score = answers.filter(Boolean).length;

  try {
    await saveResult({ testId: quiz.id, level: quiz.level, score, total: quiz.questions.length, answers });
    return NextResponse.json({ score, total: quiz.questions.length }, { status: 201 });
  } catch (err) {
    console.error("Failed to save result", err);
    return NextResponse.json({ error: "Couldn't save result" }, { status: 500 });
  }
}
