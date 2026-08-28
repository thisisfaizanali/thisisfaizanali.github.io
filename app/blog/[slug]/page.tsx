import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
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
      <div className="shell pt-12 md:pt-16">
        <div className="rise" style={{ animationDelay: "0.05s" }}>
          <Link href="/blog" className="label sweep inline-flex items-center gap-2 hover:text-ink">
            <ArrowLeft className="size-3" strokeWidth={1.5} aria-hidden /> All posts
          </Link>
        </div>

        <header className="mt-8 border-b border-rule pb-10">
          <time dateTime={post.date} className="label">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h1 className="mt-4 font-serif display-lg">
            <span className="mask-clip">
              <span className="mask-up" style={{ animationDelay: "0.1s" }}>
                {post.title}
              </span>
            </span>
          </h1>
        </header>
      </div>

      <Reveal className="shell prose-post mt-14 max-w-3xl" delay={0.1}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ ref: _ref, ...props }) => <a {...props} className="sweep text-ink" />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </Reveal>
    </article>
  );
}
