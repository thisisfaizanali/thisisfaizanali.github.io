import { profile } from "@/lib/content";

const elsewhere = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "Résumé", href: profile.links.resume },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {profile.name} — {profile.location}
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {elsewhere.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label sweep hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
