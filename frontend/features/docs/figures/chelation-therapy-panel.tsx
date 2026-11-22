// ChelationTherapyPanel figure. Theme-aware.
export function ChelationTherapyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Chelation therapy ligands gripping toxic metals for excretion">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chelation therapy — out-grip the enzyme</text>
      {[
        ["EDTA", "Pb (lead)", "rgb(59 130 246)", 40, 55],
        ["BAL (dimercaprol)", "As, Hg", "rgb(16 185 129)", 340, 55],
        ["penicillamine", "Cu (Wilson's)", "rgb(139 92 246)", 40, 125],
        ["desferrioxamine", "Fe overload", "rgb(239 68 68)", 340, 125],
      ].map(([d, m, col, x, y]) => (
        <g key={d as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{d as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">removes {m as string}</text>
        </g>
      ))}
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Ligand grips the metal in a soluble complex → excreted in urine</text>
      <text x="330" y="230" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Antidote chemistry is coordination chemistry — grip strength decides</text>
    </svg>
  );
}
