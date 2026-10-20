"use client";

import { useEffect, useState } from "react";
import { readBestScores } from "@/lib/bestScores";

export default function BestScoreBadge({ testId, total }: { testId: string; total: number }) {
  const [best, setBest] = useState<number | null>(null);

  // localStorage only exists in the browser, so read it after the component mounts
  useEffect(() => {
    const score = readBestScores()[testId];
    if (score !== undefined) setBest(score);
  }, [testId]);

  if (best === null) {
    return <span className="text-xs font-semibold text-stone-400">Not tried yet</span>;
  }

  const perfect = best === total;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
        perfect ? "bg-green-100 text-green-800" : "bg-sunny-200 text-stone-800"
      }`}
    >
      Best: {best}/{total}
      {perfect ? " ★" : ""}
    </span>
  );
}
