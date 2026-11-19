import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { achievements, profile } from "@/lib/content";

export function About() {
  const [top, ...more] = achievements;

  return (
    <section id="about" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="Interfaces, and the parts nobody demos." />

      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-7">
          <p className="text-xl text-ink md:text-2xl md:leading-snug">{profile.positioning}</p>
          <div className="mt-8 space-y-6 text-lg text-ink-muted">
            <p>
              I spent the last year on a production SaaS app, which is a fast way to learn that
              the interesting part of product work is not the happy path. It is the empty state
              nobody specced, the token that expires mid-request, the table that has to stay
              usable at 4,000 rows and at zero.
            </p>
            <p>
              Most of what I did there was reduce variance: one component library instead of
              forty bespoke modals, one set of loading and error conventions instead of whatever
              each route felt like doing. Boring, and it made every feature after it faster to
              ship.
            </p>
            <p>
              Away from product work I solve algorithm problems, which has been the other half of
              my education: it is where I learned to reach for the right structure before writing
              the clever line.
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <div className="card card-lift p-8">
            <p className="font-figure text-[clamp(5.5rem,11vw,9rem)] leading-none text-ink">
              {top.figure}
            </p>
            <p className="mt-5 text-lg font-medium text-ink">{top.label}</p>
            <p className="label mt-1">{top.note}</p>
          </div>
          <ul className="mt-6 space-y-3">
            {more.map((a) => (
              <li key={a.label} className="card flex items-baseline gap-5 px-6 py-5">
                <p className="w-24 shrink-0 text-2xl font-semibold text-ink">{a.figure}</p>
                <div>
                  <p className="font-medium text-ink">{a.label}</p>
                  <p className="label mt-0.5">{a.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
