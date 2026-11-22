// IsomerismDefinitionPanel figure. Theme-aware.
export function IsomerismDefinitionPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Isomerism definition same molecular formula different properties">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Isomerism — the definition</text>
      <rect x="40" y="52" width="580" height="80" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="82" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Two or more compounds with the SAME molecular formula</text>
      <text x="330" y="110" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">but DIFFERENT arrangements → different properties</text>
      {[
        ["isomers", "the compounds themselves", "rgb(16 185 129)", 40],
        ["isomerism", "the phenomenon they display", "rgb(245 158 11)", 340],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="150" width="280" height="52" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y="172" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Greek: isos = equal, meros = part — "equal parts, different whole"</text>
    </svg>
  );
}
