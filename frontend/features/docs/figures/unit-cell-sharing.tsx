// Shared particle fractions in a unit cell. Theme-aware.
export function UnitCellSharing({ className }: { className?: string }) {
  const cards: [string, string, string, string][] = [
    ["corner", "1/8", "shared by 8 cells", "rgb(59 130 246)"],
    ["face centre", "1/2", "shared by 2 cells", "rgb(245 158 11)"],
    ["body centre", "1", "wholly inside", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Sharing fractions of corner face and body centre particles between neighbouring unit cells">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">A particle counts only its share</text>
      {cards.map(([p, f, s, c], i) => {
        const x = 90 + i * 200;
        return (
          <g key={i}>
            <rect x={x} y="56" width="120" height="90" rx="8" fill="none" stroke={c} strokeWidth="2" />
            <circle cx={x + 8} cy={64} r="7" className="fill-current" style={{ color: c }} opacity="0.85" />
            {i > 0 && <circle cx={x + 60} cy={i === 1 ? 56 : 101} r="7" className="fill-current" style={{ color: c }} opacity="0.85" />}
            <text x={x + 60} y="170" fontSize="13" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{f}</text>
            <text x={x + 60} y="190" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
            <text x={x + 60} y="46" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{p}</text>
          </g>
        );
      })}
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Counting a corner atom as a whole one is the classic solid-state mistake</text>
    </svg>
  );
}
