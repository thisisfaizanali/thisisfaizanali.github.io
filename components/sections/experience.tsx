import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { education, experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading eyebrow="Experience" title="Where the work happened." italicFrom={2} />

      <ol className="space-y-16">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.05}>
            <div className="group relative grid gap-6 border-t border-rule pt-8 md:grid-cols-12 md:gap-10">
              {/* Accent rule draws itself across the top on hover. */}
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
              />
              <div className="md:col-span-4">
                <h3 className="font-serif text-2xl leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  {job.company}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{job.role}</p>
                <p className="label mt-4">
                  {job.from} — {job.to} · {job.mode}
                </p>
              </div>
              <ul className="space-y-4 md:col-span-8">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-4 text-ink-muted">
                    <span
                      className="mt-[0.6em] size-1 shrink-0 bg-rule-strong transition-colors duration-500 group-hover:bg-accent"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal as="li">
          <div className="group relative grid gap-6 border-t border-rule pt-8 md:grid-cols-12 md:gap-10">
            <span
              aria-hidden
              className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
            />
            <div className="md:col-span-4">
              <h3 className="font-serif text-2xl leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                {education.school}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{education.degree}</p>
              <p className="label mt-4">
                {education.from} — {education.to} · {education.place}
              </p>
            </div>
          </div>
        </Reveal>
      </ol>
    </section>
  );
}
