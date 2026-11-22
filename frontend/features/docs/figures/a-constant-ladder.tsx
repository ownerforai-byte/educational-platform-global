export function AConstantLadder({ className }: { className?: string }) {
  const rows = [
    { g: "H2O", a: "5.46", w: 200 },
    { g: "NH3", a: "4.17", w: 153 },
    { g: "CO2", a: "3.59", w: 131 },
    { g: "O2", a: "1.36", w: 50 },
    { g: "H2", a: "0.244", w: 9 },
    { g: "He", a: "0.034", w: 2 },
  ];
  return (
    <svg viewBox="0 0 560 250" role="img" aria-label="Van der Waals attraction constants ranked" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The a-Ladder - Attraction Ranks Gases</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(50, ${38 + i * 30})`}>
          <text x="0" y="15" fontSize="12" fontWeight="600" fill="currentColor">{r.g}</text>
          <rect x="55" y="3" width={r.w} height="16" rx="4" className="fill-current opacity-25" />
          <text x="270" y="16" fontSize="10.5" fill="currentColor">a = {r.a}</text>
        </g>
      ))}
      <text x="280" y="232" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Large a: liquefies under pressure at room temperature - small a: needs deep cooling</text>
    </svg>
  );
}
