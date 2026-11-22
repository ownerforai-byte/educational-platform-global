// ClassificationExamples figure. Theme-aware.
export function ClassificationExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Example compounds assigned to their correct classification leaves">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sort these four — where does each live?</text>
      {[
        ["ethyne HC≡CH", "open chain · unsaturated (alkyne)", "rgb(16 185 129)", 40, 55],
        ["cyclohexane", "closed chain · homocyclic · alicyclic", "rgb(245 158 11)", 340, 55],
        ["pyridine", "closed chain · heterocyclic (N)", "rgb(139 92 246)", 40, 125],
        ["naphthalene", "closed chain · aromatic", "rgb(239 68 68)", 340, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Full address = branch + sub-branch + leaf — quote all three levels in answers</text>
    </svg>
  );
}
