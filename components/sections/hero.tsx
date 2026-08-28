import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/lib/content";

// Entrance is CSS-driven: the hero must render without waiting for hydration.
export function Hero() {
  return (
    <section id="top" className="shell relative pt-20 pb-24 md:pt-32 md:pb-36">
      <div className="rise flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        <span className="label">Open to frontend roles — {profile.location}</span>
      </div>

      <h1 className="mt-10 font-serif display-xl">
        <span className="mask-clip">
          <span className="mask-up whitespace-nowrap" style={{ animationDelay: "0.1s" }}>
            Faizan <span className="italic">Ali</span>
          </span>
        </span>
      </h1>

      <div
        className="rise mt-6 flex items-center gap-4"
        style={{ animationDelay: "0.26s" }}
      >
        <span className="h-px w-12 bg-rule-strong md:w-20" aria-hidden />
        <span className="label">Frontend Engineer</span>
      </div>

      <div className="mt-14 grid gap-10 border-t border-rule pt-8 md:grid-cols-12">
        <div className="rise md:col-span-7 lg:col-span-6" style={{ animationDelay: "0.36s" }}>
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

        <div className="rise md:col-span-5 md:col-start-9" style={{ animationDelay: "0.46s" }}>
          <dl className="space-y-4">
            {[
              ["Now", "Available for new work"],
              ["Focus", "React · Next.js · TypeScript"],
              ["Based in", profile.location],
            ].map(([k, v]) => (
              <div
                key={k}
                className="group flex justify-between gap-6 border-b border-rule pb-3 transition-colors duration-300 hover:border-rule-strong"
              >
                <dt className="label transition-colors duration-300 group-hover:text-ink">{k}</dt>
                <dd className="text-right text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
