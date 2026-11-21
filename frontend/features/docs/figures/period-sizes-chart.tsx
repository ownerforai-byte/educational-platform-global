// Period sizes chart 2-8-8-18-18-32-32. Theme-aware.
export function PeriodSizesChart({ className }: { className?: string }) {
  const sizes: [string, number][] = [["P1", 2], ["P2", 8], ["P3", 8], ["P4", 18], ["P5", 18], ["P6", 32], ["P7", 32]];
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Period sizes bar chart two eight eight eighteen eighteen thirty two thirty two electrons per period with maximum shell capacity two n squared">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Period lengths — 2, 8, 8, 18, 18, 32, 32</text>
      {sizes.map(([p, n], i) => {
        const h = n * 3.2;
        return (
          <g key={p}>
            <rect x={50 + i * 92} y={180 - h} width="64" height={h} rx="5" className="fill-current" style={{ color: i % 2 ? "rgb(16 185 129 / 0.75)" : "rgb(14 165 233 / 0.75)" }} />
            <text x={82 + i * 92} y={172 - h} fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n}</text>
            <text x={82 + i * 92} y="196" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{p}</text>
          </g>
        );
      })}
      <rect x="30" y="200" width="660" height="14" rx="0" />
      <text x="360" y="216" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Why not 2, 8, 18, 32? Periods 3 and 5 stop at 8 because 4s dips below 3d (and 5s below 4d) — the (n + l) rule closes the period early.</text>
    </svg>
  );
}
