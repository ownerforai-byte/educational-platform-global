// Isoelectronic series size chart. Theme-aware.
export function IsoelectronicSeriesChart({ className }: { className?: string }) {
  const ions: [string, number, string][] = [
    ["O²⁻", 140, "rgb(14 165 233 / 0.8)"],
    ["F⁻", 133, "rgb(16 185 129 / 0.8)"],
    ["Na⁺", 95, "rgb(245 158 11 / 0.8)"],
    ["Mg²⁺", 65, "rgb(139 92 246 / 0.8)"],
    ["Al³⁺", 45, "rgb(244 63 94 / 0.8)"],
  ];
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Isoelectronic series oxide fluoride sodium magnesium aluminium all ten electrons sizes decrease as nuclear charge rises from eight to thirteen">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Isoelectronic series — 10 electrons each, sizes decided by Z</text>
      {ions.map(([sym, r, color], i) => (
        <g key={sym}>
          <circle cx={110 + i * 130} cy="110" r={r * 0.62} className="fill-current" style={{ color }} opacity="0.25" />
          <circle cx={110 + i * 130} cy="110" r={r * 0.62} fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color }} />
          <text x={110 + i * 130} y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x={110 + i * 130} y="196" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">{r} pm</text>
        </g>
      ))}
      <text x="360" y="52" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Z: 8 → 9 → 11 → 12 → 13 (all with the Ne configuration)</text>
      <rect x="30" y="200" width="0" height="0" />
      <text x="360" y="214" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Rule: same electron count → same shielding → the nucleus with more protons squeezes harder → size falls as Z rises.</text>
    </svg>
  );
}
