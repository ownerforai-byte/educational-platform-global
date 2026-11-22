// Fertiliser nitrogen comparison drill. Theme-aware.
export function NitrogenFertilizerDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Nitrogen percentage comparison of fertilisers urea forty six point six ammonium nitrate thirty five ammonia sulphate twenty one showing urea richest">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Which fertiliser carries the most nitrogen?</text>
      {[
        ["Urea CO(NH₂)₂", 46.6, "rgb(16 185 129 / 0.85)"],
        ["Ammonium nitrate NH₄NO₃", 35, "rgb(245 158 11 / 0.85)"],
        ["Ammonium sulphate (NH₄)₂SO₄", 21, "rgb(14 165 233 / 0.85)"],
      ].map(([name, pct, color], i) => (
        <g key={String(name)}>
          <text x="46" y={64 + i * 44} fontSize="9" className="fill-current text-foreground" fontWeight="800">{String(name)}</text>
          <rect x="46" y={72 + i * 44} width={Number(pct) * 12} height="22" rx="5" className="fill-current" style={{ color: String(color) }} />
          <text x={54 + Number(pct) * 12} y={88 + i * 44} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{String(pct)}% N</text>
        </g>
      ))}
      <rect x="30" y="196" width="660" height="18" rx="0" />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Same method as the urea drill — molar mass first, element mass second, percentage third. Urea wins on nitrogen per kilogram.</text>
    </svg>
  );
}
