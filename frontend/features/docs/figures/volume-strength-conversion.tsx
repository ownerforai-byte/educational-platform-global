// Volume strength conversion worked. Theme-aware.
export function VolumeStrengthConversion({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["meaning of 10 V", "1 L solution → 10 L O₂ at STP"],
    ["moles of O₂", "10 / 22.4 = 0.4464 mol"],
    ["moles of H₂O₂ (2:1)", "2 × 0.4464 = 0.893 mol"],
    ["molarity", "M = volume strength / 11.2 = 0.893 M"],
    ["as % w/v", "0.893 × 34 ≈ 30.4 g/L ≈ 3%"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Worked conversion of ten-volume hydrogen peroxide to molarity 0.893 and about three percent">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">10-volume → molarity, step by step</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 44} width="580" height="36" rx="8" className="fill-current" style={{ color: i >= 3 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity={i >= 3 ? 0.16 : 0.1} />
          <text x="58" y={69 + i * 44} fontSize="11.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="250" y={69 + i * 44} fontSize="12" fontWeight={i >= 3 ? 800 : 600} style={{ fill: i >= 3 ? "rgb(16 185 129)" : "rgb(59 130 246)" }}>{s}</text>
        </g>
      ))}
      <text x="330" y="288" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The 2:1 ratio in 2H₂O₂ → 2H₂O + O₂ is where the 11.2 comes from</text>
    </svg>
  );
}
