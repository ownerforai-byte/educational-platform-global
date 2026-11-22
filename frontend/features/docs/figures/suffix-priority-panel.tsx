// SuffixPriorityPanel figure. Theme-aware.
export function SuffixPriorityPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Suffix ladder for functional groups in IUPAC names">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Suffix ladder — which ending wins</text>
      {[
        ["–COOH", "–oic acid", "highest", "rgb(239 68 68)", 40],
        ["–CHO", "–al", "high", "rgb(245 158 11)", 190],
        ["C=O (ketone)", "–one", "mid", "rgb(139 92 246)", 340],
        ["–OH", "–ol", "mid", "rgb(16 185 129)", 490],
      ].map(([g, s, t, col, x]) => (
        <g key={g as string}>
          <rect x={x as number} y="55" width="130" height="72" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 65} y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{g as string}</text>
          <text x={(x as number) + 65} y="102" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{s as string}</text>
          <text x={(x as number) + 65} y="119" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{t as string}</text>
        </g>
      ))}
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">When two groups compete, the higher one takes the suffix</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the loser drops to a prefix (hydroxy-, oxo-, chloro-)</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">example: HOCH₂CH₂OH → ethane-1,2-diol (both –OH kept in one name)</text>
    </svg>
  );
}
