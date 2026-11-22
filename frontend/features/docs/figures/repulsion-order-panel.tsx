// Repulsion order: lone pair pairs versus bond pairs. Theme-aware.
export function RepulsionOrderPanel({ className }: { className?: string }) {
  const tiers: [string, string, string][] = [
    ["LP - LP", "strongest repulsion", "rgb(244 63 94)"],
    ["LP - BP", "middle repulsion", "rgb(245 158 11)"],
    ["BP - BP", "weakest repulsion", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Repulsion order panel showing lone pair lone pair strongest lone pair bond pair middle and bond pair bond pair weakest with descending bars">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Repulsion ladder: lone pairs bully hardest</text>
      {tiers.map(([label, note, color], i) => (
        <g key={i}>
          <rect x="60" y={60 + i * 66} width={420 - i * 110} height="48" rx="8" className="fill-current" style={{ color }} opacity="0.25" />
          <rect x="60" y={60 + i * 66} width={420 - i * 110} height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <text x="80" y={90 + i * 66} fontSize="14" className="fill-current text-foreground" fontWeight="800">{label}</text>
          <text x={500 - i * 110} y={90 + i * 66} fontSize="10.5" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="320" y="266" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">LP = lone pair, BP = bond pair - this ladder alone explains every compressed angle</text>
    </svg>
  );
}
