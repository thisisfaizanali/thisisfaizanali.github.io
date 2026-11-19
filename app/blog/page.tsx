import Link from "next/link";
import type { Metadata } from "next";
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
    <div className="shell pt-12 pb-24 md:pt-16">
      <div className="rule-bar pt-6">
        <p className="figure text-sm text-ink-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        <h1 className="mt-4 text-[clamp(3rem,8vw,7rem)] leading-none">Notes.</h1>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-ink-muted">Nothing published yet. Check back soon.</p>
      ) : (
        <ul className="mt-14 border-t-[3px] border-ink">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-rule">
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight decoration-accent decoration-2 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                    {post.title}
                  </h2>
                  <time dateTime={post.date} className="figure shrink-0 text-sm text-ink-muted">
                    {dateFormatter.format(new Date(post.date))}
                  </time>
                </div>
                <p className="mt-3 max-w-2xl text-ink-muted">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
