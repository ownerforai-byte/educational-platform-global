export function RUnitTablePanel({ className }: { className?: string }) {
  const rows = [
    { u: "L·atm/mol·K", v: "0.0821", w: "P in atm, V in litres" },
    { u: "J/mol·K", v: "8.314", w: "SI: Pa and m3, energy work" },
    { u: "cal/mol·K", v: "1.987", w: "thermochemistry" },
  ];
  return (
    <svg viewBox="0 0 560 210" role="img" aria-label="The universal gas constant in three unit systems" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">R in Its Three Costumes</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(30, ${42 + i * 46})`}>
          <rect width="500" height="38" rx="7" className="fill-current opacity-5" />
          <text x="16" y="17" fontSize="12" fontWeight="600" fill="currentColor">{r.u}</text>
          <text x="16" y="32" fontSize="10.5" className="fill-current opacity-70">{r.w}</text>
          <text x="484" y="25" textAnchor="end" fontSize="13.5" fontWeight="700" fill="currentColor">{r.v}</text>
        </g>
      ))}
      <text x="280" y="200" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Universal: same value for every ideal gas - match the units to your data</text>
    </svg>
  );
}
