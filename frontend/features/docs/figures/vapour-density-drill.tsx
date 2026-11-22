// Solved: vapour density to molecular mass. Theme-aware.
export function VapourDensityDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved vapour density to molecular mass gas vapour density twenty two molecular mass forty four formula mass equals two times vapour density">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — vapour density 22 → molecular mass?</text>
      {[
        ["Definition", "VD = mass of gas ÷ mass of equal volume of H₂ (same T, P)"],
        ["Key relation", "molecular mass = 2 × vapour density"],
        ["Apply", "M = 2 × 22 = 44 (matches CO₂, C₃H₈ …)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Why the factor 2: hydrogen's molecule is H₂ (mass 2), so an equal volume of gas holds as many molecules but weighs M/2 × the H₂ mass.</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Reverse drill: a gas of VD 8 → M = 16 (methane); VD 14 → M = 28 (N₂ or CO).</text>
    </svg>
  );
}
