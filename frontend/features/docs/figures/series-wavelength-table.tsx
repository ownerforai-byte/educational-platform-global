// Series summary table: n1, region, longest line. Theme-aware.
export function SeriesWavelengthTable({ className }: { className?: string }) {
  const rows: [string, string, string, string, string][] = [
    ["Lyman", "1", "UV", "121.6 nm", "rgb(139 92 246 / 0.9)"],
    ["Balmer", "2", "Visible", "656.3 nm", "rgb(37 99 235 / 0.9)"],
    ["Paschen", "3", "Infrared", "1875 nm", "rgb(220 38 38 / 0.9)"],
    ["Brackett", "4", "Infrared", "4051 nm", "rgb(190 24 93 / 0.9)"],
    ["Pfund", "5", "Far infrared", "7460 nm", "rgb(13 148 136 / 0.9)"],
  ];
  return (
    <svg viewBox="0 0 720 250" className={className} role="img" aria-label="Hydrogen spectral series table Lyman Balmer Paschen Brackett Pfund with landing level region and longest wavelength line">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The five series at a glance — memorise the landing levels</text>
      {rows.map(([name, n1, region, longest, color], i) => (
        <g key={name}>
          <rect x="30" y={40 + i * 36} width="660" height="30" rx="7" className="fill-current" style={{ color }} opacity="0.12" />
          <rect x="30" y={40 + i * 36} width="660" height="30" rx="7" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ color }} />
          <text x="46" y={60 + i * 36} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{name}</text>
          <text x="200" y={60 + i * 36} fontSize="9" className="fill-current text-muted-foreground">lands on n₁ = {n1}</text>
          <text x="380" y={60 + i * 36} fontSize="9" className="fill-current text-foreground" fontWeight="700">{region}</text>
          <text x="674" y={60 + i * 36} fontSize="9" textAnchor="end" className="fill-current" style={{ color }} fontWeight="800">longest line {longest}</text>
        </g>
      ))}
      <rect x="30" y="224" width="660" height="20" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="238" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Pattern: the longest line of each series is the smallest jump into n₁ (from n₁ + 1); only Balmer reaches the visible window.</text>
    </svg>
  );
}
