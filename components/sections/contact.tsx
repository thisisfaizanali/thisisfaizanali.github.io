"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Magnetic } from "@/components/motion/magnetic";
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
    <section id="contact" className="scroll-mt-24 border-t border-rule py-24 md:py-36">
      <div className="shell">
        <SectionHeading folio="05" eyebrow="Contact" title="Let’s talk about what you’re building." italicFrom={3} />

        <Reveal className="flex flex-col gap-6" delay={0.2}>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.22}>
              <a
                href={`mailto:${profile.email}`}
                className="font-serif text-2xl sweep-out md:text-3xl"
              >
                {profile.email}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 label transition-colors hover:border-rule-strong hover:text-ink"
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
              <span className="sr-only">
                {copied ? "Email address copied" : "Copy email address"}
              </span>
            </button>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
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

          <p className="mt-4 max-w-md text-sm text-ink-muted">
            Fastest by email. Press{" "}
            <kbd className="border border-rule px-1.5 py-0.5 font-mono text-[0.6875rem]">Ctrl K</kbd>{" "}
            (<kbd className="border border-rule px-1.5 py-0.5 font-mono text-[0.6875rem]">⌘K</kbd> on
            Mac) anywhere on this site to jump around.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
