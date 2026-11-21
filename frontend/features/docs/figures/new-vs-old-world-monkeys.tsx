/** New World vs Old World monkeys comparison. Theme-aware. */
export function NewVsOldWorldMonkeys({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="New World monkeys versus Old World monkeys comparison range nose tail size thumb cheek pouches ischial callosities habitat and examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">New World vs Old World monkeys</text>
      {[
        { y: 56, h: "BASIS", a: "New World (Platyrrhini)", b: "Old World (Catarrhini)" },
        { y: 86, h: "Range", a: "Central & South America", b: "Africa & Asia" },
        { y: 116, h: "Nose", a: "flat, wide-septum, sideways nostrils", b: "narrow downward nostrils" },
        { y: 146, h: "Tail", a: "long, often prehensile", b: "present but never prehensile" },
        { y: 176, h: "Thumb", a: "non- or partially opposable", b: "fully opposable" },
        { y: 206, h: "Cheek pouches / callosities", a: "absent", b: "present" },
        { y: 236, h: "Examples", a: "spider, howler, capuchin, marmoset", b: "macaque (rhesus), langur, baboon, colobus" },
      ].map((r, i) => (
        <g key={r.h}>
          <rect x="30" y={r.y - 18} width="600" height="26" rx="6" className={i === 0 ? "fill-current text-foreground/5" : "fill-current text-muted-foreground/5"} />
          <text x="40" y={r.y} fontSize="7.8" className="fill-current text-foreground" fontWeight={i === 0 ? 800 : 700}>{r.h}</text>
          <text x="220" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="450" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.b}</text>
        </g>
      ))}
      <text x="16" y="262" fontSize="8" className="fill-current text-muted-foreground">Two monkey lineages separated by ~40 million years of ocean.</text>
    </svg>
  );
}
