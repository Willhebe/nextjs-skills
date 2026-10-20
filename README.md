# Will's Next.js Playground

Live at https://nextjs-skills.vercel.app/
A three-page Next.js site: multiple choice tests on Next.js (beginner → advanced), a stats page with AG Charts, and an About page.

## Run it locally

```bash
pnpm install
# (sharp and Tailwind build scripts are pre-approved in package.json, so no approve-builds dance)
pnpm dev
```

Then open http://localhost:3000.

Without a database, results are saved to `.data/results.json`, so you can try everything straight away.

## Hook up Neon (shared stats for everyone)

1. Make a project at https://neon.tech and copy the connection string.
2. Copy `.env.example` to `.env.local` and paste it in as `DATABASE_URL`.
3. Restart `pnpm dev`. The `quiz_results` table gets created automatically the first time it's needed (or run `db/schema.sql` yourself in the Neon SQL editor).

## Deploy to Vercel

1. Push to GitHub and import the repo on Vercel.
2. Add `DATABASE_URL` under Project → Settings → Environment Variables (or add Neon from the Vercel Storage tab, which sets it up for you).
3. Deploy.

> On Vercel you need the database: the file fallback can't persist there.

## What's where

| Path | What it does | Next.js idea it shows |
| --- | --- | --- |
| `app/layout.tsx` | Root layout, menu, footer, font | Layouts, `next/font`, metadata templates |
| `components/NavBar.tsx` | Top menu with the active page highlighted | Client Component, `usePathname`, `<Link>` |
| `app/page.tsx` | **Test skills** - lists all 18 quizzes | Server Component |
| `app/test/[testId]/page.tsx` | One quiz | Dynamic route, `generateStaticParams`, `generateMetadata`, `notFound()` |
| `components/Quiz.tsx` | The quiz itself | `useState`, posting to an API |
| `lib/quizzes.ts` | All the questions - edit these to add your own | Plain TypeScript data |
| `app/api/results/route.ts` | Saves results (and marks them on the server) | Route handler (`GET` / `POST`) |
| `lib/db.ts` | Neon Postgres, or a local JSON file | `server-only`, env vars |
| `app/stats/page.tsx` | **Stats** - reads the DB directly | Async Server Component, `force-dynamic` |
| `components/StatsCharts.tsx` | The AG Charts | `ag-charts-react`, lazy-loaded with `next/dynamic` |
| `app/about/page.tsx` | **About the author** | Static page |

## Adding a question

Open `lib/quizzes.ts`, find a quiz and add another `q(...)` line:

```ts
q("Question text?", ["Option A", "Option B", "Option C", "Option D"], 2, "Why C is right."),
```

The number is the index of the right answer (0 = A, 1 = B, 2 = C, 3 = D).
