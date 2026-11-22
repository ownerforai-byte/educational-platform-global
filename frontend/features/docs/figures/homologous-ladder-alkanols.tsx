// HomologousLadderAlkanols figure. Theme-aware.
export function HomologousLadderAlkanols({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Alkanol homologous series with rising boiling points">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The alkanol ladder — CₙH₂ₙ₊₁OH</text>
      {[
        ["CH₃OH", "methanol", "65 °C", 80, "rgb(59 130 246)", 60],
        ["C₂H₅OH", "ethanol", "78 °C", 300, "rgb(16 185 129)", 90],
        ["C₃H₇OH", "propan-1-ol", "97 °C", 520, "rgb(245 158 11)", 120],
      ].map(([f, n, bp, x, col, h]) => (
        <g key={n as string}>
          <rect x={(x as number) - 55} y={220 - (h as number)} width="110" height={h as number} rx="8" fill={col as string} opacity="0.35" />
          <text x={x as number} y={210 - (h as number)} fontSize="10" fontWeight="800" fill={col as string} textAnchor="middle">{bp as string}</text>
          <text x={x as number} y="232" fontSize="9.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f as string}</text>
          <text x={x as number} y="246" fontSize="0.1"> </text>
        </g>
      ))}
      <text x="300" y="70" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each rung adds one CH₂ (14 u) — b.p. climbs steadily</text>
      <text x="300" y="92" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">chemical behaviour stays uniform: all alcohols</text>
    </svg>
  );
}
