"use client";

import Link from "next/link";
import { useState } from "react";
import { saveBestScore } from "@/lib/bestScores";
import type { Quiz as QuizType } from "@/lib/types";

type SaveState = "idle" | "saving" | "saved" | "error";

const verdicts = [
  "Ouch. Have a read of the explanations and give it another go!",
  "A start! The explanations are your friend here.",
  "Halfway there - not bad at all.",
  "So close! Nearly a clean sweep.",
  "Perfect score. Take a bow!",
];

export default function Quiz({ quiz }: { quiz: QuizType }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const total = quiz.questions.length;
  const question = quiz.questions[current];
  const revealed = selected !== null;
  const score = choices.filter((choice, i) => choice === quiz.questions[i].answer).length;

  function choose(index: number) {
    if (revealed) return; // no changing your mind!
    setSelected(index);
    setChoices((prev) => [...prev, index]);
  }

  async function next() {
    if (current < total - 1) {
      setCurrent(current + 1);
      setSelected(null);
      return;
    }
    setFinished(true);
    saveBestScore(quiz.id, score);

    // Send the answers to our API route - the server marks them and stores the result
    setSaveState("saving");
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId: quiz.id, choices }),
      });
      setSaveState(res.ok ? "saved" : "error");
    } catch {
      setSaveState("error");
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setChoices([]);
    setFinished(false);
    setSaveState("idle");
  }

  if (finished) {
    // verdicts has 5 entries; scale in case a quiz ever has a different number of questions
    const verdict = verdicts[Math.round((score / total) * (verdicts.length - 1))];
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-stone-500">You scored</p>
        <p className="mt-2 text-6xl font-extrabold">
          {score}
          <span className="text-3xl text-stone-400">/{total}</span>
        </p>
        <p className="mt-4 text-lg">{verdict}</p>
        <p className="mt-2 text-sm text-stone-500" aria-live="polite">
          {saveState === "saving" && "Adding your score to the stats..."}
          {saveState === "saved" && "Your score has been added to the stats."}
          {saveState === "error" && "Couldn't save your score this time - sorry about that."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={restart} className="rounded-full border-2 border-ink px-5 py-2 font-semibold hover:bg-sunny-100">
            Try again
          </button>
          <Link href="/stats" className="rounded-full bg-ink px-5 py-2 font-semibold text-sunny-300 hover:bg-stone-800">
            See the stats
          </Link>
          <Link href="/" className="rounded-full bg-sunny-400 px-5 py-2 font-semibold hover:bg-sunny-300">
            Pick another test
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* progress bar */}
      <div className="mb-2 flex justify-between text-sm font-semibold text-stone-500">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>Score so far: {score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sunny-200">
        <div
          className="h-full rounded-full bg-sunny-500 transition-all"
          style={{ width: `${((current + (revealed ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{question.question}</h2>

        <ul className="mt-5 space-y-3">
          {question.options.map((option, i) => {
            const isAnswer = i === question.answer;
            const isPicked = i === selected;
            let style = "border-stone-200 hover:border-sunny-400 hover:bg-sunny-50";
            if (revealed && isAnswer) style = "border-green-500 bg-green-50";
            else if (revealed && isPicked) style = "border-red-400 bg-red-50";
            else if (revealed) style = "border-stone-200 opacity-60";

            return (
              <li key={i}>
                <button
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${style}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sunny-100 text-sm font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {revealed && isAnswer && <span className="font-bold text-green-700">✓</span>}
                  {revealed && isPicked && !isAnswer && <span className="font-bold text-red-600">✗</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {revealed && (
          <div className="mt-5 rounded-xl bg-sunny-100 p-4" aria-live="polite">
            <p className="font-bold">{selected === question.answer ? "Nice one!" : "Not quite."}</p>
            <p className="mt-1 text-stone-700">{question.explanation}</p>
            <button
              onClick={next}
              className="mt-4 rounded-full bg-ink px-5 py-2 font-semibold text-sunny-300 hover:bg-stone-800"
            >
              {current < total - 1 ? "Next question →" : "See my score"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
