// Ammonia use map. Theme-aware.
export function Nh3UseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["fertilisers", "(NH₄)₂SO₄, NH₄NO₃, urea route", "rgb(16 185 129)"],
    ["refrigerant", "large latent heat of vaporisation", "rgb(14 165 233)"],
    ["Ostwald feedstock", "NO → NO₂ → HNO₃", "rgb(59 130 246)"],
    ["lab reagent", "NH₄OH, buffer solutions, complexation", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four major uses of ammonia in fertilisers, refrigeration, nitric acid production and the laboratory">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Where NH₃ goes</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Half the world's protein begins as a molecule of ammonia</text>
    </svg>
  );
}
