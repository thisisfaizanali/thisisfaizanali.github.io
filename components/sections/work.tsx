import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="Two things worth reading about." aside="2025" />

      <ul className="space-y-20 md:space-y-28">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug}>
            <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Link
                href={`/work/${p.slug}`}
                aria-label={`${p.title} case study`}
                className={`card block overflow-hidden md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover object-left-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="md:col-span-5">
                <p className="label">{p.index}</p>
                <h3 className="mt-2 text-[clamp(2rem,3.5vw,2.75rem)]">
                  <Link href={`/work/${p.slug}`} className="sweep">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-4 text-lg text-ink-muted">{p.tagline}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md bg-paper-raised px-2.5 py-1 text-sm text-ink-muted">
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={`/work/${p.slug}`} className="sweep-out font-medium">
                    Read the case study
                  </Link>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sweep-out text-ink-muted"
                  >
                    Live site<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sweep-out text-ink-muted"
                  >
                    Code<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
