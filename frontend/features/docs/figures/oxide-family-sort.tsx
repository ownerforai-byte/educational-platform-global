// Oxide family classification grid. Theme-aware.
export function OxideFamilySort({ className }: { className?: string }) {
  const fams: [string, string, string, string][] = [
    ["acidic", "CO₂, SO₃, P₄O₁₀, N₂O₅", "non-metal oxides → acids", "rgb(239 68 68)"],
    ["basic", "Na₂O, CaO, MgO, CuO", "metal oxides → alkalis", "rgb(14 165 233)"],
    ["neutral", "CO, NO, N₂O", "react with neither", "rgb(148 163 184)"],
    ["amphoteric", "ZnO, Al₂O₃, PbO, SnO", "react with both", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 290" className={className} role="img" aria-label="Grid of four oxide families with examples and defining behaviour">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Sort every oxide by behaviour</text>
      {fams.map(([f, ex, rule, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 54} width="130" height="42" rx="9" className="fill-current" style={{ color: c }} opacity="0.22" />
          <text x="105" y={72 + i * 54} fontSize="13" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{f}</text>
          <text x="190" y={64 + i * 54} fontSize="12" fontWeight="700" className="fill-current text-foreground">{ex}</text>
          <text x="190" y={82 + i * 54} fontSize="10.5" className="fill-current text-muted-foreground">{rule}</text>
        </g>
      ))}
      <text x="330" y="280" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">CO is a non-metal oxide yet neutral; ZnO a metal oxide yet amphoteric - behaviour decides</text>
    </svg>
  );
}
