import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/reveal";
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
      <div className="shell pt-10 md:pt-14">
        <Link href="/blog" className="sweep-out text-[0.95rem] font-medium text-ink-muted">
          All posts
        </Link>

        <header className="mt-8">
          <time dateTime={post.date} className="label">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h1 className="mt-3 max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05]">
            {post.title}
          </h1>
        </header>
      </div>

      <div className="shell mt-12">
        <Reveal className="prose-post max-w-3xl" delay={0.1}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ ref: _ref, ...props }) => <a {...props} className="sweep-out text-accent" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </Reveal>
      </div>
    </article>
  );
}
