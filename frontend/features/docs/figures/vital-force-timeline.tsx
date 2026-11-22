// VitalForceTimeline figure. Theme-aware.
export function VitalForceTimeline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Timeline from Berzelius vital force theory to Wohler urea synthesis">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">From vital force to synthetic chemistry</text>
      <line x1="60" y1="110" x2="600" y2="110" stroke="rgb(148 163 184)" strokeWidth="3" />
      {[
        ["~1807", "Berzelius: vital force theory — organics need life", "rgb(59 130 246)", 60],
        ["1828", "Wöhler: NH₄OCN → urea in a flask", "rgb(16 185 129)", 300],
        ["after", "synthetic era: acetic acid, dyes, plastics…", "rgb(245 158 11)", 520],
      ].map(([yr, d, col, x], i) => (
        <g key={i}>
          <circle cx={x as number} cy="110" r="7" fill={col as string} />
          <text x={x as number} y="88" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{yr as string}</text>
          <text x={x as number} y={i === 1 ? 140 : 140} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">The doctrine: "organic compounds can only be made by living things"</text>
      <text x="330" y="203" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One gentle heating rearranged atoms and ended a philosophy</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">NH₄OCN and urea share the formula CH₄N₂O — isomerism's debut</text>
    </svg>
  );
}
