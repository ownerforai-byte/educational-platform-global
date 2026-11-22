// White vs red phosphorus contrast. Theme-aware.
export function WhiteVsRedPContrast({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["colour", "waxy white/yellow", "dark red powder"],
    ["ignition", "~35 °C, spontaneous", "ignites only above 260 °C"],
    ["solubility", "CS₂ soluble", "insoluble"],
    ["glow", "chemiluminescent in dark", "no glow"],
    ["toxicity", "highly poisonous", "non-poisonous"],
    ["structure", "discrete P₄ tetrahedra", "polymeric chains"],
  ];
  return (
    <svg viewBox="0 0 660 340" className={className} role="img" aria-label="Six row comparison of white and red phosphorus">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same element, different danger</text>
      <text x="290" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">white P</text>
      <text x="500" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(220 38 38)">red P</text>
      {rows.map(([p, a, b], i) => (
        <g key={i}>
          <text x="60" y={80 + i * 40} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{p}</text>
          <text x="290" y={80 + i * 40} fontSize="11" textAnchor="middle" fontWeight="700" fill="rgb(245 158 11)">{a}</text>
          <text x="500" y={80 + i * 40} fontSize="11" textAnchor="middle" fontWeight="700" fill="rgb(220 38 38)">{b}</text>
          <line x1="50" y1={88 + i * 40} x2="620" y2={88 + i * 40} stroke="currentColor" strokeWidth="0.6" className="text-muted-foreground" opacity="0.3" />
        </g>
      ))}
      <text x="330" y="328" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Stored under water (white) vs matchbox-safe (red)</text>
    </svg>
  );
}
