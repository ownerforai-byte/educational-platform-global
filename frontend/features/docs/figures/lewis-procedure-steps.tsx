// Five-step Lewis structure procedure. Theme-aware.
export function LewisProcedureSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Count", "sum all valence electrons (add for anions, subtract for cations)"],
    ["2. Skeleton", "least electronegative atom central; H always terminal"],
    ["3. Single bonds", "one pair between each neighbour, then complete octets"],
    ["4. Leftovers", "put remaining pairs on outer atoms, then central atom"],
    ["5. Multiple bonds", "if an atom is short, move lone pairs in to make double or triple"],
  ];
  return (
    <svg viewBox="0 0 700 330" className={className} role="img" aria-label="Five step procedure for drawing Lewis dot structures from electron count through skeleton single bonds leftovers and multiple bonds">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Drawing a Lewis structure in five moves</text>
      {steps.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={46 + i * 54} width="652" height="46" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 54} width="652" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={64 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={82 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{body}</text>
        </g>
      ))}
    </svg>
  );
}
