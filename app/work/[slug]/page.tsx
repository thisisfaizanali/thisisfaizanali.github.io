import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { profile, projects } from "@/lib/content";

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

/** Screenshots sit on a raised card, in full colour: the card is the frame, so
 *  the image needs no overlay or border treatment of its own. */
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
    <figure>
      <div className="card overflow-hidden">
        <div className="relative aspect-[19/10]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 76rem, 100vw"
            className="object-cover object-left-top"
            priority={priority}
          />
        </div>
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
      <div className="shell pt-10 md:pt-14">
        <Link href="/#work" className="sweep-out text-[0.95rem] font-medium text-ink-muted">
          All work
        </Link>

        <header className="mt-8">
          <p className="label">
            Case study {project.index} of {total}
          </p>
          <h1 className="mt-3 text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[1.02]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">{project.summary}</p>

          <dl className="card mt-10 grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-8">
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-1.5 text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1.5 text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="label">Stack</dt>
              <dd className="mt-1.5 text-ink">{project.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="label">Links</dt>
              <dd className="mt-1.5 flex flex-col gap-1.5 text-ink">
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
        <Reveal className="md:col-span-4">
          <h2 className="text-[clamp(1.75rem,2.5vw,2.25rem)]">
            <span className="label mr-3 align-middle">01</span>Problem
          </h2>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.05}>
          <p className="text-xl leading-snug text-ink md:text-2xl">{project.problem}</p>
        </Reveal>

        <Reveal className="md:col-span-4">
          <h2 className="text-[clamp(1.75rem,2.5vw,2.25rem)]">
            <span className="label mr-3 align-middle">02</span>Build
          </h2>
        </Reveal>
        <div className="space-y-10 md:col-span-8">
          {project.build.map((b, i) => (
            <Reveal key={b.heading} delay={i * 0.05}>
              <div>
                <h3 className="text-xl">{b.heading}</h3>
                <p className="mt-3 max-w-[65ch] text-ink-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="md:col-span-12">
          <Figure
            src={project.images[1]}
            alt={`${project.title}, additional view`}
            index="02"
            caption={`${project.title}, additional view`}
          />
        </Reveal>

        <Reveal className="md:col-span-4">
          <h2 className="text-[clamp(1.75rem,2.5vw,2.25rem)]">
            <span className="label mr-3 align-middle">03</span>Decisions and tradeoffs
          </h2>
        </Reveal>
        <div className="md:col-span-8">
          <dl className="space-y-4">
            {project.decisions.map((d, i) => (
              <Reveal key={d.call} delay={i * 0.05}>
                <div className="card p-6">
                  <dt className="font-medium text-ink">{d.call}</dt>
                  <dd className="mt-2 text-ink-muted">{d.why}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell mt-24">
        <div className="card card-lift flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="label">Next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="sweep mt-2 block text-[min(2rem,calc((100vw-7rem)/8.8))] font-semibold sm:text-[clamp(2rem,4.5vw,3.5rem)] leading-tight"
            >
              {next.title}
            </Link>
          </div>
          <a href={`mailto:${profile.email}`} className="pill btn-primary w-fit">
            <span className="cap" aria-hidden />
            Email me
          </a>
        </div>
      </div>
    </article>
  );
}
