// CalciumJobsPanel figure. Theme-aware.
export function CalciumJobsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Calcium roles from hydroxyapatite bone to blood clotting">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ca²⁺ — four careers</text>
      {[
        ["~99 % in bone", "hydroxyapatite Ca₁₀(PO₄)₆(OH)₂ — teeth too", "rgb(148 163 184)", 40, 55],
        ["muscle trigger", "the ion that says 'contract now'", "rgb(239 68 68)", 340, 55],
        ["blood clotting", "factor IV — citrate removes it, clotting stops", "rgb(59 130 246)", 40, 125],
        ["cell messenger", "short-lived intracellular signal", "rgb(16 185 129)", 340, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Deficiency: weak bones, poor clotting — excess never helps</text>
    </svg>
  );
}
