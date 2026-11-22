// Radicals: cationic and anionic groups. Theme-aware.
export function RadicalTypesPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Radical panel acidic cationic radicals basic anionic radicals with valencies examples ammonium sodium calcium sulphate nitrate carbonate chloride">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Radicals — the charged fragments that build formulae</text>
      <rect x="30" y="44" width="320" height="110" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Basic radicals (cations) — positive</text>
      {[["Na⁺", "+1"], ["Ca²⁺", "+2"], ["Al³⁺", "+3"], ["NH₄⁺", "+1"]].map(([r, v], i) => (
        <g key={r}>
          <rect x={50 + i * 74} y="84" width="60" height="40" rx="6" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={80 + i * 74} y="102" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{r}</text>
          <text x={80 + i * 74} y="116" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="190" y="146" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">named first in every formula</text>
      <rect x="370" y="44" width="320" height="110" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">Acidic radicals (anions) — negative</text>
      {[["Cl⁻", "−1"], ["SO₄²⁻", "−2"], ["NO₃⁻", "−1"], ["CO₃²⁻", "−2"]].map(([r, v], i) => (
        <g key={r}>
          <rect x={390 + i * 74} y="84" width="60" height="40" rx="6" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(244 63 94 / 0.85)" }} />
          <text x={420 + i * 74} y="102" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{r}</text>
          <text x={420 + i * 74} y="116" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="530" y="146" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">charge balance fixes the subscripts</text>
      <rect x="30" y="168" width="660" height="42" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Criss-cross drill: Al³⁺ + SO₄²⁻ → Al₂(SO₄)₃ — charges swap to become subscripts; brackets wrap multi-atom radicals.</text>
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">A radical behaves as one unit in reactions — NH₄⁺ never splits in simple double decomposition.</text>
    </svg>
  );
}
