export function GrahamDiffusionRace({ className }: { className?: string }) {
  const rows = [
    { g: "H2 (M=2)", w: 200, t: "fastest" },
    { g: "CH4 (M=16)", w: 71, t: "r = 1/2 of H2" },
    { g: "O2 (M=32)", w: 50, t: "r = 1/4 of H2" },
    { g: "CO2 (M=44)", w: 43, t: "r = 0.21 of H2" },
  ];
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Graham's law diffusion rates versus molar mass" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Graham's Law - Light is Fast</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(40, ${42 + i * 44})`}>
          <text x="0" y="17" fontSize="12" fontWeight="600" fill="currentColor">{r.g}</text>
          <rect x="120" y="4" width={r.w} height="18" rx="4" className="fill-current opacity-25" />
          <text x="340" y="18" fontSize="10.5" className="fill-current opacity-70">{r.t}</text>
        </g>
      ))}
      <text x="280" y="220" textAnchor="middle" fontSize="11" className="fill-current opacity-70">r1/r2 = sqrt(M2/M1) - H2 outruns O2 by sqrt(32/2) = 4x</text>
    </svg>
  );
}
