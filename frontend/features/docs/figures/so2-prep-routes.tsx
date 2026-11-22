// SO2 prep routes. Theme-aware.
export function So2PrepRoutes({ className }: { className?: string }) {
  const routes: [string, string, string][] = [
    ["lab", "Na₂SO₃ + dil. H₂SO₄ → Na₂SO₄ + SO₂ + H₂O", "rgb(59 130 246)"],
    ["lab (Cu)", "Cu + 2H₂SO₄(conc) → CuSO₄ + SO₂ + 2H₂O", "rgb(16 185 129)"],
    ["industry", "S + O₂ → SO₂ (contact process)", "rgb(245 158 11)"],
    ["roasting", "4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four routes to sulphur dioxide in laboratory and industry">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Four doors into SO₂</text>
      {routes.map(([t, eq, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" style={{ fill: c }}>{t}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{eq}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Collect upward (2.2× air density); pungent, colourless, suffocating</text>
    </svg>
  );
}
