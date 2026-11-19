import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="shell grid min-h-[calc(100svh-5rem)] gap-10 pb-16 pt-12 md:grid-cols-12 md:gap-10 md:pb-20 md:pt-16"
    >
      <div className="flex flex-col justify-end md:col-span-7">
        <p className="label">
          Open to {profile.availability.join(", ").toLowerCase()} work, {profile.location}
        </p>
        <h1 className="mt-6 text-[clamp(2.75rem,6vw,6rem)] leading-none">{profile.statement}</h1>
        <p className="mt-6 max-w-[34ch] text-lg text-ink-muted md:text-xl">{profile.lead}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            Email me
          </a>
          <Link href="#work" className="btn btn-secondary">
            See the work
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-end md:col-span-5">
        <figure>
          <div className="photo-frame relative aspect-[4/5]">
            <Image
              src="/portrait-v2.jpg"
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="photo-bw object-cover object-top"
            />
          </div>
          <figcaption className="label mt-3">
            {profile.name}, {profile.role}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
