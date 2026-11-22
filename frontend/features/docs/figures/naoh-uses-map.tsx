// NaohUsesMap figure. Theme-aware.
export function NaohUsesMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Uses of sodium hydroxide from soap making to bauxite purification">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NaOH at work</text>
      {[
        ["Soap — saponification", "fat + 3NaOH → 3RCOONa + glycerol", "rgb(245 158 11)", 30, 55],
        ["Paper pulping", "digests lignin, frees the fibres", "rgb(148 163 184)", 340, 55],
        ["Bayer process", "digests bauxite: Al₂O₃ + 2OH⁻ → 2AlO₂⁻ + H₂O", "rgb(59 130 246)", 30, 115],
        ["Drain cleaner", "saponifies grease, dissolves hair", "rgb(239 68 68)", 340, 115],
        ["Rayon / petroleum", "viscose spinning; refining fractions", "rgb(139 92 246)", 30, 175],
        ["Lab reagent", "standardised, never assumed", "rgb(16 185 129)", 340, 175],
      ].map(([u, why, col, x, y]) => (
        <g key={u as string}>
          <rect x={x as number} y={y as number} width="290" height="48" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 19} fontSize="10.5" fontWeight="800" fill={col as string}>{u as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 37} fontSize="9.5" className="fill-current text-muted-foreground">{why as string}</text>
        </g>
      ))}
    </svg>
  );
}
