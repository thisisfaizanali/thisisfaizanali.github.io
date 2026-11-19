"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
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
      // Clipboard blocked (insecure context or denied permission) — the mailto
      // link beside this button still works, so fail quietly.
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-band py-24 text-band-ink md:py-32">
      <div className="shell">
        {/* Not SectionHeading: its rule-bar is ink, which vanishes on the band. */}
        <div className="mb-12 border-t-[3px] border-band-ink pt-5 md:mb-16">
          <h2 className="text-[clamp(2.25rem,4vw+0.5rem,3.75rem)]">How do I reach you?</h2>
        </div>

        <p className="label !text-band-ink/80">
          Open to {profile.availability.join(", ").toLowerCase()} work.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="sweep-out break-all text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-tight"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 border-2 border-band-ink px-3 py-2.5 text-sm font-medium hover:bg-band-ink hover:text-band"
          >
            {copied ? (
              <>
                <Check className="size-3" strokeWidth={2} aria-hidden /> Copied
              </>
            ) : (
              <>
                <Copy className="size-3" strokeWidth={1.5} aria-hidden /> Copy
              </>
            )}
            <span className="sr-only">{copied ? "Email address copied" : "Copy email address"}</span>
          </button>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {elsewhere.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="sweep-out font-medium">
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-md text-sm text-band-ink/80">
          Fastest by email. Press{" "}
          <kbd className="border border-band-ink/40 px-1.5 py-0.5 font-narrow text-xs">Ctrl K</kbd>{" "}
          (<kbd className="border border-band-ink/40 px-1.5 py-0.5 font-narrow text-xs">⌘K</kbd> on
          Mac) anywhere on this site to jump around.
        </p>
      </div>
    </section>
  );
}
