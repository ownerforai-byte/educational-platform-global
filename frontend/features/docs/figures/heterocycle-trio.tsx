// HeterocycleTrio figure. Theme-aware.
export function HeterocycleTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Pyridine furan and pyrrole heterocyclic ring structures">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Heterocycles — a stranger in the ring</text>
      {[
        ["PYRIDINE", "N", "C₅H₅N", "rgb(59 130 246)", 130, "vitamin niacin's ring"],
        ["FURAN", "O", "C₄H₄O", "rgb(239 68 68)", 330, "furanose sugars"],
        ["PYRROLE", "NH", "C₄H₅N", "rgb(16 185 129)", 530, "chlorophyll + haem"],
      ].map(([n, at, f, col, cx, use]) => (
        <g key={n as string}>
          <rect x={(cx as number) - 85} y="50" width="170" height="130" rx="10" fill={col as string} opacity="0.07" stroke={col as string} />
          <text x={cx as number} y="74" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <polygon points={`${cx as number},92 ${(cx as number) + 30},112 ${(cx as number) + 19},148 ${(cx as number) - 19},148 ${(cx as number) - 30},112`} fill="none" stroke={col as string} strokeWidth="2.5" />
          <circle cx={cx as number} cy={at === "NH" ? 152 : 92} r="12" fill={col as string} opacity="0.25" />
          <text x={cx as number} y={(at === "NH" ? 156 : 96)} fontSize="9.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{at as string}</text>
          <text x={cx as number} y="172" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{f as string}</text>
          <text x={cx as number} y="192" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{use as string}</text>
        </g>
      ))}
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Hetero atom IN the ring (not a substituent) is the defining criterion</text>
    </svg>
  );
}
