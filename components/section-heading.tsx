type Props = {
  title: string;
  aside?: string;
};

/** A heavy ink bar and a plain question; the spec-sheet folio and eyebrow are gone. */
export function SectionHeading({ title, aside }: Props) {
  return (
    <div className="rule-bar mb-12 flex flex-col gap-3 pt-5 md:mb-16 md:flex-row md:items-end md:justify-between">
      <h2 className="text-[clamp(2.25rem,4vw+0.5rem,3.75rem)]">{title}</h2>
      {aside ? <p className="label md:pb-2">{aside}</p> : null}
    </div>
  );
}
