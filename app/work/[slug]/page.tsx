import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article className="pb-24">
      {/* Above the fold: CSS-driven so the title and meta are never gated on hydration. */}
      <div className="shell pt-12 md:pt-16">
        <div className="rise" style={{ animationDelay: "0.05s" }}>
          <Link href="/#work" className="inline-flex items-center gap-2 label sweep hover:text-ink">
            <ArrowLeft className="size-3" strokeWidth={1.5} aria-hidden /> All work
          </Link>
        </div>

        <header className="mt-12 border-b border-rule pb-10">
          <h1 className="font-serif display-lg">
            <span className="mask-clip">
              <span className="mask-up" style={{ animationDelay: "0.1s" }}>
                {project.title}
              </span>
            </span>
          </h1>
          <div className="rise" style={{ animationDelay: "0.22s" }}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {project.summary}
            </p>
          </div>

          <div
            className="rise mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              ["Year", project.year],
              ["Role", project.role],
              ["Stack", project.stack.join(" · ")],
            ].map(([k, v]) => (
              <div key={k as string}>
                <p className="label">{k}</p>
                <p className="mt-2 text-sm text-ink">{v}</p>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <p className="label">Links</p>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm sweep-out"
              >
                Live site <ArrowUpRight className="size-3" strokeWidth={1.5} aria-hidden />
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm sweep-out"
              >
                Source <ArrowUpRight className="size-3" strokeWidth={1.5} aria-hidden />
              </a>
            </div>
          </div>
        </header>
      </div>

      <div className="rise shell mt-12" style={{ animationDelay: "0.38s" }}>
        <div className="relative aspect-[19/10] overflow-hidden border border-rule bg-paper-raised">
          <Image
            src={project.images[0]}
            alt={`${project.title} interface`}
            fill
            sizes="(min-width: 1024px) 76rem, 100vw"
            className="object-cover object-left-top"
            priority
          />
        </div>
      </div>

      <div className="shell mt-20 grid gap-x-14 gap-y-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 className="label">The problem</h2>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.05}>
          <p className="font-serif text-2xl leading-snug md:text-3xl">{project.problem}</p>
        </Reveal>

        <Reveal className="md:col-span-4">
          <h2 className="label">What I built</h2>
        </Reveal>
        <div className="space-y-12 md:col-span-8">
          {project.build.map((b, i) => (
            <Reveal key={b.heading} delay={i * 0.05}>
              <h3 className="font-serif text-2xl">{b.heading}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="md:col-span-12">
          <div className="relative aspect-[19/10] overflow-hidden border border-rule bg-paper-raised">
            <Image
              src={project.images[1]}
              alt={`${project.title} — additional view`}
              fill
              sizes="(min-width: 1024px) 76rem, 100vw"
              className="object-cover object-left-top"
            />
          </div>
        </Reveal>

        <Reveal className="md:col-span-4">
          <h2 className="label">Decisions &amp; tradeoffs</h2>
        </Reveal>
        <div className="md:col-span-8">
          <dl className="divide-y divide-rule border-y border-rule">
            {project.decisions.map((d, i) => (
              <Reveal key={d.call} delay={i * 0.05}>
                <div className="py-6">
                  <dt className="font-medium text-ink">{d.call}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-muted">{d.why}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell mt-24 border-t border-rule pt-10">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="label">Next</p>
            <Link href={`/work/${next.slug}`} className="mt-3 block font-serif display-md sweep">
              {next.title}
            </Link>
          </div>
          <Link href="/#contact" className="label sweep hover:text-ink">
            Get in touch
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
