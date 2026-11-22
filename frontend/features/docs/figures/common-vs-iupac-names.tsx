// CommonVsIupacNames figure. Theme-aware.
export function CommonVsIupacNames({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Common names versus IUPAC names for familiar compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Common name vs IUPAC name</text>
      {[
        ["CH₃OH", "methyl alcohol", "methanol", "rgb(59 130 246)", 40, 55],
        ["CH₃CH₂OH", "ethyl alcohol", "ethanol", "rgb(16 185 129)", 340, 55],
        ["HCOOH", "formic acid", "methanoic acid", "rgb(245 158 11)", 40, 125],
        ["CH₃COOH", "acetic acid", "ethanoic acid", "rgb(139 92 246)", 340, 125],
      ].map(([f, c, iu, col, x, y]) => (
        <g key={c as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 22} fontSize="11" fontWeight="800" fill={col as string}>{f as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 40} fontSize="9.5" className="fill-current text-muted-foreground">common: {c as string} → IUPAC: {iu as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">IUPAC names are systematic — any chemist can rebuild the structure from them</text>
    </svg>
  );
}
