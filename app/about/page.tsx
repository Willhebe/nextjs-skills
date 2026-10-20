import type { Metadata } from "next";

export const metadata: Metadata = { title: "About the author" };

const WORDPRESS = "https://willsyellowwebsite.wordpress.com/";
const EMAIL = "wgdb198@yahoo.com";

const links = [
  { label: "Will's Yellow Website", href: WORDPRESS, note: "My blog - running, games, coding and whatever else" },
  { label: "Programming diary", href: `${WORDPRESS}programming-diary/`, note: "The warts-and-all log of what I'm learning" },
  { label: "Portfolio", href: `${WORDPRESS}portfolio/`, note: "Things I've built so far" },
  { label: "GitHub", href: "https://github.com/Willhebe", note: "Where the code lives" },
  { label: "itch.io", href: "https://willhebe.itch.io/", note: "My Godot games" },
];

const stack = ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "AG Charts", "Neon Postgres", "Vercel"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-extrabold tracking-tight">Hiya, I&apos;m Will</h1>

      <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-700">
        <p>
          I&apos;m a UK-based hobby programmer slowly (and sometimes not so slowly) building up a portfolio. I
          don&apos;t do this for a living - I just really enjoy making things and figuring out how they work.
        </p>
        <p>
          My coding journey started with Python and game jams. I made a game called <em>Tower</em> in Godot for
          Godot Wild Jam 73 (it wasn&apos;t quite playable by the deadline, but I kept going with it afterwards),
          plus a little mental arithmetic game. I also had a go at Unity for GitHub&apos;s Game Off with a game
          about voles. Yes, voles.
        </p>
        <p>
          In 2026 I turned my attention to the web: Next.js courses on Codefinity, wrestling with databases (Vercel
          Postgres, then Neon), and deploying things to Vercel. I keep a Brilliant.org streak going for algorithms
          and maths too, and I&apos;ve been experimenting with AI coding helpers to see how much faster I can learn.
        </p>
        <p>
          When I&apos;m not at the keyboard I&apos;m usually running. I&apos;m a member of Hardley Runners, a parkrun
          regular, and I&apos;ve done a fair few marathons. I even built a{" "}
          <a href="https://hardley.vercel.app/" className="font-semibold underline decoration-sunny-400 decoration-4 underline-offset-2">
            running club stats site
          </a>{" "}
          with AG Charts - which is exactly why the charts on this site use it too.
        </p>
      </div>

      <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold">Why this site?</h2>
        <p className="mt-2 text-stone-700">
          The best way to learn something is to build with it - and the second best way is to write quiz questions
          about it. So this site is both: a place to test your Next.js knowledge, and a showcase of the bits I&apos;ve
          learned along the way (server components, dynamic routes, route handlers, a real database and some charts).
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li key={item} className="rounded-full bg-sunny-100 px-3 py-1 text-sm font-semibold">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl bg-sunny-400 p-6">
        <h2 className="text-2xl font-extrabold">Say hello</h2>
        <p className="mt-2">
          Spotted a dodgy quiz answer? Got an idea for a question? Just fancy a chat about running or code? Drop me a
          line:
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-4 inline-block rounded-full bg-ink px-5 py-2 font-semibold text-sunny-300 hover:bg-stone-800"
        >
          {EMAIL}
        </a>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-extrabold">Find me elsewhere</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border-2 border-sunny-200 bg-white p-4 transition hover:border-sunny-400"
              >
                <span className="font-bold">{link.label} ↗</span>
                <span className="block text-sm text-stone-500">{link.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
