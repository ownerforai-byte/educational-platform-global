// Montreal to Kigali control timeline. Theme-aware.
export function MontrealTimeline({ className }: { className?: string }) {
  const marks: [string, string, string][] = [
    ["1987", "Montreal Protocol", "rgb(59 130 246)"],
    ["1990s", "CFC phase-out schedule", "rgb(14 165 233)"],
    ["2016", "Kigali Amendment: HFCs next", "rgb(245 158 11)"],
    ["recovery", "ozone healing projected ~2066 (Antarctic)", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Timeline from the 1987 Montreal Protocol through Kigali to projected ozone recovery">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Treaty timeline</text>
      <line x1="60" y1="100" x2="600" y2="100" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      {marks.map(([y, t, c], i) => (
        <g key={i}>
          <circle cx={110 + i * 150} cy="100" r="7" className="fill-current" style={{ color: c }} />
          <text x={110 + i * 150} y="82" fontSize="11.5" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{y}</text>
          <text x={110 + i * 150} y={128 + (i % 2) * 24} fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{t}</text>
        </g>
      ))}
      <text x="330" y="188" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The rare environmental treaty that worked - chemistry measured, policy followed</text>
    </svg>
  );
}
