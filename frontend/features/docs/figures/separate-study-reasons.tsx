// SeparateStudyReasons figure. Theme-aware.
export function SeparateStudyReasons({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three reasons for the separate study of organic compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why organic chemistry gets its own shelf</text>
      {[
        ["1 · NUMBERS", "tens of millions — catenation + isomerism multiply every formula", "rgb(59 130 246)", 40, 55, 560],
        ["2 · PROPERTIES", "covalent molecular: low m.p./b.p., flammable, non-conducting, isomer-rich", "rgb(16 185 129)", 40, 115, 560],
        ["3 · METHODS", "extraction, distillation, chromatography, stepwise synthesis, mechanisms", "rgb(245 158 11)", 40, 175, 560],
      ].map(([h, d, col, x, y, w]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width={w as number} height="48" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 20} fontSize="11" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 38} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="236" fontSize="0.1"> </text>
    </svg>
  );
}
