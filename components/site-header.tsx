import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "@/components/nav-link";
import { profile } from "@/lib/content";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="mx-auto flex h-14 w-full max-w-[76rem] items-center justify-between gap-6 border-2 border-ink bg-paper px-4 md:px-5">
        <Link
          href="/#top"
          className="font-display text-xl uppercase leading-none"
          aria-label={`${profile.name}, home`}
        >
          Faizan Ali
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} className="text-sm font-medium text-ink">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="sweep hidden text-sm font-medium sm:inline-block"
          >
            Résumé
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-primary hidden py-1.5 text-sm sm:inline-flex"
          >
            Email me
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
