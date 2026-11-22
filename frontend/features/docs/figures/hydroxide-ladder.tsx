// HydroxideLadder figure. Theme-aware.
export function HydroxideLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Rising solubility ladder of alkaline earth hydroxides">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Hydroxides — the rising ladder</text>
      {[
        ["Be(OH)₂", "insoluble, AMPHOTERIC", 0.08, "rgb(148 163 184)"],
        ["Mg(OH)₂", "sparingly (milk of magnesia)", 0.2, "rgb(59 130 246)"],
        ["Ca(OH)₂", "1.7 g/L — lime water", 0.42, "rgb(245 158 11)"],
        ["Sr(OH)₂", "more", 0.65, "rgb(234 88 12)"],
        ["Ba(OH)₂", "~56 g/L — baryta water", 0.9, "rgb(16 185 129)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={58 + i * 28} fontSize="11" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="170" y={46 + i * 28} width={(w as number) * 320} height="15" rx="4" fill={col as string} opacity="0.6" />
          <text x={180 + (w as number) * 320} y={59 + i * 28} fontSize="9" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Small OH⁻: lattice collapses faster than hydration — dissolution gets easier downward</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" fill="rgb(139 92 246)">Basicity climbs the same ladder: Be(OH)₂ amphoteric → Ba(OH)₂ strongly basic</text>
    </svg>
  );
}
