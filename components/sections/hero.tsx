import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/lib/content";

// The hero reads as a drawing title block, not a centered name card. Entrance
// is CSS-driven throughout: the section must render without waiting for
// hydration, so every reveal here uses the .rise/.mask-up utilities rather
// than a scroll-gated Reveal/whileInView.
const titleBlock = [
  ["Project", "Portfolio"],
  ["Subject", profile.name],
  ["Discipline", "Frontend Engineering"],
  ["Location", profile.location],
  ["Status", profile.available ? "Open to roles" : "Currently engaged"],
  ["Sheet", "00 / 05"],
  ["Issued", "2026"],
] as const;

export function Hero() {
  return (
    <section id="top" className="shell relative pt-20 pb-24 md:pt-28 md:pb-36">
      <div className="rise flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        <span className="label">Open to frontend roles — {profile.location}</span>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left-weighted focal column: sheet number, name, lead, CTA. */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-6">
            <span
              aria-hidden
              className="rise font-mono text-sm text-ink-faint md:mt-3 md:text-2xl lg:text-3xl"
              style={{ animationDelay: "0.08s" }}
            >
              00
            </span>
            <h1 className="font-serif display-xl">
              <span className="mask-clip">
                <span className="mask-up whitespace-nowrap" style={{ animationDelay: "0.1s" }}>
                  Faizan <span className="italic">Ali</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="rise mt-6 flex items-center gap-4" style={{ animationDelay: "0.26s" }}>
            <span className="h-px w-12 bg-rule-strong md:w-20" aria-hidden />
            <span className="label">Frontend Engineer</span>
          </div>

          <div className="rise mt-8 max-w-lg" style={{ animationDelay: "0.36s" }}>
            <p className="text-lg leading-relaxed text-ink-muted md:text-xl">{profile.positioning}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3">
              <Magnetic strength={0.28}>
                <Link href="#work" className="group inline-flex items-center gap-2 text-ink">
                  <span className="sweep-out font-medium">See selected work</span>
                  <ArrowDownRight
                    className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:translate-y-1"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </Link>
              </Magnetic>
              <a href={`mailto:${profile.email}`} className="label sweep hover:text-ink">
                {profile.email}
              </a>
            </div>
          </div>
        </div>

        {/* Title-block: bordered grid of labelled fields, drafting-sheet style. */}
        <div className="rise lg:col-span-5" style={{ animationDelay: "0.3s" }}>
          <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
            {titleBlock.map(([k, v]) => (
              <div
                key={k}
                className="group bg-paper p-4 transition-colors duration-500 hover:bg-paper-raised"
              >
                <p className="label transition-colors duration-300 group-hover:text-ink">{k}</p>
                <p className="mt-1.5 font-mono text-sm text-ink">{v}</p>
              </div>
            ))}
            <div className="flex items-center justify-center bg-paper p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
                F · A
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
