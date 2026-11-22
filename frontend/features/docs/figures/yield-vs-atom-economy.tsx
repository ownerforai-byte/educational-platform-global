// Yield vs atom economy contrast. Theme-aware.
export function YieldVsAtomEconomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Percentage yield versus atom economy comparison lab efficiency versus design efficiency with formulas">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">% yield vs atom economy — two different report cards</text>
      {[
        ["What it measures", "how much of the promise the LAB delivered", "how much reactant mass the EQUATION places in the product"],
        ["Decided by", "technique, side reactions, equilibrium", "the reaction type chosen by the chemist"],
        ["Can be 100%?", "yes, in theory — rarely in practice", "yes, for addition reactions"],
        ["Fixable by", "better technique, catalysis, recycling", "redesigning the route"],
      ].map(([prop, y, a], i) => (
        <g key={prop}>
          <rect x="30" y={40 + i * 34} width="160" height="28" rx="7" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.1" style={{ color: "rgb(120 120 130 / 0.8)" }} />
          <text x="110" y={59 + i * 34} fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{prop}</text>
          <rect x="200" y={40 + i * 34} width="250" height="28" rx="7" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.1" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="325" y={59 + i * 34} fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{y.slice(0, 46)}</text>
          <rect x="460" y={40 + i * 34} width="230" height="28" rx="7" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.1" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="575" y={59 + i * 34} fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{a.slice(0, 44)}</text>
        </g>
      ))}
      <rect x="30" y="180" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="195" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam sentence: "A 100% yield reaction may still waste atoms; a 60% yield reaction may still be perfectly atom-economical."</text>
    </svg>
  );
}
