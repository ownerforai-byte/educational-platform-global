// MetalJobsMap figure. Theme-aware.
export function MetalJobsMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Four jobs of metal ions in biological systems with examples">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Four jobs for a metal ion</text>
      {[
        ["TRANSPORT", "Fe²⁺ in haemoglobin carries O₂", "rgb(239 68 68)", 40, 55],
        ["STRUCTURE", "Ca²⁺ builds bone (hydroxyapatite)", "rgb(148 163 184)", 340, 55],
        ["CATALYSIS", "Zn²⁺ in carbonic anhydrase", "rgb(59 130 246)", 40, 125],
        ["LIGHT + SIGNAL", "Mg²⁺ chlorophyll; Ca²⁺ triggers muscle", "rgb(16 185 129)", 340, 125],
      ].map(([j, ex, col, x, y]) => (
        <g key={j as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{j as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{ex as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">s-block ions work by charge and gradients; d-block ions by coordination chemistry</text>
    </svg>
  );
}
