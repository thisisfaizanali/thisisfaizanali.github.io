import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading eyebrow="Stack" title="What I reach for." aside="Listed, not badged" italicFrom={3} />

      <dl className="divide-y divide-rule border-y border-rule">
        {stack.map((row, i) => (
          <Reveal key={row.group} delay={i * 0.04}>
            <div className="group grid gap-3 py-6 transition-colors duration-500 hover:bg-paper-raised md:grid-cols-12 md:gap-10">
              <dt className="label transition-colors duration-300 group-hover:text-ink md:col-span-3 md:pt-1 md:pl-2">
                {row.group}
              </dt>
              <dd className="md:col-span-9 md:pr-2">
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {row.items.map((item, j) => (
                    <li
                      key={item}
                      style={{ transitionDelay: `${j * 22}ms` }}
                      className="text-ink-muted transition-colors duration-300 group-hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
