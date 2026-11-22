// RacemicMixturePanel figure. Theme-aware.
export function RacemicMixturePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Racemic mixture equal d and l forms optically inactive">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The racemic mixture — optical cancellation</text>
      {[
        ["d-form", "rotates +α", "rgb(245 158 11)", 40],
        ["l-form", "rotates −α", "rgb(59 130 246)", 240],
        ["50 : 50 mixture", "net rotation ZERO", "rgb(16 185 129)", 440],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="76" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="84" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">racemic (±) mixture = equal enantiomers = optically INACTIVE</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the rotations cancel exactly — separation (resolution) recovers the active forms</text>
    </svg>
  );
}
