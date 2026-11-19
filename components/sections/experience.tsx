import { SectionHeading } from "@/components/section-heading";
import { education, experience } from "@/lib/content";

const row = "grid gap-6 border-b border-rule py-8 first:pt-0 md:grid-cols-12 md:gap-10";
const bullet =
  "relative pl-5 text-ink-muted before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:bg-ink";

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="Where have you worked?" />

      <ol>
        {experience.map((job) => (
          <li key={job.company} className={row}>
            <div className="md:col-span-4">
              <h3 className="text-[clamp(1.75rem,2.5vw,2.25rem)] leading-none">{job.company}</h3>
              <p className="mt-2 font-medium text-ink">{job.role}</p>
              <p className="figure mt-3 text-sm text-ink-muted">
                {job.from} to {job.to}
              </p>
              <p className="label mt-1">{job.mode}</p>
            </div>
            <ul className="space-y-3 md:col-span-8">
              {job.points.map((point) => (
                <li key={point} className={bullet}>
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}

        <li className={row}>
          <div className="md:col-span-4">
            <h3 className="text-[clamp(1.75rem,2.5vw,2.25rem)] leading-none">{education.school}</h3>
            <p className="mt-2 font-medium text-ink">{education.degree}</p>
            <p className="figure mt-3 text-sm text-ink-muted">
              {education.from} to {education.to}
            </p>
            <p className="label mt-1">{education.place}</p>
          </div>
          <ul className="space-y-3 md:col-span-8">
            {education.points.map((point) => (
              <li key={point} className={bullet}>
                {point}
              </li>
            ))}
          </ul>
        </li>
      </ol>
    </section>
  );
}
