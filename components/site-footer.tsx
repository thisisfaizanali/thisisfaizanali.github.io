import Image from "next/image";
import { profile } from "@/lib/content";

const elsewhere = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "Résumé", href: profile.links.resume },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/portrait-v2.jpg"
            alt=""
            width={32}
            height={32}
            className="avatar size-8"
          />
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="label">Full-stack engineer, {profile.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-out text-[0.95rem] font-medium text-ink-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
