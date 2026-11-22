export function CholestericThermometry({ className }: { className?: string }) {
  const bands = [
    { t: "35 C", c: "opacity-30" },
    { t: "36 C", c: "opacity-45" },
    { t: "37 C", c: "opacity-60" },
    { t: "38 C", c: "opacity-75" },
    { t: "39 C", c: "opacity-90" },
  ];
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Cholesteric film colour shifts with temperature" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Cholesteric Thermometer</text>
      {bands.map((b, i) => (
        <g key={i} transform={`translate(80, ${40 + i * 30})`}>
          <rect width="280" height="24" rx="5" className={`fill-current ${b.c}`} />
          <text x="296" y="17" fontSize="11" fill="currentColor">{b.t}</text>
        </g>
      ))}
      <text x="470" y="90" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">helix pitch</text>
      <text x="470" y="108" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">shifts with T</text>
      <text x="470" y="126" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">reflected colour</text>
      <text x="470" y="144" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">follows</text>
      <text x="280" y="200" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Fever strips, circuit hot-spot maps - resolution near 0.1 C</text>
    </svg>
  );
}
