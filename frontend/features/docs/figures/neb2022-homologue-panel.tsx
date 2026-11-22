// Neb2022HomologuePanel figure. Theme-aware.
export function Neb2022HomologuePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Key points of the NEB 2022 question on functional groups and homologous series">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NEB 2022 asked exactly this</text>
      <rect x="40" y="55" width="580" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeDasharray="5 3" />
      <text x="330" y="80" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">"Define functional group and homologous series. State three characteristics…</text>
      <text x="330" y="100" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">…and write the general formula of the alkanol series with two examples."</text>
      {[
        ["definition pair", "group = reactive patch; series = CH₂ ladder", "rgb(16 185 129)", 40, 130],
        ["3 characteristics", "general formula · 14 u step · gradation", "rgb(245 158 11)", 340, 130],
        ["alkanols", "CₙH₂ₙ₊₁OH — C₂H₅OH, C₃H₇OH", "rgb(139 92 246)", 40, 185, 580],
      ].map(([h, d, col, x, y, w]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width={w as number} height="42" rx="9" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 17} fontSize="10" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 34} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
    </svg>
  );
}
