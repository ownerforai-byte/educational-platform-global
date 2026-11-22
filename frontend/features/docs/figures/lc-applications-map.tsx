export function LcApplicationsMap({ className }: { className?: string }) {
  const apps = [
    { t: "LCD displays", d: "watches, phones, TVs" },
    { t: "Thermography", d: "fever strips, hot-spot maps" },
    { t: "Smart windows", d: "switchable privacy glass" },
    { t: "Optical switches", d: "telecom light routing" },
  ];
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Applications of liquid crystals" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Liquid Crystals at Work</text>
      {apps.map((a, i) => (
        <g key={i} transform={`translate(${40 + (i % 2) * 280}, ${48 + Math.floor(i / 2) * 68})`}>
          <rect width="240" height="56" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1" />
          <text x="120" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">{a.t}</text>
          <text x="120" y="43" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">{a.d}</text>
        </g>
      ))}
      <text x="280" y="200" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Voltage answers (displays, windows) and temperature answers (thermography)</text>
      <text x="280" y="220" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">From Reinitzer's 1888 cloudy benzoate to every screen</text>
    </svg>
  );
}
