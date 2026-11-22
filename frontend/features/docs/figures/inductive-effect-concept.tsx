// InductiveEffectConcept figure. Theme-aware.
export function InductiveEffectConcept({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Inductive effect permanent sigma electron displacement along a chain">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The inductive effect — polarisation that travels</text>
      <rect x="40" y="55" width="580" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="80" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl ← CH₂ ← CH₂ ← CH₃  (σ-electrons pulled toward Cl)</text>
      <text x="330" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">δ− at Cl · δ+ δ+ δ+ fading along the chain</text>
      {[
        ["permanent", "a ground-state polarisation", "rgb(16 185 129)", 40],
        ["through σ bonds", "no π system needed", "rgb(245 158 11)", 240],
        ["fades fast", "negligible after ~3 carbons", "rgb(239 68 68)", 440],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="140" width="180" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="163" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="184" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
    </svg>
  );
}
