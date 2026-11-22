export function RmsSpeedDrill({ className }: { className?: string }) {
  const rows = [
    { g: "H2", m: "2", u: "u(rms) highest" },
    { g: "He", m: "4", u: "2.8x slower than H2" },
    { g: "O2", m: "32", u: "4x slower than H2" },
    { g: "CO2", m: "44", u: "4.7x slower than H2" },
  ];
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Root mean square speed comparison across gases" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">u(rms) Drill - Same T, Different M</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(40, ${42 + i * 44})`}>
          <text x="0" y="18" fontSize="13" fontWeight="700" fill="currentColor">{r.g}</text>
          <text x="45" y="18" fontSize="11" className="fill-current opacity-70">M = {r.m}</text>
          <rect x="110" y="6" width={210 - i * 45} height="18" rx="4" className="fill-current opacity-25" />
          <text x="330" y="20" fontSize="10.5" className="fill-current opacity-70">{r.u}</text>
        </g>
      ))}
      <text x="280" y="220" textAnchor="middle" fontSize="11" className="fill-current opacity-70">u(rms) = sqrt(3RT/M) - heavier is slower at the same temperature</text>
    </svg>
  );
}
