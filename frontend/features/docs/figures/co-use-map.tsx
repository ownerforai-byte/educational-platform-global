// CO use map including phosgene and formate. Theme-aware.
export function CoUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["fuel", "water gas / producer gas", "rgb(245 158 11)"],
    ["reducer", "blast furnace, metal oxides", "rgb(16 185 129)"],
    ["organic synthesis", "phosgene COCl₂ (→ urea plastics)", "rgb(59 130 246)"],
    ["nickel refining", "Mond carbonyl route", "rgb(124 58 237)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four uses of carbon monoxide as fuel reducer synthesis feedstock and nickel refining">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The formal anhydride earns its keep</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Deadly in the kitchen, indispensable in the plant</text>
    </svg>
  );
}
