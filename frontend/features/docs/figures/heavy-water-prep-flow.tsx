// Heavy water preparation by electrolysis enrichment. Theme-aware.
export function HeavyWaterPrepFlow({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. electrolyse ordinary water (NaOH soln)", "H₂ evolves faster than D₂ - isotope effect"],
    ["2. residual liquid enriches in D₂O", "each stage concentrates deuterium"],
    ["3. repeat many stages", "up to ~99.75% D₂O"],
    ["4. optional: fractional distillation", "bp difference 101.4 vs 100 °C assists"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Flow of heavy water preparation by prolonged electrolysis exploiting the isotope effect">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Making D₂O: separate what chemistry cannot</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 50} width="580" height="40" rx="8" className="fill-current" style={{ color: i === 2 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity={i === 2 ? 0.18 : 0.1} />
          <text x="58" y={62 + i * 50} fontSize="12" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={80 + i * 50} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="266" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">O–H breaks faster than O–D: identical chemistry, different speeds</text>
    </svg>
  );
}
