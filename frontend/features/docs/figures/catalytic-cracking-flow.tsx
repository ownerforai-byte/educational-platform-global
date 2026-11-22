// CatalyticCrackingFlow figure. Theme-aware.
export function CatalyticCrackingFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Catalytic cracking of heavy petroleum fractions over zeolite catalyst">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Catalytic cracking — the refinery workhorse</text>
      {[
        ["heavy fraction", "long chains, low value", "rgb(120 113 108)", 40],
        ["zeolite catalyst", "~450–500 °C", "rgb(59 130 246)", 200],
        ["cracking", "C–C bonds split", "rgb(245 158 11)", 360],
        ["products", "petrol + alkenes", "rgb(16 185 129)", 520],
      ].map(([h, d, col, x], i) => (
        <g key={h as string}>
          <rect x={x as number} y="70" width="110" height="64" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 55} y="96" fontSize="9.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 55} y="116" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          {i < 3 && <path d={`M ${(x as number) + 112} 102 L ${(x as number) + 147} 102`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ccf-a)" />}
        </g>
      ))}
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C₁₀H₂₂ → C₈H₁₈ + C₂H₄</text>
      <text x="330" y="196" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">catalyst = lower temperature + better yields of branched alkanes and aromatics</text>
      <text x="330" y="218" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">alkenes (ethene, propene) feed the polymer and chemical industries</text>
      <defs>
        <marker id="ccf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
