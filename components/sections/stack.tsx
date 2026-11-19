import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="What I reach for." />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((row, i) => (
          <Reveal key={row.group} delay={i * 0.04}>
            <div className="card h-full p-6">
              <h3 className="text-lg">{row.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {row.items.map((item) => (
                  <li key={item} className="rounded-md bg-paper-raised px-2.5 py-1 text-sm text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
