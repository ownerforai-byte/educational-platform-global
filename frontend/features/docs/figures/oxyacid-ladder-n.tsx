// Oxyacids of nitrogen oxidation-state ladder. Theme-aware.
export function OxyacidLadderN({ className }: { className?: string }) {
  const rungs: [string, string, string, string][] = [
    ["hyponitrous acid", "H₂N₂O₂", "+1", "rgb(148 163 184)"],
    ["nitrous acid", "HNO₂", "+3", "rgb(14 165 233)"],
    ["nitric acid", "HNO₃", "+5", "rgb(59 130 246)"],
    ["pernitric acid", "HNO₄", "+5 (peroxy O–O)", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ladder of nitrogen oxyacids with formulas and oxidation states from hyponitrous to pernitric acid">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The nitrogen oxyacid ladder</text>
      {rungs.map(([n, f, os, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="150" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.16" />
          <text x="115" y={71 + i * 48} fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{n}</text>
          <text x="230" y={71 + i * 48} fontSize="13" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{f}</text>
          <text x="420" y={71 + i * 48} fontSize="12.5" textAnchor="middle" fontWeight="700" className="fill-current text-foreground">N = {os}</text>
        </g>
      ))}
      <text x="330" y="258" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">HNO₃ and HNO₄ share +5 - the extra oxygens are peroxy, not higher oxidation</text>
    </svg>
  );
}
