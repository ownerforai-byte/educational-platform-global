// Theoretical yield computation ladder. Theme-aware.
export function TheoreticalYieldLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Theoretical yield computation ladder given mass to moles to mole ratio to product mass with example">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Theoretical yield — the four-rung ladder</text>
      {[
        ["1 · given mass → moles", "n = m ÷ M"],
        ["2 · mole ratio", "× (product coefficient ÷ reactant coefficient)"],
        ["3 · moles → product mass", "m = n × M(product)"],
        ["4 · report", "this is the 100%-yield benchmark"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + i * 20} y={40 + i * 34} width="640" height="28" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={50 + i * 20} y={59 + i * 34} fontSize="9" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x="654" y={59 + i * 34} fontSize="8.6" textAnchor="end" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="180" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="195" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">With two reactants given, run the limiting-reactant check first — the ladder starts from the limiting reactant.</text>
    </svg>
  );
}
