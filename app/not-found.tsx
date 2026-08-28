import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <span className="label">404</span>
      <h1 className="mt-4 font-serif display-lg">
        That page isn&rsquo;t <span className="italic">here.</span>
      </h1>
      <p className="mt-6 max-w-md text-ink-muted">
        The link may be old, or I may have moved something. The work is all on the home page.
      </p>
      <Link href="/" className="mt-8 w-fit font-medium sweep-out">
        Back to the start
      </Link>
    </section>
  );
}
