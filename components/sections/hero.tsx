import Image from "next/image";
import Link from "next/link";
import { profile, projects } from "@/lib/content";

export function Hero() {
  const lead = projects[0];

  return (
    <section
      id="top"
      className="shell grid items-center gap-12 pb-20 pt-10 md:grid-cols-12 md:gap-10 md:pb-28 md:pt-16"
    >
      <div className="md:col-span-6">
        <h1 className="text-[clamp(2.75rem,5.6vw,4.75rem)] font-medium leading-[1.03]">
          {profile.statement}
        </h1>
        <p className="mt-6 max-w-[32ch] text-lg text-ink-muted md:text-xl">{profile.lead}</p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a href={`mailto:${profile.email}`} className="pill btn-primary">
            <span className="cap" aria-hidden />
            Email me
          </a>
          <Link href="#work" className="btn-secondary">
            See the work
          </Link>
        </div>
      </div>

      <div className="relative md:col-span-6">
        <div aria-hidden className="ledger-rules pointer-events-none absolute -inset-10 -z-10" />
        <Link
          href={`/work/${lead.slug}`}
          aria-label={`${lead.title} case study`}
          className="card card-lift group relative block overflow-hidden"
        >
          <div className="relative aspect-[16/11]">
            <Image
              src={lead.images[0]}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-left-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          </div>
        </Link>
        <span className="pill absolute bottom-4 right-4 px-4 py-2 text-sm">
          {lead.title}, {lead.year}
        </span>
      </div>
    </section>
  );
}
