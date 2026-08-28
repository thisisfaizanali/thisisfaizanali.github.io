import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CountUp } from "@/components/motion/count-up";
import { achievements, profile } from "@/lib/content";

// Drop a portrait at public/portrait.jpg and it appears. Until then the column
// falls back to a typographic plate rather than a broken image.
const hasPortrait = existsSync(path.join(process.cwd(), "public", "portrait.jpg"));

export function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHeading folio="03" eyebrow="About" title="Interfaces, and the parts nobody demos." italicFrom={3} />

      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden border border-rule bg-paper-raised">
            {hasPortrait ? (
              <Image
                src="/portrait-v2.jpg"
                alt={profile.name}
                fill
                sizes="(min-width: 768px) 32vw, 100vw"
                className="object-cover object-center contrast-[1.04] saturate-[0.9]"
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-6">
                <span className="label">Bengaluru, IN</span>
                <span className="font-serif text-5xl leading-[0.9]">
                  MF
                  <span className="italic">A</span>
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal delay={0.05}>
            <div className="space-y-6 text-lg leading-relaxed text-ink-muted">
              <p>
                I spent the last year on a production SaaS app, which is a fast way to learn that
                the interesting part of frontend is not the happy path. It is the empty state
                nobody specced, the token that expires mid-request, the table that has to stay
                usable at 4,000 rows and at zero.
              </p>
              <p>
                Most of what I did there was reduce variance — one component library instead of
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

          <Reveal className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-3" delay={0.1}>
            {achievements.map((a) => (
              <div
                key={a.label}
                className="group bg-paper p-6 transition-colors duration-500 hover:bg-paper-raised"
              >
                <p className="font-serif text-4xl leading-none transition-colors duration-500 group-hover:text-accent">
                  <CountUp value={a.figure} />
                </p>
                <p className="mt-3 text-sm text-ink">{a.label}</p>
                <p className="label mt-1 normal-case tracking-normal">{a.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
