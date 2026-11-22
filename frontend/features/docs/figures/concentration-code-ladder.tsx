// HNO3 concentration code ladder. Theme-aware.
export function ConcentrationCodeLadder({ className }: { className?: string }) {
  const rungs: [string, string, string][] = [
    ["conc. HNO₃", "NO₂ (brown fumes)", "rgb(239 68 68)"],
    ["dil. HNO₃", "NO (browns at tube mouth)", "rgb(148 163 184)"],
    ["very dil. + Zn/Mg/Mn", "NH₄NO₃ / N₂O", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Ladder of nitric acid concentration against reduction product from nitrogen dioxide to ammonium nitrate">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The deeper the dilution, the deeper the cut</text>
      {rungs.map(([c, p, col], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 50} width="260" height="40" rx="9" className="fill-current" style={{ color: col }} opacity="0.16" />
          <text x="170" y={71 + i * 50} fontSize="12.5" fontWeight="800" textAnchor="middle" style={{ fill: col }}>{c}</text>
          <text x="330" y={71 + i * 50} fontSize="12.5" fontWeight="700" className="fill-current text-foreground">→ N in {p}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">NO₃⁻ + H⁺ is the true oxidant — quote the concentration with every equation</text>
    </svg>
  );
}
