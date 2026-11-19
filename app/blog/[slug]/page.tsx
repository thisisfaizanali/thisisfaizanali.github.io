import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pb-24">
      <div className="shell pt-12 md:pt-16">
        <Link href="/blog" className="sweep-out text-sm font-medium">
          All posts
        </Link>

        <header className="rule-bar mt-8 pt-6">
          <time dateTime={post.date} className="figure text-sm text-ink-muted">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            {post.title}
          </h1>
        </header>
      </div>

      <div className="shell mt-14">
        <div className="prose-post max-w-[65ch]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ ref: _ref, ...props }) => <a {...props} className="sweep-out text-ink" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
