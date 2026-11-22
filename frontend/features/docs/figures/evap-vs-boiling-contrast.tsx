export function EvapVsBoilingContrast({ className }: { className?: string }) {
  const rows = [
    { b: "Location", e: "Surface only", b2: "Whole bulk (bubbles)" },
    { b: "Temperature", e: "Any temperature", b2: "At the boiling point" },
    { b: "Rate control", e: "T, area, humidity, airflow", b2: "External pressure" },
    { b: "Cooling effect", e: "Cools the liquid", b2: "Needs continued heating" },
  ];
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Evaporation versus boiling comparison table" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Evaporation vs Boiling</text>
      <text x="190" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">Evaporation</text>
      <text x="420" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">Boiling</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(40, ${58 + i * 40})`}>
          <rect width="480" height="34" rx="6" className="fill-current opacity-5" />
          <text x="12" y="22" fontSize="10.5" fontWeight="600" fill="currentColor">{r.b}</text>
          <text x="190" y="22" textAnchor="middle" fontSize="10.5" fill="currentColor">{r.e}</text>
          <text x="420" y="22" textAnchor="middle" fontSize="10.5" fill="currentColor">{r.b2}</text>
        </g>
      ))}
      <text x="280" y="230" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Same escape process, different arenas and triggers</text>
    </svg>
  );
}
