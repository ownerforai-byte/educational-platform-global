export function SpeedFormulaLadder({ className }: { className?: string }) {
  const rows = [
    { n: "Most probable", f: "u(mp) = sqrt(2RT/M)", r: "1" },
    { n: "Average", f: "u(av) = sqrt(8RT/pi M)", r: "1.128" },
    { n: "Root mean square", f: "u(rms) = sqrt(3RT/M)", r: "1.225" },
  ];
  return (
    <svg viewBox="0 0 560 210" role="img" aria-label="Ladder of the three molecular speeds" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The Three Molecular Speeds</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(30, ${45 + i * 50})`}>
          <rect width="500" height="42" rx="7" className="fill-current opacity-5" />
          <text x="16" y="18" fontSize="12.5" fontWeight="600" fill="currentColor">{r.n}</text>
          <text x="16" y="34" fontSize="11.5" className="fill-current opacity-75">{r.f}</text>
          <text x="484" y="27" textAnchor="end" fontSize="13" fontWeight="700" fill="currentColor">{r.r}</text>
        </g>
      ))}
      <text x="280" y="200" textAnchor="middle" fontSize="11" className="fill-current opacity-70">Relative sizes at one temperature: 1 : 1.128 : 1.225</text>
    </svg>
  );
}
