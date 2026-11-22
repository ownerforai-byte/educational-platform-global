// Radius vs edge length in cubic cells. Theme-aware.
export function RadiusEdgeRelations({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["simple cubic", "along the edge", "r = a/2", "rgb(148 163 184)"],
    ["body-centred", "along the body diagonal √3a", "r = √3a/4", "rgb(59 130 246)"],
    ["face-centred", "along the face diagonal √2a", "r = a/(2√2)", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Relations between atomic radius and edge length for simple cubic body-centred and face-centred cells">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Where atoms touch decides r(a)</text>
      {rows.map(([n, d, f, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 52} width="580" height="44" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={64 + i * 52} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{n}</text>
          <text x="58" y={82 + i * 52} fontSize="10.5" className="fill-current text-muted-foreground">touch {d}</text>
          <text x="600" y={74 + i * 52} fontSize="13" fontWeight="800" textAnchor="end" style={{ fill: c }}>{f}</text>
        </g>
      ))}
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One packing geometry → one formula; everything else is algebra</text>
    </svg>
  );
}
