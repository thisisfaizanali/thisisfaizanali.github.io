import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { education, experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="Where the work happened." />

      <ol className="space-y-16">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.05}>
            <div className="grid gap-6 border-t border-rule pt-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <h3 className="text-2xl">{job.company}</h3>
                <p className="mt-1 text-ink-muted">{job.role}</p>
                <p className="label mt-3">
                  {job.from} to {job.to}
                </p>
                <p className="label">{job.mode}</p>
              </div>
              <ul className="list-disc space-y-3 pl-5 text-ink-muted marker:text-accent md:col-span-8">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal as="li">
          <div className="grid gap-6 border-t border-rule pt-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <h3 className="text-2xl">{education.school}</h3>
              <p className="mt-1 text-ink-muted">{education.degree}</p>
              <p className="label mt-3">
                {education.from} to {education.to}
              </p>
              <p className="label">{education.place}</p>
            </div>
            <ul className="list-disc space-y-3 pl-5 text-ink-muted marker:text-accent md:col-span-8">
              {education.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </ol>
    </section>
  );
}
