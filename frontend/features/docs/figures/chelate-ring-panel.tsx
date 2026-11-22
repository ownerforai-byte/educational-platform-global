// ChelateRingPanel figure. Theme-aware.
export function ChelateRingPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Chelate ring gripping a metal ion in chlorophyll haem and vitamin B12">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chelation — the ring that grips the metal</text>
      <ellipse cx="200" cy="125" rx="95" ry="60" fill="none" stroke="rgb(59 130 246)" strokeWidth="3" strokeDasharray="7 5" />
      <text x="200" y="70" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">porphyrin-type ring</text>
      {[[200, 65], [295, 125], [200, 185], [105, 125]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="rgb(59 130 246)" />
      ))}
      <circle cx="200" cy="125" r="14" fill="rgb(16 185 129)" />
      <text x="200" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">M</text>
      <text x="200" y="218" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">several donor atoms = one claw</text>
      {[
        ["chlorophyll", "Mg²⁺", "rgb(16 185 129)", 340],
        ["haem (Hb)", "Fe²⁺", "rgb(239 68 68)", 425],
        ["vitamin B₁₂", "Co", "rgb(245 158 11)", 510],
      ].map(([n, m, col, x]) => (
        <g key={n as string}>
          <rect x={(x as number) - 60} y="95" width="115" height="60" rx="8" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={x as number} y="118" fontSize="10" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <text x={x as number} y="140" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
        </g>
      ))}
      <text x="455" y="195" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">corrin ring</text>
    </svg>
  );
}
