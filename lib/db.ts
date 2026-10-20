import "server-only";
import { neon } from "@neondatabase/serverless";
import { promises as fs } from "fs";
import path from "path";
import type { Level, QuizResult } from "./types";

/*
 * Where do results get stored?
 *  - DATABASE_URL set (e.g. on Vercel with Neon) -> Neon Postgres, shared by everyone
 *  - no DATABASE_URL (local dev)                 -> .data/results.json on your machine
 */

const useNeon = Boolean(process.env.DATABASE_URL);

// ------------------------------------------------------------------ Neon

let tableReady: Promise<void> | null = null;

function sql() {
  return neon(process.env.DATABASE_URL as string);
}

// Create the table the first time we need it, so there's no separate setup step
function ensureTable(): Promise<void> {
  if (!tableReady) {
    tableReady = (async () => {
      await sql()`
        CREATE TABLE IF NOT EXISTS quiz_results (
          id          SERIAL PRIMARY KEY,
          test_id     TEXT        NOT NULL,
          level       TEXT        NOT NULL,
          score       INTEGER     NOT NULL,
          total       INTEGER     NOT NULL,
          answers     JSONB       NOT NULL DEFAULT '[]',
          created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;
    })().catch((err) => {
      tableReady = null; // try again next time
      throw err;
    });
  }
  return tableReady;
}

// ------------------------------------------------------------ local file

const FILE = path.join(process.cwd(), ".data", "results.json");
let memoryFallback: QuizResult[] | null = null; // used if the file system is read-only

async function readFile(): Promise<QuizResult[]> {
  if (memoryFallback) return memoryFallback;
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as QuizResult[];
  } catch {
    return [];
  }
}

async function writeFile(results: QuizResult[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(results, null, 2));
  } catch {
    memoryFallback = results;
  }
}

// ---------------------------------------------------------------- public

export async function saveResult(result: Omit<QuizResult, "createdAt">): Promise<void> {
  if (useNeon) {
    await ensureTable();
    await sql()`
      INSERT INTO quiz_results (test_id, level, score, total, answers)
      VALUES (${result.testId}, ${result.level}, ${result.score}, ${result.total}, ${JSON.stringify(result.answers)}::jsonb)`;
    return;
  }
  const results = await readFile();
  results.push({ ...result, createdAt: new Date().toISOString() });
  await writeFile(results);
}

export async function getResults(): Promise<QuizResult[]> {
  if (useNeon) {
    await ensureTable();
    const rows = await sql()`
      SELECT test_id, level, score, total, answers, created_at
      FROM quiz_results
      ORDER BY created_at DESC
      LIMIT 10000`;
    return (rows as Record<string, unknown>[]).map((row) => ({
      testId: String(row.test_id),
      level: row.level as Level,
      score: Number(row.score),
      total: Number(row.total),
      answers: Array.isArray(row.answers) ? (row.answers as boolean[]) : [],
      createdAt: new Date(row.created_at as string).toISOString(),
    }));
  }
  return readFile();
}
