// Resonance bond order drill: ozone and carbonate fractions. Theme-aware.
export function ResonanceBondOrderDrill({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["O3", "one double + one single, 2 positions", "(2 + 1) / 2", "1.5"],
    ["CO3 2-", "one double + two single, 3 positions", "(2 + 1 + 1) / 3", "1 and 1/3"],
    ["NO3 -", "one double + two single, 3 positions", "(2 + 1 + 1) / 3", "1 and 1/3"],
    ["Benzene", "three double + three single, 2 Kekule forms", "(3x2 + 3x1) / 6", "1.5"],
  ];
  return (
    <svg viewBox="0 0 700 300" className={className} role="img" aria-label="Resonance bond order drill table for ozone carbonate nitrate and benzene showing averaged bond order fractions">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Bond order under resonance: total order shared out</text>
      {rows.map(([mol, desc, calc, out], i) => (
        <g key={i}>
          <rect x="24" y={46 + i * 58} width="652" height="48" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 58} width="652" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={66 + i * 58} fontSize="12.5" className="fill-current text-foreground" fontWeight="800">{mol}</text>
          <text x="40" y={84 + i * 58} fontSize="10" className="fill-current text-muted-foreground">{desc}</text>
          <text x="400" y={76 + i * 58} fontSize="11" className="fill-current text-foreground">{calc}</text>
          <text x="580" y={76 + i * 58} fontSize="12.5" className="fill-current text-foreground" fontWeight="800">{out}</text>
        </g>
      ))}
    </svg>
  );
}
