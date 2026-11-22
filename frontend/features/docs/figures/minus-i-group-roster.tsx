// MinusIGroupRoster figure. Theme-aware.
export function MinusIGroupRoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Electron withdrawing minus I effect groups list">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">−I groups — the electron withdrawers</text>
      {[
        ["−NO₂", "strongest of the common set", "rgb(239 68 68)", 40],
        ["−CN", "nitrile pulls hard", "rgb(245 158 11)", 240],
        ["−COOH · −CHO", "carbonyl family", "rgb(139 92 246)", 440],
        ["−F · −Cl · −Br · −I", "the halogens", "rgb(59 130 246)", 140, 130],
        ["−OH", "oxygen electronegativity", "rgb(16 185 129)", 380, 130],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">all more electronegative than carbon — they pull σ-electrons toward themselves</text>
    </svg>
  );
}
