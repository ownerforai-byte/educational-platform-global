// Gay-Lussac law of combining volumes. Theme-aware.
export function GayLussacVolumePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Gay lussac law of combining volumes hydrogen and chlorine two volumes hydrogen chloride avogadro explanation molecules">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gay-Lussac (1808): gases combine by volume</text>
      {[
        ["2 vol H₂", 160, "rgb(14 165 233 / 0.85)"],
        ["1 vol Cl₂", 80, "rgb(16 185 129 / 0.85)"],
        ["2 vol HCl", 160, "rgb(139 92 246 / 0.85)"],
      ].map(([t, w, c], i) => (
        <g key={String(t)}>
          <rect x={40 + i * 230} y="60" width={Number(w)} height="60" rx="8" className="fill-current" style={{ color: String(c) }} opacity="0.2" />
          <rect x={40 + i * 230} y="60" width={Number(w)} height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: String(c) }} />
          <text x={40 + i * 230 + Number(w) / 2} y="95" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{String(t)}</text>
        </g>
      ))}
      <text x="360" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2 : 1 : 2 — simple whole numbers, same T and P</text>
      <rect x="30" y="166" width="660" height="44" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="186" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Avogadro's explanation (1811): equal volumes contain equal molecules, so volume ratios = molecule ratios.</text>
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">This is the law that forced O₂ to be diatomic — 2 vol water from 1 vol O₂ means the oxygen splits.</text>
    </svg>
  );
}
