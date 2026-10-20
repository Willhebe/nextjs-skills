import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

// next/font downloads the font at build time and self-hosts it - no Google request from the browser
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: {
    template: "%s | Will's Next.js Playground",
    default: "Will's Next.js Playground",
  },
  description: "Multiple choice tests on Next.js, from beginner to advanced - plus stats on how everyone did.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={nunito.variable}>
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <NavBar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-sunny-200 py-6 text-center text-sm text-stone-500">
          Built by Will with Next.js, Tailwind and AG Charts. Mistakes are all mine.
        </footer>
      </body>
    </html>
  );
}
