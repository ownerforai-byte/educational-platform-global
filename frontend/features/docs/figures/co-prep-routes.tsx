// CO preparation routes. Theme-aware.
export function CoPrepRoutes({ className }: { className?: string }) {
  const routes: [string, string, string][] = [
    ["lab", "HCOOH —(conc. H₂SO₄, 140 °C)→ CO + H₂O", "rgb(59 130 246)"],
    ["incomplete burning", "2C + O₂(limited) → 2CO; C + CO₂ → 2CO", "rgb(245 158 11)"],
    ["water gas", "C + H₂O —(1000 °C)→ CO + H₂", "rgb(16 185 129)"],
    ["producer gas", "CO + N₂ (air over hot coke)", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four routes to carbon monoxide from formic acid dehydration to fuel gases">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Four doors into CO</text>
      {routes.map(([t, eq, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" style={{ fill: c }}>{t}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{eq}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Dehydrate formic acid in the lab; burn coke short of air for the fuel gases</text>
    </svg>
  );
}
