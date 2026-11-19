import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

/** The product prints black and white like every picture on the site and shows its colours when pointed at. */
function Figure({
  src,
  alt,
  index,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  index: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="group">
      <div className="photo-frame relative aspect-[19/10]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 76rem, 100vw"
          className="photo-bw photo-reveal object-cover object-left-top"
          priority={priority}
        />
      </div>
      <figcaption className="label mt-3">
        Fig. {index}, {caption}
      </figcaption>
    </figure>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const total = String(projects.length).padStart(2, "0");

  return (
    <article className="pb-24">
      <div className="shell pt-12 md:pt-16">
        <Link href="/#work" className="sweep-out text-sm font-medium">
          All work
        </Link>

        <header className="rule-bar mt-8 pt-6">
          <p className="figure text-sm text-ink-muted">
            Case study {project.index} of {total}
          </p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,7rem)] leading-none">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">{project.summary}</p>

          <dl className="mt-10 grid gap-[2px] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-paper p-4">
              <dt className="label">Year</dt>
              <dd className="figure mt-1.5 text-sm text-ink">{project.year}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="label">Role</dt>
              <dd className="mt-1.5 text-sm text-ink">{project.role}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="label">Stack</dt>
              <dd className="mt-1.5 text-sm text-ink">{project.stack.join(", ")}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="label">Links</dt>
              <dd className="mt-1.5 flex flex-col gap-2 text-sm text-ink">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-out w-fit"
                >
                  Live site<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-out w-fit"
                >
                  Source<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </header>
      </div>

      <div className="shell mt-12">
        <Figure
          src={project.images[0]}
          alt={`${project.title} interface`}
          index="01"
          caption={`${project.title} interface`}
          priority
        />
      </div>

      <div className="shell mt-20 grid gap-x-14 gap-y-16 md:grid-cols-12">
        <h2 className="text-[clamp(1.75rem,2.5vw,2.5rem)] leading-none md:col-span-4">
          <span className="figure mr-3 align-top text-base text-ink-muted">01</span>Problem
        </h2>
        <p className="text-xl leading-snug text-ink md:col-span-8 md:text-2xl">{project.problem}</p>

        <h2 className="text-[clamp(1.75rem,2.5vw,2.5rem)] leading-none md:col-span-4">
          <span className="figure mr-3 align-top text-base text-ink-muted">02</span>Build
        </h2>
        <div className="space-y-12 md:col-span-8">
          {project.build.map((b) => (
            <div key={b.heading}>
              <h3 className="text-2xl">{b.heading}</h3>
              <p className="mt-3 text-ink-muted">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-12">
          <Figure
            src={project.images[1]}
            alt={`${project.title}, additional view`}
            index="02"
            caption={`${project.title}, additional view`}
          />
        </div>

        <h2 className="text-[clamp(1.75rem,2.5vw,2.5rem)] leading-none md:col-span-4">
          <span className="figure mr-3 align-top text-base text-ink-muted">03</span>Decisions and
          tradeoffs
        </h2>
        <dl className="rule-bar md:col-span-8">
          {project.decisions.map((d) => (
            <div key={d.call} className="border-b border-rule py-6">
              <dt className="font-medium text-ink">{d.call}</dt>
              <dd className="mt-2 text-ink-muted">{d.why}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="shell rule-bar mt-24 flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Next case study</p>
          <Link
            href={`/work/${next.slug}`}
            className="sweep mt-3 block font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none"
          >
            {next.title}
          </Link>
        </div>
        <Link href="/#contact" className="btn btn-secondary w-fit">
          Get in touch
        </Link>
      </div>
    </article>
  );
}
