import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Quiz from "@/components/Quiz";
import { getQuiz, levelInfo, quizzes } from "@/lib/quizzes";

type Props = { params: Promise<{ testId: string }> };

// Pre-build a page for every quiz at build time
export function generateStaticParams() {
  return quizzes.map((quiz) => ({ testId: quiz.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { testId } = await params;
  const quiz = getQuiz(testId);
  return { title: quiz ? quiz.title : "Quiz not found" };
}

export default async function QuizPage({ params }: Props) {
  const { testId } = await params; // params is a Promise in Next.js 15
  const quiz = getQuiz(testId);
  if (!quiz) notFound();

  const info = levelInfo[quiz.level];

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/" className="text-sm font-semibold text-stone-500 hover:text-ink">
        ← All tests
      </Link>
      <p className="mt-4 text-sm font-bold uppercase tracking-wide" style={{ color: info.colour }}>
        {info.label}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight">{quiz.title}</h1>
      <p className="mt-1 text-stone-600">{quiz.blurb}</p>

      {/* key resets the quiz state if you jump straight from one quiz to another */}
      <Quiz key={quiz.id} quiz={quiz} />
    </div>
  );
}
