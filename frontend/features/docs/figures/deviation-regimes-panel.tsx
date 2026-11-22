export function DeviationRegimesPanel({ className }: { className?: string }) {
  const rows = [
    { c: "High pressure", d: "volume term (b) dominates", z: "Z > 1", e: "harder to compress" },
    { c: "Low temperature", d: "attraction term (a) dominates", z: "Z < 1", e: "easier to compress" },
    { c: "High T, low P", d: "both corrections vanish", z: "Z = 1", e: "ideal behaviour" },
  ];
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Deviation regimes of real gases" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Three Deviation Regimes</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(30, ${42 + i * 52})`}>
          <rect width="500" height="44" rx="7" className="fill-current opacity-5" />
          <text x="16" y="18" fontSize="12" fontWeight="700" fill="currentColor">{r.c}</text>
          <text x="16" y="35" fontSize="10.5" className="fill-current opacity-70">{r.d}</text>
          <text x="400" y="27" fontSize="12.5" fontWeight="700" fill="currentColor">{r.z}</text>
          <text x="490" y="27" textAnchor="end" fontSize="10" className="fill-current opacity-70">{r.e}</text>
        </g>
      ))}
      <text x="280" y="212" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Maximum deviation: high P and low T together - near liquefaction</text>
    </svg>
  );
}
