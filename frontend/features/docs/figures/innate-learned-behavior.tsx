/** Innate vs learned behaviour. Theme-aware. */
export function InnateLearnedBehavior({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Innate behaviour genetically programmed reflexes taxes and migration versus learned behaviour from experience with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two sources of behaviour</text>

      <g>
        <rect x="30" y="56" width="290" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INNATE — inborn</text>
        {["present without practice", "genetically programmed", "same in all members", "of the species", "", "reflexes · taxes ·", "instincts · migration"].map((s, i) => (
          <text key={i} x="46" y={102 + i * 16} fontSize="8.2" className={s === "" ? "opacity-0" : "fill-current text-muted-foreground"}>{s || " "}</text>
        ))}
      </g>

      <g>
        <rect x="340" y="56" width="290" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LEARNED — from experience</text>
        {["changes with experience", "differs between individuals", "improves survival flexibility", "", "habituation · imprinting ·", "conditioning · insight"].map((s, i) => (
          <text key={i} x="356" y={102 + i * 16} fontSize="8.2" className={s === "" ? "opacity-0" : "fill-current text-muted-foreground"}>{s || " "}</text>
        ))}
      </g>

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Most real behaviour blends both: a migrating bird inherits the urge to travel (innate) but fine-tunes its route with experience.</text>
    </svg>
  );
}
