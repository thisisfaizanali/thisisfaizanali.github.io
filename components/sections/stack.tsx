import { SectionHeading } from "@/components/section-heading";
import { stack } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading title="What do you work with?" />

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((row) => (
          <div key={row.group} className="border-t border-rule pt-4">
            <h3 className="text-xl">{row.group}</h3>
            <ul className="mt-4 space-y-1.5 text-ink-muted">
              {row.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
