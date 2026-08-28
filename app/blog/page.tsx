import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on shipping production software — interfaces, APIs, and everything between.",
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
    <div className="shell pt-12 pb-24 md:pt-16">
      <div
        className="rise flex items-baseline gap-3 border-b border-rule pb-5"
        style={{ animationDelay: "0.05s" }}
      >
        <span className="font-mono text-sm text-ink-faint tabular-nums">
          {String(posts.length).padStart(2, "0")}
          <span className="text-ink-faint/60"> posts</span>
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
        <span className="label">§ Blog</span>
      </div>

      <h1 className="mt-10 font-serif display-lg">
        <span className="mask-clip">
          <span className="mask-up" style={{ animationDelay: "0.1s" }}>
            Notes.
          </span>
        </span>
      </h1>

      {posts.length === 0 ? (
        <p className="mt-10 text-ink-muted">Nothing published yet — check back soon.</p>
      ) : (
        <ul className="mt-14 divide-y divide-rule border-y border-rule">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05} as="li">
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <h2 className="sweep-out font-serif text-2xl md:text-3xl">{post.title}</h2>
                  <time dateTime={post.date} className="label shrink-0 text-ink-faint">
                    {dateFormatter.format(new Date(post.date))}
                  </time>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
