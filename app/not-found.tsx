import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24">
      <p className="figure text-sm text-ink-muted">404</p>
      <h1 className="mt-4 text-[clamp(3rem,8vw,7rem)] leading-none">That page isn&rsquo;t here.</h1>
      <p className="mt-6 max-w-md text-ink-muted">
        The link may be old, or I may have moved something. The work is all on the home page.
      </p>
      <Link href="/" className="btn btn-secondary mt-8 w-fit">
        Back to the start
      </Link>
    </section>
  );
}
