import { Reveal } from "@/components/reveal";
import { SplitWords } from "@/components/motion/split-words";

export function SectionHeading({
  eyebrow,
  title,
  aside,
  italicFrom,
}: {
  eyebrow: string;
  title: string;
  aside?: string;
  italicFrom?: number;
}) {
  return (
    <div className="mb-14 flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal>
          <span className="label">{eyebrow}</span>
        </Reveal>
        <h2 className="mt-3 font-serif display-md">
          <SplitWords text={title} delay={0.06} italicFrom={italicFrom} />
        </h2>
      </div>
      {aside ? (
        <Reveal delay={0.2}>
          <p className="label md:pb-2">{aside}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
