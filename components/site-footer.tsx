import { profile } from "@/lib/content";

const elsewhere = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "Résumé", href: profile.links.resume },
];

export function SiteFooter() {
  return (
    <footer className="rule-bar">
      <div className="shell py-14 md:py-20">
        <p
          aria-hidden
          className="font-display whitespace-nowrap text-[clamp(3.5rem,13vw,11rem)] uppercase leading-[0.9]"
        >
          Faizan Ali
        </p>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-out text-sm font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label">
            © {new Date().getFullYear()} {profile.name}, {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
