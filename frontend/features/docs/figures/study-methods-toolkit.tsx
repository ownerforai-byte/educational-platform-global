// StudyMethodsToolkit figure. Theme-aware.
export function StudyMethodsToolkit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Special methods used to study organic compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The organic toolkit</text>
      {[
        ["extraction", "pull compounds from plants, coal, petroleum", "rgb(16 185 129)", 40, 55],
        ["crystallisation", "purify by solubility and crystal growth", "rgb(59 130 246)", 240, 55],
        ["distillation", "separate by boiling point", "rgb(245 158 11)", 440, 55],
        ["chromatography", "separate by differential adsorption", "rgb(139 92 246)", 40, 125],
        ["structure determination", "spectroscopy + chemical tests", "rgb(239 68 68)", 240, 125],
        ["stepwise synthesis", "build the skeleton group by group", "rgb(20 184 166)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Reason 3 of the separate study: molecular compounds need molecular methods</text>
    </svg>
  );
}
