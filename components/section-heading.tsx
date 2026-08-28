import { Reveal } from "@/components/reveal";
import { SplitWords } from "@/components/motion/split-words";

type Props = {
  /** Two-digit folio shown large in mono, e.g. "02". */
  folio: string;
  /** Total sheet count for the "/ NN" suffix. */
  total?: string;
  eyebrow: string;
  title: string;
  aside?: string;
  italicFrom?: number;
};

/** Spec-sheet section header: folio number, hairline rule, eyebrow, serif title. */
export function SectionHeading({ folio, total = "05", eyebrow, title, aside, italicFrom }: Props) {
  return (
    <div className="mb-14 border-b border-rule pb-6">
      <div className="flex items-baseline gap-3">
        <Reveal>
          <span className="font-mono text-sm text-ink-faint tabular-nums">
            {folio}
            <span className="text-ink-faint/60"> / {total}</span>
          </span>
        </Reveal>
        <span className="h-px flex-1 bg-rule" aria-hidden />
        <Reveal delay={0.05}>
          <span className="label">§ {eyebrow}</span>
        </Reveal>
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif display-md">
          <SplitWords text={title} delay={0.06} italicFrom={italicFrom} />
        </h2>
        {aside ? (
          <Reveal delay={0.2}>
            <p className="label md:pb-2">{aside}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
