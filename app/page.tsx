import Link from "next/link";
import BestScoreBadge from "@/components/BestScoreBadge";
import { levelInfo, quizzesByLevel } from "@/lib/quizzes";
import { LEVELS } from "@/lib/types";

export default function TestSkillsPage() {
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Test your Next.js skills</h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-700">
          18 bite-sized quizzes, from &quot;what even is this?&quot; to &quot;parallel intercepting what now?&quot;.
          Each one is 4 questions, takes a couple of minutes, and tells you why the right answer is right.
          No sign-up, no pressure - your score just gets added (anonymously) to the{" "}
          <Link href="/stats" className="font-semibold underline decoration-sunny-400 decoration-4 underline-offset-2">
            stats
          </Link>
          .
        </p>
      </section>

      <div className="space-y-10">
        {LEVELS.map((level) => {
          const info = levelInfo[level];
          return (
            <section key={level}>
              <div className="mb-4 flex items-baseline gap-3">
                <h2 className="text-2xl font-extrabold" style={{ color: info.colour }}>
                  {info.emoji} {info.label}
                </h2>
                <p className="text-stone-600">{info.tagline}</p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quizzesByLevel(level).map((quiz) => (
                  <li key={quiz.id}>
                    <Link
                      href={`/test/${quiz.id}`}
                      className="group flex h-full flex-col rounded-2xl border-2 border-t-4 border-transparent bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sunny-400 hover:shadow-md"
                      style={{ borderTopColor: info.colour }}
                    >
                      <h3 className="text-lg font-bold group-hover:underline">{quiz.title}</h3>
                      <p className="mt-1 flex-1 text-sm text-stone-600">{quiz.blurb}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-stone-500">{quiz.questions.length} questions</span>
                        <BestScoreBadge testId={quiz.id} total={quiz.questions.length} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
