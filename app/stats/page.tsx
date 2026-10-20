import type { Metadata } from "next";
import Link from "next/link";
import StatsChartsLazy from "@/components/StatsChartsLazy";
import { getResults } from "@/lib/db";
import { computeStats, type Stats } from "@/lib/stats";

export const metadata: Metadata = { title: "Stats" };

// Always render on request so the numbers are fresh
export const dynamic = "force-dynamic";

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-stone-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold">{value}</p>
      {note && <p className="mt-1 text-xs text-stone-500">{note}</p>}
    </div>
  );
}

export default async function StatsPage() {
  // This is a Server Component, so it can talk to the database directly - no API call needed
  let stats: Stats | null = null;
  try {
    stats = computeStats(await getResults());
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight">How is everyone doing?</h1>
      <p className="mt-3 max-w-2xl text-lg text-stone-700">
        Every time someone finishes a test, their score lands here (no names, just numbers). Charts courtesy of AG
        Charts.
      </p>

      {!stats && (
        <p className="mt-8 rounded-2xl bg-red-50 p-6 text-red-800">
          Hmm, couldn&apos;t reach the database just now. Give it a minute and refresh.
        </p>
      )}

      {stats && stats.totalAttempts === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-xl font-bold">Nothing to see yet!</p>
          <p className="mt-2 text-stone-600">No one has finished a test. Fancy being the first?</p>
          <Link href="/" className="mt-5 inline-block rounded-full bg-ink px-5 py-2 font-semibold text-sunny-300">
            Take a test
          </Link>
        </div>
      )}

      {stats && stats.totalAttempts > 0 && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Tile label="Tests taken" value={stats.totalAttempts.toLocaleString("en-GB")} />
            <Tile label="Average score" value={`${stats.averagePct}%`} />
            <Tile label="Perfect scores" value={stats.perfectScores.toLocaleString("en-GB")} note="4 out of 4" />
            <Tile
              label="Most popular"
              value={[...stats.perTest].sort((a, b) => b.attempts - a.attempts)[0].title}
              note="most attempted test"
            />
          </div>

          <div className="mt-6">
            <StatsChartsLazy stats={stats} />
          </div>

          {stats.trickiest.length > 0 && (
            <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">The trickiest questions</h2>
              <p className="mb-4 text-sm text-stone-500">The ones that catch people out the most.</p>
              <ol className="space-y-3">
                {stats.trickiest.map((t, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-14 shrink-0 rounded-lg bg-sunny-100 py-1 text-center font-extrabold">
                      {t.pctCorrect}%
                    </span>
                    <div>
                      <p className="font-semibold">{t.question}</p>
                      <p className="text-xs text-stone-500">
                        {t.testTitle} · answered {t.attempts} time{t.attempts === 1 ? "" : "s"}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </>
      )}
    </div>
  );
}
