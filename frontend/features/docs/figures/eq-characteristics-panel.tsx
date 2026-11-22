// Five characteristics of chemical equilibrium panel. Theme-aware.
export function EqCharacteristicsPanel({ className }: { className?: string }) {
  const items: [string, string][] = [
    ["1. Constant composition", "concentrations stop changing - but are not equal"],
    ["2. Dynamic activity", "both reactions continue at equal rates"],
    ["3. Either-side arrival", "same state from reactants or products"],
    ["4. Catalyst neutrality", "faster arrival, unchanged position"],
    ["5. Condition-sensitive", "T, P and concentration shifts move it"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Five characteristics of chemical equilibrium from constant composition to condition sensitivity">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Five fingerprints of equilibrium</text>
      {items.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 46} width="580" height="38" rx="8" className="fill-current" style={{ color: i % 2 ? "rgb(59 130 246)" : "rgb(16 185 129)" }} opacity="0.13" />
          <text x="58" y={70 + i * 46} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="290" y={70 + i * 46} fontSize="11" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="290" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Constant, dynamic, two-sided, catalyst-proof, condition-driven</text>
    </svg>
  );
}
