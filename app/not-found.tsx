import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-24">
      <h1 className="text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[1.02]">
        That page isn&rsquo;t here.
      </h1>
      <p className="mt-6 max-w-md text-ink-muted">
        The link may be old, or I may have moved something. The work is all on the home page.
      </p>
      <Link href="/" className="pill btn-primary mt-8 w-fit">
        <span className="cap" aria-hidden />
        Back to the start
      </Link>
    </section>
  );
}
