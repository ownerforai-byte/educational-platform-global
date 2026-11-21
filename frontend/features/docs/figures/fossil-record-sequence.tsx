/** Fossil record sequence — simple to complex. Theme-aware. */
export function FossilRecordSequence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Fossil record sequence simple prokaryotes eukaryotes invertebrates fish amphibians reptiles birds mammals humans complexity increases with time deeper is older">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fossil record — complexity increases with time</text>
      <line x1="60" y1="120" x2="620" y2="120" strokeWidth="4" className="stroke-current text-muted-foreground" />
      {[
        { x: 90, t: "3.5 bya", s: "prokaryotes" },
        { x: 190, t: "~2 bya", s: "eukaryotes" },
        { x: 290, t: "", s: "invertebrates" },
        { x: 380, t: "", s: "fish" },
        { x: 460, t: "", s: "amphibians" },
        { x: 530, t: "", s: "reptiles" },
        { x: 590, t: "", s: "birds/mammals" },
      ].map((p) => (
        <g key={p.s}>
          <circle cx={p.x} cy="120" r="5" className="fill-current text-rose-500" />
          {p.t && <text x={p.x} y="100" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.t}</text>}
          <text x={p.x} y="142" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
        </g>
      ))}
      <text x="60" y="170" fontSize="8" className="fill-current text-muted-foreground">Deeper strata = older (relative dating); radioactive dating: C-14 (&lt;50,000 yr), U-Pb, K-Ar for older rocks.</text>
      <text x="16" y="160" fontSize="8" className="fill-current text-muted-foreground">Fossils: bones, shells, impressions, footprints, amber, petrification.</text>
    </svg>
  );
}
