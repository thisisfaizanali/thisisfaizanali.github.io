import Link from "next/link";

/** Plain underline on hover, no motion: Formwork keeps still. */
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
    <Link href={href} className={`${className} sweep`}>
      {children}
    </Link>
  );
}
