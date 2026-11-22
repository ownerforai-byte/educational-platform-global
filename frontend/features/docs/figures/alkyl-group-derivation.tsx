// AlkylGroupDerivation figure. Theme-aware.
export function AlkylGroupDerivation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Formation of alkyl groups by removing hydrogen from alkanes">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Alkane − one H = alkyl group (R–)</text>
      {[
        ["CH₄ methane", "− H", "CH₃– methyl", "rgb(59 130 246)", 55],
        ["C₂H₆ ethane", "− H", "C₂H₅– ethyl", "rgb(16 185 129)", 125],
        ["C₃H₈ propane", "− H", "C₃H₇– propyl / isopropyl", "rgb(245 158 11)", 195],
      ].map(([a, m, r, col, y]) => (
        <g key={a as string}>
          <text x="60" y={(y as number) + 5} fontSize="11.5" fontWeight="800" className="fill-current text-foreground">{a as string}</text>
          <text x="240" y={(y as number) + 5} fontSize="10.5" fill="rgb(239 68 68)">{m as string}</text>
          <path d={`M 290 ${(y as number)} L 340 ${(y as number)}`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#agd-a)" />
          <text x="360" y={(y as number) + 5} fontSize="11.5" fontWeight="800" fill={col as string}>{r as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">general formula CₙH₂ₙ₊₁ — monovalent, exists only attached inside molecules</text>
      <defs>
        <marker id="agd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
