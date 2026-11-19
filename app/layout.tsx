import type { Metadata } from "next";
import { Archivo, Archivo_Narrow, Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";
import { profile } from "@/lib/content";

const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: "700" });
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: "500",
});

const SITE = "https://thisisfaizanali.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Full-Stack Engineer in Bengaluru building production software in React, Next.js, Node.js, and TypeScript. Selected work, case studies, and contact.",
  keywords: [
    "Full-Stack Engineer",
    "React Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "REST APIs",
    "Bengaluru",
    "Md Faizan Ali",
  ],
  authors: [{ name: profile.name, url: SITE }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: SITE,
    siteName: profile.name,
    title: `${profile.name} | ${profile.role}`,
    description:
      "Full-Stack Engineer building production software in React, Next.js, Node.js, and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description:
      "Full-Stack Engineer building production software in React, Next.js, Node.js, and TypeScript.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "API design"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${archivo.variable} ${archivoNarrow.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
