import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-extrabold">404 - well, this is awkward</h1>
      <p className="mt-3 text-stone-600">That page has wandered off. Probably out for a run.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-ink px-5 py-2 font-semibold text-sunny-300">
        Back to the tests
      </Link>
    </div>
  );
}
