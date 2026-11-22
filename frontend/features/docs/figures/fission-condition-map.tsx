// FissionConditionMap figure. Theme-aware.
export function FissionConditionMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Conditions selecting homolytic versus heterolytic fission">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">What decides the split?</text>
      {[
        ["non-polar bond", "Cl–Cl, C–C", "rgb(59 130 246)", 40, 55],
        ["heat or light", "energy input", "rgb(245 158 11)", 240, 55],
        ["non-polar solvent", "gas phase", "rgb(20 184 166)", 440, 55],
        ["→ HOMOLYSIS", "radicals", "rgb(16 185 129)", 140, 140],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <path d="M 130 111 L 200 136" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#fcm-a)" />
      <rect x="340" y="140" width="280" height="56" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="480" y="164" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">polar bond + polar solvent → HETEROLYSIS</text>
      <text x="480" y="184" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">ions: cation + anion</text>
      <defs>
        <marker id="fcm-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
    </svg>
  );
}
