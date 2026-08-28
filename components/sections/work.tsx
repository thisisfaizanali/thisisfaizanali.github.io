import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectMedia } from "@/components/motion/project-media";
import { projects } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        folio="01"
        eyebrow="Selected work"
        title="Two things worth reading about."
        aside="2025"
        italicFrom={3}
      />

      <ul className="space-y-24 md:space-y-36">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.05}>
            <article className="group grid gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5 lg:col-span-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-ink-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                    {p.index}
                  </span>
                  <h3 className="font-serif display-lg leading-none">
                    <Link href={`/work/${p.slug}`} className="sweep">
                      {p.title}
                    </Link>
                  </h3>
                </div>

                <p className="mt-5 text-ink-muted">{p.tagline}</p>

                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                  {p.stack.map((s, j) => (
                    <li
                      key={s}
                      style={{ transitionDelay: `${j * 28}ms` }}
                      className="border border-rule px-2 py-1 font-mono text-[0.6875rem] text-ink-muted transition-colors duration-300 group-hover:border-rule-strong group-hover:text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link href={`/work/${p.slug}`} className="text-sm font-medium sweep-out">
                    Read the case study
                  </Link>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/l inline-flex items-center gap-1 label sweep hover:text-ink"
                  >
                    Live
                    <ArrowUpRight
                      className="size-3 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </a>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/c inline-flex items-center gap-1 label sweep hover:text-ink"
                  >
                    Code
                    <ArrowUpRight
                      className="size-3 transition-transform duration-300 group-hover/c:translate-x-0.5 group-hover/c:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </a>
                </div>
              </div>

              <div className="md:col-span-7 lg:col-span-8">
                <p className="label mb-3">
                  Fig. {p.index} — {p.title}
                </p>
                <Link href={`/work/${p.slug}`} aria-label={`${p.title} case study`}>
                  <ProjectMedia src={p.images[0]} alt="" priority={i === 0} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
