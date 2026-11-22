// ChiralCentreLactic figure. Theme-aware.
export function ChiralCentreLactic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lactic acid chiral carbon with four different groups">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The chiral carbon of lactic acid</text>
      <rect x="40" y="52" width="580" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH(OH)–COOH — the middle carbon carries FOUR different groups</text>
      <text x="330" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">–H · –OH · –CH₃ · –COOH (all different = chiral / asymmetric carbon)</text>
      {[
        ["4 different groups", "the defining condition", "rgb(16 185 129)", 40],
        ["non-superimposable mirror images", "two enantiomers: d and l", "rgb(139 92 246)", 340],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="140" width="280" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y="163" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y="184" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a carbon with even two identical groups can never be chiral — symmetry kills it</text>
    </svg>
  );
}
