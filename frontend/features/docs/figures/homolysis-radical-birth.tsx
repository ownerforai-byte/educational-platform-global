// HomolysisRadicalBirth figure. Theme-aware.
export function HomolysisRadicalBirth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Chlorine homolysis in sunlight producing two chlorine radicals">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Homolysis in action: Cl₂ meets sunlight</text>
      <rect x="40" y="58" width="180" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="130" y="88" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl–Cl</text>
      <text x="130" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">shared pair, non-polar</text>
      <path d="M 225 92 L 300 92" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#hrb-a)" />
      <text x="262" y="80" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">hν (UV light)</text>
      {[
        ["Cl·", "7 electrons, 1 unpaired", "rgb(59 130 246)", 305],
        ["Cl·", "7 electrons, 1 unpaired", "rgb(239 68 68)", 495],
      ].map(([h, d, col, x]) => (
        <g key={h as string + String(x)}>
          <rect x={x as number} y="58" width="160" height="70" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 80} y="88" fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 80} y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">two neutral radicals, each hungry for one electron</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">these radicals start the chlorination chain of methane</text>
      <defs>
        <marker id="hrb-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
