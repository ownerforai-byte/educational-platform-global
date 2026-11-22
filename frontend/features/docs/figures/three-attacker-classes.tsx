// ThreeAttackerClasses figure. Theme-aware.
export function ThreeAttackerClasses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Electrophiles nucleophiles and free radicals as three reagent classes">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The three attackers of organic chemistry</text>
      {[
        ["ELECTROPHILE", "electron-LOVING", "accepts a pair; attacks π bonds & lone pairs", "rgb(239 68 68)", 40],
        ["NUCLEOPHILE", "nucleus-LOVING", "donates a pair; attacks δ+ centres", "rgb(59 130 246)", 240],
        ["FREE RADICAL", "unpaired electron", "neutral; strips atoms from bonds", "rgb(16 185 129)", 440],
      ].map(([h, sub, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="110" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="80" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{sub as string}</text>
          <text x={(x as number) + 90} y={126} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">identify the attacker and the target it seeks — the reaction predicts itself</text>
    </svg>
  );
}
