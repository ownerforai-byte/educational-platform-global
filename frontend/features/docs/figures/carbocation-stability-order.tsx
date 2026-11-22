// CarbocationStabilityOrder figure. Theme-aware.
export function CarbocationStabilityOrder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Carbocation stability order tertiary secondary primary methyl">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbocation stability: 3° &gt; 2° &gt; 1° &gt; CH₃⁺</text>
      {[
        ["3°", "three alkyl +I donors", "most stable", "rgb(16 185 129)", 40],
        ["2°", "two alkyl donors", "stable", "rgb(245 158 11)", 220],
        ["1°", "one alkyl donor", "less stable", "rgb(239 68 68)", 400],
        ["CH₃⁺", "no donors at all", "least stable", "rgb(148 163 184)", 540],
      ].map(([h, d, r, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="60" width={(h === "CH₃⁺" ? 80 : 140)} height="90" rx="10" fill={col as string} opacity="0.12" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + (h === "CH₃⁺" ? 40 : 70)} y="92" fontSize="14" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + (h === "CH₃⁺" ? 40 : 70)} y="114" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          <text x={(x as number) + (h === "CH₃⁺" ? 40 : 70)} y="136" fontSize="8.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">+I alkyl groups disperse the positive charge — more donors, more dispersal, more stability</text>
    </svg>
  );
}
