// Oxide character trend across a period. Theme-aware.
export function OxidePeriodTrend({ className }: { className?: string }) {
  const stops: [string, string, string][] = [
    ["Na₂O", "basic", "rgb(14 165 233)"],
    ["Al₂O₃", "amphoteric", "rgb(16 185 129)"],
    ["SO₃", "acidic", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Oxide character trend across period three from basic sodium oxide through amphoteric alumina to acidic sulfur trioxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Across period 3: basic → amphoteric → acidic</text>
      <line x1="80" y1="110" x2="580" y2="110" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" markerEnd="url(#aro)" />
      {stops.map(([f, t, c], i) => (
        <g key={i}>
          <circle cx={130 + i * 220} cy="110" r="30" className="fill-current" style={{ color: c }} opacity="0.25" />
          <text x={130 + i * 220} y="106" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f}</text>
          <text x={130 + i * 220} y="126" fontSize="10.5" textAnchor="middle" style={{ fill: c }}>{t}</text>
        </g>
      ))}
      <defs><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Metallic character fades left to right - the oxides tell the same story</text>
    </svg>
  );
}
