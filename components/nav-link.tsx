import Link from "next/link";

/**
 * Two stacked copies of the label; on hover the pair slides up one line height
 * so the incoming word replaces the outgoing one. Pure CSS — no JS, no colour
 * change, works before hydration.
 */
export function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/nav relative block overflow-hidden ${className}`}
      style={{ lineHeight: 1.15 }}
    >
      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:-translate-y-full group-focus-visible/nav:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-full block text-ink transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:-translate-y-full group-focus-visible/nav:-translate-y-full"
      >
        {children}
      </span>
    </Link>
  );
}
