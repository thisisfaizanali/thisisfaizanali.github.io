"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/lib/content";

const elsewhere = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "Résumé (PDF)", href: profile.links.resume },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission). The mailto
      // link beside this button still works, so fail quietly.
    }
  };

  return (
    <section id="contact" className="shell scroll-mt-24 py-24 md:py-32">
      <Reveal className="card card-lift relative overflow-hidden p-8 md:p-14">
        <div aria-hidden className="ledger-rules pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">
          <SectionHeading title="Let’s talk about what you’re building." />

          <p className="label">
            Open to {profile.availability.join(", ").toLowerCase()} work, {profile.location}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="sweep-out break-all text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-tight"
            >
              {profile.email}
            </a>
            <button type="button" onClick={copy} className="pill px-4 py-2.5 text-sm">
              {copied ? (
                <>
                  <Check className="size-3.5" strokeWidth={2} aria-hidden /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" strokeWidth={1.5} aria-hidden /> Copy
                </>
              )}
              <span className="sr-only">
                {copied ? "Email address copied" : "Copy email address"}
              </span>
            </button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-out font-medium text-ink-muted"
                >
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-md text-sm text-ink-muted">
            Fastest by email. Press{" "}
            <kbd className="rounded-md border border-rule bg-paper-raised px-1.5 py-0.5 font-code text-xs">
              Ctrl K
            </kbd>{" "}
            (
            <kbd className="rounded-md border border-rule bg-paper-raised px-1.5 py-0.5 font-code text-xs">
              ⌘K
            </kbd>{" "}
            on Mac) anywhere on this site to jump around.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
