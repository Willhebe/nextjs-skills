"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Test skills" },
  { href: "/stats", label: "Stats" },
  { href: "/about", label: "About the author" },
];

export default function NavBar() {
  const pathname = usePathname();

  // The quiz pages live under /test/..., so count them as part of "Test skills"
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/test") : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-10 bg-sunny-400 shadow-sm">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          Will&apos;s Next.js Playground
        </Link>
        <ul className="flex flex-wrap gap-1 text-sm font-semibold">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 transition-colors ${
                  isActive(link.href) ? "bg-ink text-sunny-300" : "hover:bg-sunny-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
