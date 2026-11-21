/** In-situ vs ex-situ master contrast. Theme-aware. */
export function InSituVsExSituContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="In-situ versus ex-situ conservation master contrast location what is conserved cost evolution examples and best for">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">In-situ vs ex-situ — the master contrast (NEB 2024)</text>
      {[
        { y: 56, h: "BASIS", a: "In-situ", b: "Ex-situ" },
        { y: 88, h: "Location", a: "natural habitat", b: "gardens, zoos, banks, cages" },
        { y: 120, h: "What is conserved", a: "species + habitat + interactions + evolution", b: "the species / genetic material alone" },
        { y: 152, h: "Cost", a: "low per area, high protection cost", b: "high per species" },
        { y: 184, h: "Evolution", a: "continues", b: "effectively paused" },
        { y: 216, h: "Examples", a: "Chitwan NP; Annapurna CA", b: "Godawari garden; Central Zoo; Khumaltar genebank" },
      ].map((r, i) => (
        <g key={r.h}>
          <rect x="30" y={r.y - 18} width="600" height="28" rx="6" className={i === 0 ? "fill-current text-foreground/5" : "fill-current text-muted-foreground/5"} />
          <text x="40" y={r.y} fontSize="7.8" className="fill-current text-foreground" fontWeight={i === 0 ? 800 : 700}>{r.h}</text>
          <text x="200" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="450" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.b}</text>
        </g>
      ))}
      <text x="16" y="242" fontSize="8" className="fill-current text-muted-foreground">In-situ is cheapest and most complete; ex-situ is the safety net for the critically endangered.</text>
    </svg>
  );
}
