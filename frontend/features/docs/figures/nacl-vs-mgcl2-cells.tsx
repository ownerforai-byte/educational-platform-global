// NaclVsMgcl2Cells figure. Theme-aware.
export function NaclVsMgcl2Cells({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison of Downs sodium cell with fused magnesium chloride electrolysis">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Downs cell vs Mg cell — same idea, two temperatures</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "Na (Downs)", "Mg"],
        ["electrolyte", "NaCl + CaCl₂ 42:58", "fused MgCl₂ + NaCl, CaCl₂"],
        ["temperature", "~600 °C", "~700 °C"],
        ["cathode", "steel; Na⁺ + e⁻ → Na (bell)", "iron pot; Mg²⁺ + 2e⁻ → Mg"],
        ["anode", "graphite; Cl₂", "graphite; Cl₂"],
        ["separator", "steel gauze diaphragm", "diaphragm + prompt withdrawal"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + c * 195} y={70 + i * 26} fontSize={i ? "10.5" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={78 + i * 26} x2="620" y2={78 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Both float their metal; both keep Cl₂ away from it chemically, not physically alone</text>
    </svg>
  );
}
