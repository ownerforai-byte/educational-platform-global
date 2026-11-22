// DistanceDecayPanel figure. Theme-aware.
export function DistanceDecayPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Inductive effect fading with distance along the chain">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The effect dies with distance</text>
      {[
        ["α-carbon", "strong", "rgb(239 68 68)", 60, 110],
        ["β-carbon", "weak", "rgb(245 158 11)", 200, 140],
        ["γ-carbon", "faint", "rgb(59 130 246)", 340, 165],
        ["δ-carbon", "≈ nothing", "rgb(148 163 184)", 480, 180],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="110" height="40" rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={(x as number) + 55} y={(y as number) + 17} fontSize="10" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 55} y={(y as number) + 33} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="60" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl–CH₂–CH₂–CH₂–CH₃ : the pull fades bond by bond</text>
      <text x="330" y="90" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">α-chloro acids are far more acidic than β-chloro ones — distance is measurable</text>
    </svg>
  );
}
