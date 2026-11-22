// Sulphur use map. Theme-aware.
export function SulphurUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["H₂SO₄ manufacture", "over 80% of world sulphur", "rgb(59 130 246)"],
    ["vulcanisation", "tyres, ebonite", "rgb(51 65 85)"],
    ["gunpowder / matches / fireworks", "S + KNO₃ + charcoal", "rgb(239 68 68)"],
    ["medicine & agriculture", "skin ointments, fungicides, grapes dusting", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Uses of sulphur in acid manufacture vulcanisation pyrotechnics and agriculture">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Brimstone's résumé</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">From black powder to green vineyards — the yellow element spans them all</text>
    </svg>
  );
}
