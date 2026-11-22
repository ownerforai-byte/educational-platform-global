// NeutralMemberExamples figure. Theme-aware.
export function NeutralMemberExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Neutral electrophiles and nucleophiles showing charge is not the criterion">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Neutral but active — the counter-examples</text>
      {[
        ["BF₃", "no charge, empty p orbital", "strong electrophile", "rgb(245 158 11)", 40],
        ["AlCl₃", "no charge, electron-poor Al", "Friedel–Crafts catalyst", "rgb(139 92 246)", 240],
        ["NH₃", "no charge, one lone pair", "good nucleophile", "rgb(16 185 129)", 440],
      ].map(([h, d, r, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="100" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="84" fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="108" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          <text x={(x as number) + 90} y="132" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="190" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">judge by electrons, not by charge</text>
    </svg>
  );
}
