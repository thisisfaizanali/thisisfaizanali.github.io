import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on shipping production software: interfaces, APIs, and everything between.",
  alternates: { canonical: "/blog" },
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="shell pt-10 pb-24 md:pt-14">
      <p className="label">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      <h1 className="mt-3 text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[1.02]">Notes.</h1>

      {posts.length === 0 ? (
        <p className="mt-12 text-ink-muted">Nothing published yet. Check back soon.</p>
      ) : (
        <ul className="mt-12 space-y-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05} as="li">
              <Link
                href={`/blog/${post.slug}`}
                className="card group block p-6 transition-shadow duration-200 hover:shadow-[var(--shadow-lift),inset_0_1px_0_var(--hi)] md:p-8"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight decoration-accent decoration-[1.5px] underline-offset-[0.2em] group-hover:underline">
                    {post.title}
                  </h2>
                  <time dateTime={post.date} className="label shrink-0">
                    {dateFormatter.format(new Date(post.date))}
                  </time>
                </div>
                <p className="mt-3 max-w-2xl text-ink-muted">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
