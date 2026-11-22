// OrganicVsInorganicProps figure. Theme-aware.
export function OrganicVsInorganicProps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Property contrast between organic and inorganic compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two families, opposite personalities</text>
      <line x1="35" y1="48" x2="625" y2="48" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["PROPERTY", "ORGANIC", "INORGANIC"],
        ["bonding", "covalent, molecular", "often ionic"],
        ["m.p. / b.p.", "low, volatile", "high, crystalline"],
        ["flammability", "burn to CO₂ + H₂O", "mostly do not burn"],
        ["conductivity", "non-conductors", "conduct molten/aqueous"],
        ["solubility", "organic solvents", "water"],
        ["isomerism", "common", "rare"],
        ["reactions", "slow, catalysed", "fast, ionic"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={40 + [0, 220, 440][c]} y={68 + i * 22} fontSize={i ? "10" : "9.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="35" y1={75 + i * 22} x2="625" y2={75 + i * 22} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="230" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Every row follows from one cause: discrete covalent molecules vs ionic lattices</text>
    </svg>
  );
}
