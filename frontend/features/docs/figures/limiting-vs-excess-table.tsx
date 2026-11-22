// Limiting vs excess comparison table. Theme-aware.
export function LimitingVsExcessTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Limiting versus excess reactant comparison table consumption product control and leftover behaviour">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Limiting vs excess — three-row contrast</text>
      {[
        ["Consumption", "fully used up", "partly left over"],
        ["Product amount", "sets the maximum yield", "has no say in the yield"],
        ["Leftover mass", "zero at completion", "initial − consumed"],
      ].map(([prop, lim, exc], i) => (
        <g key={prop}>
          <rect x="30" y={40 + i * 50} width="200" height="42" rx="8" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(120 120 130 / 0.8)" }} />
          <text x="130" y={66 + i * 50} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{prop}</text>
          <rect x="240" y={40 + i * 50} width="220" height="42" rx="8" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(244 63 94 / 0.85)" }} />
          <text x="350" y={66 + i * 50} fontSize="8.6" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">{lim}</text>
          <rect x="470" y={40 + i * 50} width="220" height="42" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="580" y={66 + i * 50} fontSize="8.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{exc}</text>
        </g>
      ))}
      <rect x="30" y="196" width="660" height="16" rx="0" />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Headers: limiting reactant (middle, red) · excess reactant (right, blue). Quote this table shape in comparison answers.</text>
    </svg>
  );
}
