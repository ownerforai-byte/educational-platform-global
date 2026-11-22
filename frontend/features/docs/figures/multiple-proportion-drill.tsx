// Solved: multiple proportions CO and CO2. Theme-aware.
export function MultipleProportionDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved multiple proportions carbon monoxide and carbon dioxide oxygen ratio one to two with fixed carbon mass">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — CO and CO₂ obey multiple proportions</text>
      {[
        ["Fix the carbon", "12 g C in both oxides (same element, same mass)"],
        ["Oxygen masses", "CO: 16 g · CO₂: 32 g"],
        ["Ratio of oxygens", "16 : 32 = 1 : 2 — simple whole numbers"],
        ["Statement", "when two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in simple ratio"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 42} width="660" height="36" rx="9" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(139 92 246 / 0.85)" }} />
          <text x="46" y={58 + i * 42} fontSize="9" className="fill-current text-violet-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 42} fontSize="9.2" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d.slice(0, 62)}</text>
        </g>
      ))}
      <rect x="30" y="200" width="660" height="12" rx="0" />
      <text x="360" y="212" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Other classic pairs: H₂O/H₂O₂ (1:1), SO₂/SO₃ (2:3), FeO/Fe₂O₃ (1:1.5 = 2:3).</text>
    </svg>
  );
}
