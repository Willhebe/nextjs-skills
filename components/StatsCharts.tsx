"use client";

import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import { levelInfo } from "@/lib/quizzes";
import type { Stats } from "@/lib/stats";

const INK = "#1c1917";
const SUNNY = "#eab308";
const levelColours = [levelInfo.beginner.colour, levelInfo.intermediate.colour, levelInfo.advanced.colour];

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mb-3 text-sm text-stone-500">{subtitle}</p>
      {children}
    </section>
  );
}

export default function StatsCharts({ stats }: { stats: Stats }) {
  // 1. Average score per test - one series per level, stacked so each bar gets its level's colour
  const perTestData = stats.perTest.map((t) => ({
    title: t.title,
    attempts: t.attempts,
    [t.level]: t.attempts > 0 ? t.avgPct : undefined,
  }));

  const perTestOptions: AgChartOptions = {
    data: perTestData,
    height: 560,
    series: (["beginner", "intermediate", "advanced"] as const).map((level) => ({
      type: "bar" as const,
      direction: "horizontal" as const,
      xKey: "title",
      yKey: level,
      yName: levelInfo[level].label,
      stacked: true,
      fill: levelInfo[level].colour,
      cornerRadius: 4,
    })),
    axes: [
      { type: "category", position: "left" },
      {
        type: "number",
        position: "bottom",
        min: 0,
        max: 100,
        label: { formatter: (params: { value: number }) => `${params.value}%` },
      },
    ],
    legend: { position: "bottom" },
  };

  // 2. Which levels are people trying?
  const levelOptions: AgChartOptions = {
    data: stats.perLevel,
    height: 320,
    series: [
      {
        type: "donut",
        angleKey: "attempts",
        legendItemKey: "level",
        sectorLabelKey: "attempts",
        innerRadiusRatio: 0.6,
        fills: levelColours,
        sectorLabel: { color: "#ffffff", fontWeight: "bold" },
      },
    ],
    legend: { position: "bottom" },
  };

  // 3. How many questions do people get right per attempt?
  const distributionOptions: AgChartOptions = {
    data: stats.scoreDistribution,
    height: 320,
    series: [{ type: "bar", xKey: "label", yKey: "count", yName: "Attempts", fill: SUNNY, cornerRadius: 6 }],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left", title: { text: "Attempts" } },
    ],
    legend: { enabled: false },
  };

  // 4. Average score by level
  const levelScoreOptions: AgChartOptions = {
    data: stats.perLevel.map((l, i) => ({ ...l, colour: levelColours[i] })),
    height: 320,
    series: [
      {
        type: "bar",
        xKey: "level",
        yKey: "avgPct",
        yName: "Average score",
        cornerRadius: 6,
        itemStyler: (params: { datum: { colour: string } }) => ({ fill: params.datum.colour }),
      },
    ],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left", min: 0, max: 100, label: { formatter: (p: { value: number }) => `${p.value}%` } },
    ],
    legend: { enabled: false },
  };

  // 5. Attempts over the last two weeks
  const timelineOptions: AgChartOptions = {
    data: stats.last14Days,
    height: 300,
    series: [
      {
        type: "line",
        xKey: "day",
        yKey: "attempts",
        yName: "Attempts",
        stroke: INK,
        strokeWidth: 2,
        marker: { fill: "#facc15", stroke: INK, size: 9 },
      },
    ],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left", min: 0 },
    ],
    legend: { enabled: false },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <Card title="Average score per test" subtitle="Shorter bar = harder test (or fewer brave souls).">
          <AgCharts options={perTestOptions} />
        </Card>
      </div>
      <Card title="Attempts by level" subtitle="Where are people spending their time?">
        <AgCharts options={levelOptions} />
      </Card>
      <Card title="Average score by level" subtitle="Does advanced actually feel advanced?">
        <AgCharts options={levelScoreOptions} />
      </Card>
      <Card title="How many right per attempt" subtitle="Out of 4 questions per test.">
        <AgCharts options={distributionOptions} />
      </Card>
      <Card title="Attempts over the last 14 days" subtitle="Busy days and quiet days.">
        <AgCharts options={timelineOptions} />
      </Card>
    </div>
  );
}
