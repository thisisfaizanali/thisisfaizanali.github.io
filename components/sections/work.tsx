import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";

export function Work() {
  const [lead, ...rest] = projects;

  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="What have you built?" />

      <article className="plate group grid md:grid-cols-12">
        <Link
          href={`/work/${lead.slug}`}
          aria-label={`${lead.title} case study`}
          className="photo-frame block aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-full"
        >
          <Image
            src={lead.images[0]}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="photo-bw photo-reveal object-cover object-left-top"
          />
        </Link>

        <div className="flex flex-col gap-5 p-6 md:col-span-5 md:p-8">
          <p className="figure text-sm text-ink-muted">
            {lead.index}, {lead.year}
          </p>
          <h3 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-none">
            <Link href={`/work/${lead.slug}`} className="sweep">
              {lead.title}
            </Link>
          </h3>
          <p className="text-ink">{lead.tagline}</p>
          <p className="text-ink-muted">{lead.summary}</p>
          <p className="label">{lead.stack.join(", ")}</p>

          <div>
            <p className="label">Calls made</p>
            <ul className="mt-2 border-t border-rule">
              {lead.decisions.map((d) => (
                <li key={d.call} className="border-b border-rule py-2.5 text-sm text-ink">
                  {d.call}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
            <Link href={`/work/${lead.slug}`} className="sweep-out font-medium">
              Read the case study
            </Link>
            <a href={lead.live} target="_blank" rel="noopener noreferrer" className="sweep-out text-sm">
              Live site<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={lead.repo} target="_blank" rel="noopener noreferrer" className="sweep-out text-sm">
              Code<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </article>

      {rest.length ? (
        <ul className="rule-bar mt-16 md:mt-20">
          {rest.map((p) => (
            <li
              key={p.slug}
              className="group grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-x-6 gap-y-2 border-b border-rule py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.2fr)_10rem] md:gap-x-8"
            >
              <span className="figure hidden text-sm text-ink-muted md:block">{p.index}</span>
              <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none">
                <Link href={`/work/${p.slug}`} className="sweep">
                  {p.title}
                </Link>
              </h3>
              <div className="col-span-2 md:col-span-1">
                <p className="text-ink-muted">{p.tagline}</p>
                <p className="mt-2 flex flex-wrap gap-x-5 text-sm">
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="sweep-out">
                    Live site<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="sweep-out">
                    Code<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
              <Link
                href={`/work/${p.slug}`}
                aria-label={`${p.title} case study`}
                className="photo-frame relative col-start-2 row-start-1 block aspect-[16/10] md:col-auto md:row-auto"
              >
                <Image
                  src={p.images[0]}
                  alt=""
                  fill
                  sizes="10rem"
                  className="photo-bw photo-reveal object-cover object-left-top"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
