// FormulaNotationLadder figure. Theme-aware.
export function FormulaNotationLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ladder of chemical formula notations from molecular to bond line">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Four notations, one molecule (ethanol)</text>
      {[
        ["MOLECULAR", "C₂H₆O", "atom counts only — isomer-blind", "rgb(148 163 184)", 55],
        ["CONDENSED", "CH₃CH₂OH", "groups in sequence — connectivity kept", "rgb(59 130 246)", 100],
        ["STRUCTURAL", "H–C–C–O–H (all bonds drawn)", "complete but slow", "rgb(16 185 129)", 145],
        ["BOND-LINE", "zig-zag lines, C and H implied", "fastest — literature standard", "rgb(245 158 11)", 190],
      ].map(([h, f, d, col, y]) => (
        <g key={h as string}>
          <rect x="40" y={y as number} width="580" height="36" rx="9" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x="56" y={(y as number) + 23} fontSize="10.5" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x="180" y={(y as number) + 23} fontSize="11" fontWeight="800" className="fill-current text-foreground">{f as string}</text>
          <text x="440" y={(y as number) + 23} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
    </svg>
  );
}
