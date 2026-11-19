import { Reveal } from "@/components/reveal";

type Props = {
  title: string;
  aside?: string;
};

/** A plain sentence-case head; the spec-sheet folio and eyebrow are gone. */
export function SectionHeading({ title, aside }: Props) {
  return (
    <Reveal>
      <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-[18ch] text-[clamp(2.25rem,4.5vw,3.5rem)]">{title}</h2>
        {aside ? <p className="label md:pb-2">{aside}</p> : null}
      </div>
    </Reveal>
  );
}
